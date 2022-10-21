import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import CheckIcon from '../../../images/check-icon.svg';
import { useFormProvider } from '../form-provider';
import FormAlert from '../form-alert';
import usePersistedId from '../utils/use-persisted-id';

export interface CheckBoxProps
    extends Omit<
    HTMLPropsNoRef<HTMLButtonElement>,
    'onChange' | 'type' | 'size' | 'value'
    > {
    /**
    * Name of the CheckBox - will be used for the form validation if using FormContext so make sure it's unique.
    */
    name: string;
    /**
     * Children refers to the label
     * */
    children: any;
    /**
     * The size of the radio button.
     * */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Make the field required or not. Defaults to false for all field types.
     */
    required?: boolean;
    /**
     * Explicitly control the state of the element
     */
    checked?: boolean;
    /**
     * Should the field be checked by default, if uncontrolled?
     */
    defaultChecked?: boolean;
    /**
     * Make the field disabled or not. Defaults to false for all field types.
     */
    disabled?: boolean;
    /**
     * This refers to the value of the input
     */
    value?: boolean;
    /*
     * onChange event
     * */
    onChange?(checked: CheckedState): void;
    /*
     * Style Inputs
     * */
    inputBoxStyle: string;
}

export const CheckBox = ({
    name,
    children,
    size = 'sm',
    required = false,
    defaultChecked = false,
    // onBlur,
    // disabled,
    value,
    onChange,
    onBlur,
    disabled,
}: CheckBoxProps): JSX.Element => {
    /*
     * Get our form provider. It may not exist
     * (if the input component is not inside a FormProvider and is using the component separately)
     * so make sure to not access it directly without first checking.
     * */
    const formContext = useFormProvider();

    const foundSize = {
        xs: '0.75rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    }[size];

    const innerSize = {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    }[size];

    const id = usePersistedId();

    /*
     * Set up our register function to be react-hook-form if the context exists,
     * if it doesn't, pass the props we destructed back to the element
     * */
    const registerFn = formContext && formContext.register
        ? formContext.register(name, {
            required,
            onBlur,
            disabled,
        })
        : {
            required,
            onBlur,
            disabled,
        };

    return (
        <>
            <div>
                <div css={{ alignItems: 'center', display: 'flex' }}>
                    <CheckboxPrimitive.Root
                        css={{
                            all: 'unset',
                            backgroundColor: `${value ? '#007FFF' : '#E7E7E7'}`,
                            border: `${value ? '3px solid #007FFF' : '3px solid #04050322'}`,
                            width: `${foundSize} !important`,
                            height: `${foundSize} !important`,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 10px "#007FFF"',
                            '&:focus': { boxShadow: '0px 0px 5px 2px #47a2ff' },
                        }}
                        aria-invalid={
                            formContext && formContext.errors && formContext.errors[name]
                                ? 'true'
                                : 'false'
                        }
                        id={id}
                        onCheckedChange={onChange}
                        defaultChecked={defaultChecked}
                        // checked={checked}
                        // {...formContext?.register(name, {
                        // required: required,
                        // })}
                        {...registerFn}
                    >
                        <CheckboxPrimitive.Indicator
                            css={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                        >
                            <CheckIcon width={innerSize} height={innerSize} />
                        </CheckboxPrimitive.Indicator>
                    </CheckboxPrimitive.Root>
                    <label
                        css={{
                            color: '#444444',
                            fontSize: '12px',
                            lineHeight: '26px',
                            fontWeight: '600',
                            userSelect: 'none',
                            paddingLeft: 6,
                        }}
                        htmlFor={id}
                    >
                        {children}
                    </label>
                </div>
            </div>
            {formContext?.errors[name]?.type === 'required' && (
                <FormAlert>Required</FormAlert>
            )}
        </>
    );
};
