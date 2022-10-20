import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import CheckIcon from '../../../images/check-icon.svg';
import ChevronDownIcon from '../../../images/cheveron-down-icon.svg';
import ChevronUpIcon from '../../../images/cheveron-up-icon.svg';
import { useFormProvider } from '../form-provider';
import throwOnMissing from '../utils/throw-on-missing';
import FormAlert from '../form-alert';
import AiFillCaretDown from '../../../images/ai-fill-caret-down-icon.svg';

export const SelectOption: React.FC<{ value: string; disabled?: boolean }> = ({
    children,
    value,
    disabled,
}) => (
    <SelectPrimitive.Item
        css={{
            fontSize: 13,
            lineHeight: 1,
            color: '#fff',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            height: 25,
            padding: '0 35px 0 25px',
            position: 'relative',
            userSelect: 'none',
            '&[data-disabled]': {
                color: '#fff5',
                pointerEvents: 'none',
            },
            '&:hover': {
                backgroundColor: '#131416',
            },
        }}
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
    >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
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
            <CheckIcon />
        </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
);

export interface SelectProps
    extends Omit<
    HTMLPropsNoRef<SelectPrimitive.SelectProps>,
    'onChange' | 'onBlur'
    > {
    paddingTop?: string;
    onChange?(value: string): void;
    onBlur?(value: boolean): void;
    value?: string;
    variant?: 'full' | 'inline';
    children: any;
    name: string;
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
    paddingTop = '20px',
    width = '100%',
    variant = 'full',
}: SelectProps) => {
    throwOnMissing(name, 'name', 'Select');

    const formContext = useFormProvider();

    if (!children) {
        children = [
            <SelectOption disabled value="NA">
                No options available.
            </SelectOption>,
        ];
    }

    if (!Array.isArray(children)) {
        children = [children];
    }

    if (placeholder) {
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
    }, []);

    return (
        <div css={{ paddingBottom: paddingTop, width }}>
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
                defaultValue={children[0].props.value}
                {...formContext?.register(name, { required })}
            >
                <SelectPrimitive.SelectTrigger
                    css={{
                        width: '100%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 15,
                        lineHeight: 1,
                        userSelect: 'none',
                        height: 40,
                        gap: 5,
                        textAlign: 'left',
                        backgroundColor: '#fff',
                        border: '1px solid transparent',
                        color: '#040503',
                    }}
                    className={className}
                    aria-label={name}
                    disabled={disabled}
                    aria-disabled={disabled}
                >
                    <SelectPrimitive.Value />
                    <SelectPrimitive.Icon>
                        <AiFillCaretDown
                            style={{
                                width: '10px',
                                height: '10px',
                            }}
                        />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.SelectTrigger>
                <SelectPrimitive.Content
                    css={{
                        overflow: 'hidden',
                        backgroundColor: '#9db8d1',
                        borderRadius: 6,
                        boxShadow:
							'0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
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
                            color: '#fff',
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
                            color: '#fff',
                            cursor: 'default',
                        }}
                    >
                        <ChevronDownIcon />
                    </SelectPrimitive.SelectScrollDownButton>
                </SelectPrimitive.Content>
            </SelectPrimitive.Root>
            {formContext?.errors[name]?.type === 'required' && (
                <FormAlert>Required</FormAlert>
            )}
        </div>
    );
};

export default Select;
