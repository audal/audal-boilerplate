import React from 'react';
import CheckIcon from '../../../images/check-icon.svg';

const StyledCheckbox = ({ children, isChecked, type, ...props }: HtmlPropsNoRef<HTMLButtonElement> & { isChecked?: boolean }): JSX.Element => (
    <button
        type="button"
        css={{
            display: 'flex',
            alignItems: 'center',
            justifyContext: 'flex-start',
        }}
        {...props}
    >
        <div css={{
            width: '30px',
            height: '30px',
            flex: 'none',
            backgroundColor: isChecked ? 'var(--color-blue-mittelblau)' : 'var(--color-gray-white)',
            borderRadius: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isChecked ? '1px solid var(--color-blue-mittelblau)' : '1px solid var(--color-gray-grau)',
            '& svg path': {
                fill: isChecked ? 'var(--color-gray-white)' : 'transparent',
                transformOrigin: 'center',
                transition: '0.1s',
                transform: isChecked ? 'scale(1)' : 'scale(0)',
            },
            '@media (max-width: 767px)': {
                width: '20px',
                height: '20px',
            }
        }}
        >
            <CheckIcon css={{
                width: '18px',
                height: '18px',
                '@media (max-width: 767px)': {
                    width: '11px',
                    height: '11px',
                }
            }} />
        </div>
        <div css={{
            paddingLeft: '10px',
        }}
        >
            {children}
        </div>
    </button>
);

export default StyledCheckbox;
