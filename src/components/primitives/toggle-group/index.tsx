import React from 'react';
import { Root, Item, ToggleGroupItemProps, ToggleGroupMultipleProps, ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';

const ToggleGroup = (props: ToggleGroupMultipleProps | ToggleGroupSingleProps) => (
    <Root
        css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            '&>*:not(style)~*:not(style)': {
                marginLeft: '22px',
            },
        }}
        {...props}
    />
);

export const ToggleGroupItem = (props: ToggleGroupItemProps) => (
    <Item
        css={{
            whiteSpace: 'nowrap',
            height: '39px',
            backgroundColor: 'var(--color-gray-hellgrau)',
            padding: '0 15px',
            color: 'var(--color-gray-schwarz)',
            borderRadius: '500px',
            transition: '0.2s',
            '&:hover, &[data-state="on"]': {
                backgroundColor: 'var(--color-blue-mittelblau)',
                color: 'var(--color-gray-white)',
            },
        }}
        {...props}
    />
);

export default ToggleGroup;
