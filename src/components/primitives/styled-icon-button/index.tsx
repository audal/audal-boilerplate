import React from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';

export const StyledIconButtonLink = (props: GatsbyLinkProps<any>): JSX.Element => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Link
        css={{
            minWidth: '34px',
            height: '34px',
            borderRadius: '500px',
            transition: '0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-gray-white)',
            border: '1px solid transparent',
            '&:hover, &[data-active=true]': {
                border: '1px solid var(--color-gray-mittelgrau)',
            },
        }}
        {...props}
    />
);

export const StyledIconButton = (props: HtmlPropsNoRef<HTMLButtonElement>): JSX.Element => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <button
        css={{
            minWidth: '34px',
            height: '34px',
            borderRadius: '500px',
            transition: '0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-gray-white)',
            border: '1px solid transparent',
            '&:hover, &[data-active=true]': {
                border: '1px solid var(--color-gray-mittelgrau)',
            },
        }}
        {...props}
    />
);

export const StyledIconButtonColored = (props: HtmlPropsNoRef<HTMLButtonElement>): JSX.Element => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <button
        css={{
            minWidth: '34px',
            height: '34px',
            borderRadius: '500px',
            transition: '0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-gray-hellgrau)',
            border: '1px solid transparent',
            '&:disabled': {
                opacity: '0.6',
                cursor: 'not-allowed',
            },
            '&:hover:enabled, &[data-active=true], &:focus:enabled': {
                border: '1px solid transparent',
                backgroundColor: 'var(--color-blue-mittelblau)',
                color: 'var(--color-gray-white)',
            },
        }}
        {...props}
    />
);

export default StyledIconButton;
