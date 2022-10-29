import React from 'react';

interface ButtonBlockProps {
}

const ButtonBlock = (props: ButtonBlockProps): JSX.Element => (
    <div
        css={{
            width: 'auto',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            flexDirection: 'column',
        }}
    >
        <button
            type="button"
            css={{
                color: 'var(--color-shades-white)',
                width: '100%',
                display: 'inline-block',
                fontSize: '12px',
                alignItems: 'center',
                lineHeight: '16px',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                textTransform: 'uppercase',
                justifyContent: 'center',
                borderColor: 'var(--color-shades-black)',
                borderWidth: '1px',
                backgroundColor: 'var(--color-primary-pine)',
            }}
            {...props}
        />
    </div>
);

export default ButtonBlock;
