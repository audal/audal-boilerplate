import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

const StyledLink = (props: GatsbyLinkProps<any>): JSX.Element => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Link
        css={{
            position: 'relative',
            transition: '0.3s',
            '[role=group]:hover &': {
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
                height: '1px',
                bottom: '-2px',
                width: '100%',
                backgroundColor: 'currentColor',
                transition: '0.3s transform ease-out',
                transform: 'scale(0)',
                transformOrigin: 'bottom right',
            },
            '&:hover::before': {
                transform: 'scale(1)',
                right: '0',
                transformOrigin: 'bottom left',
            },
            '&:hover': {
                opacity: 0.8,
            },
        }}
        {...props}
    />
);

export default StyledLink;
