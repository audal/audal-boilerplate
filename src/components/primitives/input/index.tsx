import React from 'react';
import { useFormProvider } from '../form-provider';
import FormAlert from '../form-alert';
import usePersistedId from '../utils/use-persisted-id';
import VisuallyHidden from '../visually-hidden';
import throwOnMissing from '../utils/throw-on-missing';

export interface InputProps extends HtmlPropsNoRef<HTMLInputElement> {
    /**
* Name of the input - will be used for the form validation if using FormContext so make sure it's unique.
*/
    name: string;
    /**
* Placeholder is always required.
* */
    placeholder: string;
    /**
* The type of the field. Notice that "submit" is not included -
* This is an intentional omission, you should be using <button type="submit" />
* instead as there is no need to add a validation layer to a submit field itself.
* */
    type?: 'email' | 'text' | 'tel' | 'number' | 'password';
    /**
* Optional validation regex. Requires the form to be in a <FormProvider /> to work.
* This should only be used if you need custom validation - Generic regex validation for fields based on type
* (i.e. email validation for email fields, password strength validation for password fields)
* is already built in.
* */
    validationRegex?: RegExp;
    /**
* Define a minimum length for the field.
 * */
    minLength?: number;
    /**
* Define a maximum length for the field.
* */
    maxLength?: number;
    /**
* Optionally add a custom validation error message. Error messages are already built in, and are done based
* on the type of component and type of error. However, you may add your own custom one. You can use a basic string
* value here, or pass in a function (which will receive an input argument that includes the type of error -
* i.e. a Regex validation error and your function will receive 'pattern' as the argument.
* */
    validationErrorMessage?:
    | string
    | ((type: 'pattern' | 'minLength' | 'maxLength' | 'required') => string);
    /**
* Make the field required or not. Defaults to false for all field types.
*/
    required?: boolean;
}

/**
 * An `<input />` component that is accessible. If used with `<FormProvider />`,
 * it'll also automatically validate the input based on type, and show clear error messages
 * while linking its value to the FormProvider's onSubmit event.
 * Regexes, min/max length, and messages are built in, but can be overwritten using optional extra props.
 *
 * @alias InputProps
 */
const Input = ({
    type = 'text',
    name,
    validationRegex,
    minLength,
    maxLength,
    validationErrorMessage,
    required = false,
    className,
    value,
    onChange,
    onBlur,
    disabled,
    ...props
}: InputProps): JSX.Element => {
    throwOnMissing(name, 'name', 'Input');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Someone might still do this even though it's not defined in the type
    if (type === 'submit') {
        throw new Error(
            'Audal Components: The Input Primitive should not be used as a submit button. Please use <button type="submit" /> instead.',
        );
    }

    const typeRules = {
        password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        tel: /^[+]?(1-|1\s|1|\d{3}-|\d{3}\s|)?((\(\d{3}\))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/g,
        number: /^-?\d+\.?\d*$/,
        text: undefined,
    }[type];

    /*
* Get our form provider. It may not exist
* (if the input component is not inside a FormProvider and is using the component separately)
* so make sure to not access it directly without first checking.
 * */
    const formContext = useFormProvider();

    const id = usePersistedId();

    /*
* Set up our register function to be react-hook-form if the context exists,
* if it doesn't, pass the props we destructed back to the element
* */
    const registerFn = formContext && formContext.register
        ? formContext.register(name, {
            pattern: validationRegex || typeRules,
            minLength,
            maxLength,
            required,
            onChange,
            onBlur,
            disabled,
            value,
        })
        : {
            required,
            onChange,
            onBlur,
            disabled,
            value,
        };

    return (
        <div css={{ width: '100%' }}>
            <span
                css={{
                    position: 'relative',
                }}
            >
                <input
                    id={id}
                    aria-invalid={
                        formContext && formContext.errors && formContext.errors[name]
                            ? 'true'
                            : 'false'
                    }
                    className={className}
                    type={type}
                    css={{
                        padding: '0.5em 0',
                        width: '100%',
                        fontSize: '14px',
                        borderBottom: '1px solid var(--color-shades-black)',
                        backgroundColor: 'transparent',
                        color: 'var(--color-shades-white)',
                        '&::placeholder': {
                            fontSize: '14px',
                            color: 'var(--color-shades-white)',
                        },
                        '@media (max-width: 767px)': {
                            fontSize: '16px',
                            '&::placeholder': {
                                fontSize: '16px',
                            },
                        },
                    }}
                    {...registerFn}
                    {...props}
                />
                {required && (
                    <label
                        htmlFor={id}
                        css={{
                            height: '100%',
                            top: 0,
                            right: '7px',
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span
                            css={{
                                fontSize: '12px',
                                paddingTop: '0px',
                                borderRadius: '999px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '16px',
                                width: '16px',
                                color:
                                    formContext && formContext.errors && formContext.errors[name]
                                        ? 'var(--color-states-error)'
                                        : '#fff',
                                transition: 'color 0.2s',
                                marginTop: '1px',
                            }}
                        >
                            *
                            {' '}
                            <VisuallyHidden>This is a Required Field</VisuallyHidden>
                        </span>
                    </label>
                )}
            </span>
            {formContext
            && formContext.errors
            && formContext.errors[name]
            && validationErrorMessage && (
                <FormAlert>
                    {typeof validationErrorMessage === 'function'
                        ? validationErrorMessage(formContext.errors[name].type)
                        : validationErrorMessage}
                </FormAlert>
            )}
            {formContext
            && formContext.errors
            && formContext.errors[name]
            && !validationErrorMessage && (
                <>
                    {formContext.errors[name].type === 'required' && (
                        <FormAlert>Required</FormAlert>
                    )}
                    {formContext.errors[name].type === 'pattern' && (
                        <>
                            {type === 'password' && (
                                <FormAlert>
                                    This password is not strong enough. Please
                                </FormAlert>
                            )}
                            {type === 'email' && (
                                <FormAlert>This is not a valid email.</FormAlert>
                            )}
                            {type === 'tel' && (
                                <FormAlert>This is not a valid phone number.</FormAlert>
                            )}
                            {type === 'number' && (
                                <FormAlert>This is not a valid phone number.</FormAlert>
                            )}
                            {type !== 'password'
                            && type !== 'tel'
                            && type !== 'email'
                            && type !== 'number' && <FormAlert>This is invalid.</FormAlert>}
                        </>
                    )}
                    {formContext.errors[name].type === 'maxLength' && (
                        <FormAlert>Maximum length exceeded</FormAlert>
                    )}
                    {formContext.errors[name].type === 'minLength' && (
                        <FormAlert>Not long enough</FormAlert>
                    )}
                </>
            )}
        </div>
    );
};

export default Input;
