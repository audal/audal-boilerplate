import React from 'react';
import TextArea, { TextAreaProps } from '../textarea';

const StyledFormTextarea = (props: TextAreaProps): JSX.Element => (
    <TextArea
        css={{
            paddingBottom: '12px',
            borderBottomWidth: '1px',
            borderStyle: 'solid',
            width: '100%',
            borderColor: 'var(--color-gray-mittelgrau)',
            '&:placeholder': {
                opacity: 0.8,
            },
        }}
        {...props}
    />
);

export default StyledFormTextarea;
