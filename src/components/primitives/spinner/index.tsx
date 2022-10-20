import React from 'react';
import { keyframes } from '@emotion/react';
import VisuallyHidden from '../visually-hidden';

const spin = keyframes({
    '0%': {
        transform: 'rotate(0deg)',
    },
    '100%': {
        transform: 'rotate(360deg)',
    },
});

export interface SpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * A spinner component taken from Chakra-UI.
 * Features same size parameter as Chakra so in most cases should
 * be a drop-in replacement.
 * @alias SpinnerProps
 * */
const Spinner = ({ size = 'md' }: SpinnerProps): JSX.Element => {
    const foundSize = {
        xs: '0.75rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    }[size];

    return (
        <div
            css={{
                display: 'inline-block',
                borderColor: 'currentColor',
                borderStyle: 'solid',
                borderRadius: '99999px',
                borderWidth: '2px',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                width: foundSize,
                height: foundSize,
                animation: `${spin} 0.45s linear infinite`,
                '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none!important',
                },
            }}
        >
            <VisuallyHidden>Loading...</VisuallyHidden>
        </div>
    );
};

export default Spinner;
