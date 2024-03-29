import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import usePersistedId from '../utils/use-persisted-id';
import { useFormProvider } from '../form-provider';
import FormAlert from '../form-alert';

export interface RadioProps
    extends Omit<HtmlPropsNoRef<HTMLInputElement>, 'value'> {
    /**
* Children refers to the label
* */
    children: any;
    /**
* The size of the radio button.
* */
    sizes?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
* Make the field disabled or not. Defaults to false for all field types.
 */
    disabled?: boolean;
    /**
* This refers to the value of the input
*/
    value?: string | boolean;
}

export const Radio = ({
    sizes = 'sm',
    children,
    value,
    disabled = false,
}: RadioProps): JSX.Element => {
    const foundsize = {
        xs: '0.75rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    }[sizes];
    const innersizes = {
        xs: '0.35rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
    }[sizes];
    const id = usePersistedId();

    return (
        <div css={{ display: 'flex', margin: '10px 0', alignItems: 'center' }}>
            <RadioGroupPrimitive.Item
                css={{
                    backgroundColor: 'white',
                    border: '2px solid #04050322',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    width: `${foundsize} !important`,
                    height: `${foundsize} !important`,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderImage: 'initial',
                    borderRadius: '50%',
                    borderColor: '#1A2027',
                    color: 'var(--color-gray-white)',
                    transition: 'all 0.3s',
                    '&:hover': { backgroundColor: '#04050311' },
                    '&[data-state=checked], &:hover[data-state=checked]': {
                        borderColor: '#007FFF',
                    },
                }}
                value={value as string}
                id={id}
                disabled={disabled}
                aria-disabled={disabled}
            >
                <RadioGroupPrimitive.Indicator
                    css={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transition: 'all 0.3s',
                        '&::after': {
                            content: '""',
                            display: 'block',
                            width: `${innersizes} !important`,
                            height: `${innersizes} !important`,
                            borderRadius: '50%',
                            backgroundColor: '#007FFF',
                        },
                    }}
                />
            </RadioGroupPrimitive.Item>
            <label
                css={{
                    color: 'black',
                    fontsizes: 15,
                    lineHeight: 1,
                    userSelect: 'none',
                    paddingLeft: 15,
                }}
                htmlFor={id}
            >
                {children}
            </label>
        </div>
    );
};

export interface RadioGroupBaseProps
    extends Omit<HtmlPropsNoRef<HTMLInputElement>, 'value'> {
    /**
* Name of the Radio - will be used for the form validation if using FormContext so make sure it's unique.
*/
    name: string;
    /**
* Children refers to the label
* */
    children: any;
    /**
* Make the field required or not. Defaults to false for all field types.
*/
    required?: boolean;
    /**
* This refers to the value of the input
*/
    value?: string | boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    formContext?: any;
}

const RadioGroupBase = ({
    children,
    onChange,
    name,
    required,
    value,
    formContext,
}: RadioGroupBaseProps) : JSX.Element => {
    if (!Array.isArray(children)) {
        // eslint-disable-next-line no-param-reassign
        children = [children];
    }
    return (
        <>
            <RadioGroupPrimitive.Root
                onValueChange={onChange}
                value={value}
                name={name}
                {...formContext?.register(name, { required })}
            >
                {children}
            </RadioGroupPrimitive.Root>
            {formContext?.errors[name]?.type === 'required' && (
                <FormAlert css={{ fontSize: '12px' }}>Eingabe erforderlich</FormAlert>
            )}
        </>
    );
};

export const RadioGroup = ({
    children,
    value,
    onChange,
    name,
    required = false,
}: RadioGroupBaseProps) : JSX.Element => {
    const formContext = useFormProvider();

    if (formContext) {
        return (
            <RadioGroupBase
                value={value}
                onChange={(e) => {
                    formContext.setValue(name, e);
                    if (onChange) {
                        onChange(e);
                    }
                }}
                name={name}
                required={required}
                formContext={formContext}
            >
                {children}
            </RadioGroupBase>
        );
    }
    return (
        <RadioGroupBase value={value} onChange={onChange} name={name}>
            {children}
        </RadioGroupBase>
    );
};

// export default Radio;
