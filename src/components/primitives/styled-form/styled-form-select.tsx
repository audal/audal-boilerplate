import React from 'react';
import Select, { SelectOption, SelectOptionProps, SelectProps } from '../select';

const StyledFormSelect = (props: SelectProps): JSX.Element => (
    <Select
        css={{
            height: 'unset',
            borderRadius: '0',
            paddingLeft: '0',
            paddingRight: '0',
            borderLeftWidth: '0px',
            borderRightWidth: '0px',
            borderTopWidth: '0px',
            borderBottomWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'var(--color-gray-mittelgrau)',
            padding: '0.4em 0',
            width: '100%',
            fontSize: '18px',
            backgroundColor: 'transparent',
            paddingBottom: '12px',
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
            '&:placeholder': {
                opacity: 0.8,
            },
        }}
        {...props}
    />
);

export const StyledFormSelectOption = (props: SelectOptionProps): JSX.Element => (
    <SelectOption
        {...props}
    />
);

export default StyledFormSelect;
