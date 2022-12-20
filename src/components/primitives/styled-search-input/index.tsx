import React from 'react';
import Input, { InputProps } from '../input';

const StyledSearchInput = (props: InputProps) => (
    <Input
        className="p3"
        css={{
            color: 'var(--color-gray-schwarz)',
            width: '162px',
            border: 'none',
            marginLeft: '29px',
            borderRadius: '30px',
            padding: '7px 20px',
            backgroundColor: 'var(--color-gray-hellgrau)',
            transition: '0.4s',
            '@media (max-width: 767px)': {
                width: '100%',
                marginLeft: '0',
            },
            '&:focus': {
                width: '320px',
                '@media (max-width: 767px)': {
                    width: '100%',
                },
            },
            '::placeholder': {
                fontSize: '16px',
            },
        }}
        {...props}
    />
);

export default StyledSearchInput;
