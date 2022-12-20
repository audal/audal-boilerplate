import React from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';

const StyledPillButton = (props: GatsbyLinkProps<any>): JSX.Element => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Link
        css={{
            width: 'auto',
            border: '1px solid var(--color-primary-amazon)',
            display: 'flex',
            padding: '4px 6px',
            textTransform: 'uppercase',
            fontSize: '12px',
            lineHeight: '16px',
            transition: '0.3s',
            '&:hover, &[data-active=true]': {
                backgroundColor: 'var(--color-primary-amazon)',
                color: 'var(--color-shades-white)',
            },
        }}
        {...props}
    />
);

export const StyledPillButtonGroup = (props: HtmlPropsNoRef<HTMLDivElement>): JSX.Element => (
    <div
        css={{
            display: 'flex',
            flexFlow: 'wrap',
            gap: '10px',
            '@media (max-width: 767px)': {
                gap: '8px',
            },
        }}
        {...props}
    />
);

export default StyledPillButton;
