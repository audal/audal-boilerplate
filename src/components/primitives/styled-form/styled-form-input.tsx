import React from 'react';
import Input, { InputProps } from '../input';

const StyledFormInput = (props: InputProps) => (
    <Input
        css={{
            paddingBottom: '12px',
            borderBottomWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'var(--color-gray-mittelgrau)',
            '&:placeholder': {
                opacity: 0.8,
            },
        }}
        {...props}
    />
);

export default StyledFormInput;
