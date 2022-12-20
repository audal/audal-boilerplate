import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import CheckIcon from '../../../images/check-icon.svg';
import ChevronDownIcon from '../../../images/cheveron-down-icon.svg';
import ChevronUpIcon from '../../../images/chevron-up-icon.svg';
import { useFormProvider } from '../form-provider';
import throwOnMissing from '../utils/throw-on-missing';
import FormAlert from '../form-alert';
import ChevronDownLight from '../../../images/chevron-down-light.svg';
import ChevronRight from '../../../images/chevron-right.svg';

export interface SelectOptionProps { children: React.ReactNode | string, value: string; disabled?: boolean }

export const SelectOption: React.FC<SelectOptionProps> = ({
    children,
    value,
    disabled,
}) => (
    <SelectPrimitive.Item
        css={{
            fontSize: 16,
            lineHeight: 1,
            color: '#000',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            height: 'auto',
            padding: '14px 35px 14px 25px',
            position: 'relative',
            userSelect: 'none',

            '&[data-disabled]': {
                color: '#000',
                pointerEvents: 'none',
            },
            '&:hover': {
                backgroundColor: '#174874',
                color: 'var(--color-gray-white)',
            },

        }}
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
    >
        <SelectPrimitive.ItemText>
            {children}
        </SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator
            css={{
                position: 'absolute',
                right: 0,
                width: 25,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {value !== "" && <CheckIcon />}
        </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
);

export interface SelectProps
    extends Omit<
    HtmlPropsNoRef<SelectPrimitive.SelectProps>,
    'onChange' | 'onBlur'
    > {
    paddingTop?: string;
    onChange?(value: string): void;
    onBlur?(value: boolean): void;
    value?: string;
    children: any;
    name: string;
    arrowLeft?: boolean
}

const Select = ({
    children,
    onChange,
    onBlur,
    placeholder,
    name,
    required,
    disabled,
    value,
    className,
    width = '100%',
    arrowLeft = false,
}: SelectProps) : JSX.Element => {
    throwOnMissing(name, 'name', 'Select');

    const formContext = useFormProvider();

    if (!children) {
        // eslint-disable-next-line no-param-reassign
        children = [
            <SelectOption disabled value="NA">
                No options available.
            </SelectOption>,
        ];
    }

    if (!Array.isArray(children)) {
        // eslint-disable-next-line no-param-reassign
        children = [children];
    }

    if (placeholder) {
        // eslint-disable-next-line no-param-reassign
        children = [
            <SelectOption disabled value={placeholder}>
                {placeholder}
            </SelectOption>,
            children,
        ].flat();
    }

    React.useEffect(() => {
        if (!placeholder && formContext) {
            formContext.setValue(name, children[0].props.value);
        }
    }, [children, formContext, name, placeholder]);

    return (
        <div css={{ paddingBottom: '0px', width, height: '100%', position: 'relative' }}>
            <SelectPrimitive.Root
                onValueChange={(e) => {
                    if (onChange) {
                        onChange(e);
                    }
                    if (formContext) {
                        formContext.setValue(name, e);
                    }
                }}
                onOpenChange={onBlur}
                value={value}
                name={name}
                css={{
                    position: 'relative',
                }}
                defaultValue={children[0].props.value}
                {...formContext?.register(name, { required })}
            >
                <SelectPrimitive.SelectTrigger
                    css={{
                        width: '100%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: arrowLeft ? 'flex-start' : 'space-between',
                        fontSize: 15,
                        lineHeight: 1,
                        userSelect: 'none',
                        height: '100%',
                        paddingLeft: '25px',
                        paddingRight: '25px',
                        gap: 5,
                        textAlign: 'left',
                        backgroundColor: 'var(--color-gray-white)',
                        border: '1px solid #707070',
                        color: '#040503',
                        borderRadius: '30px',
                        '@media (max-width: 1200px)': {
                            height: '59px',
                        },
                        '@media (max-width: 767px)': {
                            paddingTop: '14px',
                            paddingBottom: '14px',
                            height: 'auto',
                        },
                    }}
                    className={className}
                    aria-label={name}
                    disabled={disabled}
                    aria-disabled={disabled}
                >
                    {arrowLeft && (
                        <div css={{ paddingRight: '8px' }}>
                            <ChevronRight />
                        </div>
                    )}
                    <SelectPrimitive.Value css={{ width: '100%', textAlign: 'left' }} />
                    {!arrowLeft && (
                        <SelectPrimitive.Icon>
                            <ChevronDownLight
                                style={{
                                    width: '24px',
                                    height: '12px',
                                }}
                            />
                        </SelectPrimitive.Icon>
                    )}
                </SelectPrimitive.SelectTrigger>
                <div css={{ position: 'relative' }}>
                    <SelectPrimitive.Content
                        css={{
                            overflow: 'hidden',
                            background: '#fefefe',
                            position: 'relative',
                            width: '100%',
                            borderRadius: '8px',
                            border: '1px solid var(--color-gray-mittelgrau)',
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.0784314)',

                        }}
                    >
                        <SelectPrimitive.SelectScrollUpButton
                            css={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 25,
                                margin: '0 -1px',
                                backgroundColor: '#9db8d1',
                                color: 'var(--color-gray-white)',
                                cursor: 'default',
                            }}
                        >
                            <ChevronUpIcon />
                        </SelectPrimitive.SelectScrollUpButton>
                        <SelectPrimitive.Viewport
                            css={{
                                padding: '5px',
                            }}
                        >
                            {children}
                        </SelectPrimitive.Viewport>
                        <SelectPrimitive.SelectScrollDownButton
                            css={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 25,
                                margin: '0 -1px',
                                backgroundColor: '#9db8d1',
                                color: 'var(--color-gray-white)',
                                cursor: 'default',
                            }}
                        >
                            <ChevronDownIcon />
                        </SelectPrimitive.SelectScrollDownButton>
                    </SelectPrimitive.Content>
                </div>
            </SelectPrimitive.Root>
            {formContext?.errors[name]?.type === 'required' && (
                <FormAlert css={{ fontSize: '12px' }}>Eingabe erforderlich</FormAlert>
            )}
        </div>
    );
};

export default Select;
