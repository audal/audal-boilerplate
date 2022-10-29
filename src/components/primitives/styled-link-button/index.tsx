import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

const StyledLinkButton = (props: GatsbyLinkProps<any>): JSX.Element => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Link
        css={{
            position: 'relative',
            transition: '0.3s',
            backgroundColor: 'var(--color-shades-white)',
            padding: '10px',
            marginRight: '-10px',
            marginTop: '-5px',
            borderRadius: '5px',
            '&:hover': {
                opacity: 0.8,
                backgroundColor: 'var(--color-primary-parchment)',
                marginRight: '0px',
            },
        }}
        {...props}
    />
);

export default StyledLinkButton;
