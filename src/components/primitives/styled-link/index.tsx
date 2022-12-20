import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

const StyledLink = ({
    small,
    variant = 'normal',
    ...props
}: GatsbyLinkProps<any> & {
    small?: boolean;
    variant?: 'normal' | 'underlined';
}): JSX.Element => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Link
        css={{
            position: 'relative',
            transition: '0.3s',
            '[role=group]:hover, [data-state="open"] &': {
                '&::before': {
                    transform: 'scale(1)',
                    right: '0',
                    transformOrigin: 'bottom left',
                },
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                left: '0',
                height: small ? '1px' : '2px',
                bottom: '-2px',
                width: '100%',
                backgroundColor: 'currentColor',
                transition: '0.3s transform ease-out',
                transform: variant === 'normal' ? 'scaleX(0)' : 'scaleX(1)',
                transformOrigin: variant === 'normal' ? 'bottom right' : 'bottom left',
            },
            '&:hover::before': {
                transform: variant === 'normal' ? 'scaleX(1)' : 'scaleX(0)',
                right: '0',
                transformOrigin: variant === 'normal' ? 'bottom left' : 'bottom right',
            },
            '&:hover': {
                opacity: variant === 'normal' ? 0.8 : 1,
            },
        }}
        {...props}
    />
);

export default StyledLink;
