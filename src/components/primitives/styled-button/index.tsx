import React from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';
import LongArrow from '../../../images/long-arrow.svg';

interface StyledButtonProps {
    arrowLeft?: boolean
    arrowRight?: boolean
    theme?: 'primary' | 'secondary' | 'tertiary' | 'primaryDark' | 'secondaryDark' | 'tertiaryDark' | 'red',
    icon?: JSX.Element
}

const StyledButton = ({
    children = 'Mehr', icon, arrowLeft, arrowRight, theme = 'primary', ...props
}: StyledButtonProps & GatsbyLinkProps<any>): JSX.Element => {
    const colorSet = {
        primary: { bg: 'var(--color-blue-mittelblau)', text: 'var(--color-gray-white)', border: 'var(--color-blue-mittelblau)' },
        secondary: { bg: 'transparent', text: 'var(--color-blue-mittelblau)', border: 'var(--color-blue-mittelblau)' },
        tertiary: { bg: 'transparent', text: 'var(--color-blue-mittelblau)', border: 'transparent' },
        primaryDark: { bg: 'var(--color-gray-almostwhiter)', text: 'var(--color-blue-mittelblau)', border: 'var(--color-gray-almostwhiter)' },
        secondaryDark: { bg: 'transparent', text: 'var(--color-gray-almostwhiter)', border: 'var(--color-gray-almostwhiter)' },
        tertiaryDark: { bg: 'transparent', text: 'var(--color-gray-almostwhiter)', border: 'transparent' },
        red: { bg: 'var(--color-red-drkrot)', text: 'var(--color-gray-almostwhite)', border: 'var(--color-red-drkrot)' },
    }[theme];

    const padding = {
        primary: '14px 24px 12px',
        secondary: '14px 24px 12px',
        tertiary: '14px 0',
        primaryDark: '14px 24px 12px',
        secondaryDark: '14px 24px 12px',
        tertiaryDark: '14px 0',
        red: '11px 28px',
    }[theme];

    const hasNoArrow = !arrowLeft && !arrowRight;

    return (
        // @ts-ignore
        <Link
            role="group"
            className="p2"
            css={{
                color: colorSet.text,
                // width: '100%',
                display: 'flex',
                borderColor: colorSet.border,
                borderWidth: '1px',
                borderRadius: '30px',
                flexDirection: 'row',
                padding,
                justifyContent: hasNoArrow ? 'center' : 'space-between',
                alignItems: 'center',
                backgroundColor: colorSet.bg,
                fontStyle: 'normal',
                fontWeight: '600!important',
                textTransform: 'none',
                textDecoration: 'none',
            }}
            {...props}
        >
            {icon
            && (
                <span css={{ marginRight: '7px' }}>
                    {icon}
                </span>
            )}
            {arrowLeft && (
                <LongArrow css={{
                    maxWidth: '100%',
                    marginRight: '16px',
                    transition: 'transform 0.3s',
                    transform: 'rotate(180deg)',
                    '[role="group"]:hover &': {
                        transform: 'rotate(180deg) scaleX(1.04) translateX(2.5px)',
                    },
                }}
                />
            )}
            {children}
            {arrowRight && (
                <LongArrow css={{
                    maxWidth: '100%',
                    marginLeft: '16px',
                    transition: 'transform 0.3s',
                    '[role="group"]:hover &': {
                        transform: 'scaleX(1.04) translateX(2.5px)',
                    },
                }}
                />
            )}
        </Link>
    );
};

export default StyledButton;
