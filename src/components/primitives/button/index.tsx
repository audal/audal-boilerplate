import React from 'react';
import Spinner from '../spinner';

/**
 * Re-usable screen-reader friendly Button component.
 * @alias ButtonProps
 * */
export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    /**
	 * Shows a spinner and disables the button, for when there is a loading action happening.
	 * Default is false.
	 * */
    loading?: boolean;
    /**
	 * The type of the button.
	 * */
    type?: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    children?: any;
    disabled?: boolean;
    style?: any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            disabled,
            style,
            loading,
            className,
            children,
            type = 'button',
            ...props
        },
        ref,
    ) => (
        <button
            type={type}
            role="button"
            aria-disabled={disabled}
            disabled={disabled || loading}
            style={style}
            /**
				 * Can buttons that have a loading state be considered a toggle button?
				 * Not sure...
				 */
            className={className}
            aria-pressed={typeof loading !== undefined ? loading : undefined}
            css={{
                cursor: 'pointer',
                appearance: 'none',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                verticalAlign: 'middle',
                outlineOffset: '2px',
                width: 'auto',
                transition: 'opacity 0.3s',
                lineHeight: '1.2',
                '&[disabled]': {
                    cursor: 'not-allowed',
                    opacity: loading ? 0.8 : 0.4,
                },
            }}
            {...props}
        >
            <div
                aria-hidden={!loading}
                css={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: loading ? 1 : 0,
                    transition: '0.2s',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                }}
            >
                <Spinner size="sm" />
            </div>
            <span
                aria-hidden={!!loading}
                css={{
                    opacity: loading ? 0 : 1,
                    transition: '0.2s',
                }}
            >
                {children}
            </span>
        </button>
    ),
);

Button.displayName = 'Button';

export default Button;
