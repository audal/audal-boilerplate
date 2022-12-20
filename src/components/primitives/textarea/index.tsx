import React from 'react';
import { useFormProvider } from '../form-provider';
import FormAlert from '../form-alert';
import usePersistedId from '../utils/use-persisted-id';
import VisuallyHidden from '../visually-hidden';
import throwOnMissing from '../utils/throw-on-missing';

export interface TextAreaProps
    extends HtmlPropsNoRef<HTMLTextAreaElement> {
    /**
     * Name of the Textarea - will be used for the form validation if using FormContext so make sure it's unique.
     */
    name: string;
    /**
     * Placeholder is always required.
     * */
    placeholder: string;
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
     * value here, or pass in a function (which will receive an Textarea argument that includes the type of error -
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
const TextArea = ({
    type = 'text',
    name,
    validationRegex,
    minLength,
    maxLength,
    validationErrorMessage,
    required = false,
    value,
    onChange,
    onBlur,
    className,
    disabled,
    ...props
}: TextAreaProps): JSX.Element => {
    throwOnMissing(name, 'name', 'Textarea');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Someone might still do this even though it's not defined in the type
    if (type === 'submit') {
        throw new Error(
            'Audal Components: The Input Primitive should not be used as a submit button. Please use <button type="submit" /> instead.',
        );
    }

    const typeRules = {
        password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        email:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        tel: /^[+]?(1-|1\s|1|\d{3}-|\d{3}\s|)?((\(\d{3}\))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/g,
        number: /^-?\d+\.?\d*$/,
        text: undefined,
    }[type];

    const formContext = useFormProvider();

    const id = usePersistedId();

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
        <span css={{ display: 'block', width: '100%' }}>
            <span
                css={{
                    position: 'relative',
                }}
            >
                <textarea
                    id={id}
                    aria-invalid={
                        formContext && formContext.errors && formContext.errors[name]
                            ? 'true'
                            : 'false'
                    }
                    css={{
                        padding: '10px 0',
                        width: '100%',
                        fontSize: '18px',
                        backgroundColor: 'transparent',
                        color: 'var(--color-shades-white)',
                        '&::placeholder': {
                            fontSize: '18px',
                            color: 'var(--color-shades-white)',
                        },
                        '@media (max-width: 767px)': {
                            fontSize: '16px',
                            '&::placeholder': {
                                fontSize: '16px',
                            },
                        },
                    }}
                    className={className}
                    {...registerFn}
                    {...props}
                />
                {required && (
                    <label
                        htmlFor={id}
                        css={{
                            top: '-106px',
                            right: '7px',
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span
                            css={{
                                fontSize: '14px',
                                paddingTop: '5px',
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
                                borderColor: formContext && formContext.errors[name] ? 'var(--color-blue-dunkelblau) !important' : '',
                                transition: 'color 0.2s',
                                marginTop: '1px',
                            }}
                        >
                            *
                            {' '}
                            <VisuallyHidden>Das ist ein Pflichtfeld</VisuallyHidden>
                        </span>
                    </label>
                )}
            </span>
            {formContext
            && formContext.errors
            && formContext.errors[name]
            && validationErrorMessage && (
                <FormAlert css={{ fontSize: '12px' }}>
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
                        <FormAlert css={{ fontSize: '12px' }}>Eingabe erforderlich</FormAlert>
                    )}
                    {formContext.errors[name].type === 'maxLength' && (
                        <FormAlert css={{ fontSize: '12px' }}>Maximale länge überschritten</FormAlert>
                    )}
                    {formContext.errors[name].type === 'minLength' && (
                        <FormAlert css={{ fontSize: '12px' }}>Nicht lang genug</FormAlert>
                    )}
                </>
            )}
        </span>
    );
};

export default TextArea;
