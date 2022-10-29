import React from 'react';

interface ButtonTransparentProps {
    button?: string;
}

const ButtonTransparent = (props: ButtonTransparentProps): JSX.Element => (
    <div
        css={{
            width: 'auto',
            display: 'flex',
            position: 'relative',
            maxWidth: '102px',
            alignItems: 'flex-start',
            flexDirection: 'column',
        }}
    >
        <div
            css={{
                width: '100%',
                display: 'flex',
                position: 'relative',
                maxWidth: '102px',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <button
                css={{
                    color: 'var(--color-shades-white)',
                    width: '100%',
                    display: 'inline-block',
                    fontSize: '12px',
                    minWidth: 'auto',
                    alignItems: 'center',
                    lineHeight: '16px',
                    borderColor: 'var(--color-shades-black)',
                    borderWidth: '1px',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    textTransform: 'uppercase',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-primary-pine)',
                }}
                {...props}
            />
        </div>
    </div>
);

export default ButtonTransparent;
