import React from 'react';
import ChevronDown from '../../../images/cheveron-down-icon.svg';
import { AccordionButton } from './index';

const StyledAccordionButton = ({ noLabel, showLabel, hideLabel }: {
    noLabel?: boolean, showLabel?: string, hideLabel?: string
}): JSX.Element => (
    <AccordionButton>
        <div
            css={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                marginTop: '38px',
            }}
        >
            <div
                css={{
                    width: '100%',
                    height: '1px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    backgroundColor: 'var(--color-gray-mittelgrau)',
                }}
            />
            <div
                css={{
                    height: 'auto',
                    display: 'flex',
                    maxWidth: 'var(--size-size-xlarge)',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {!noLabel && (
                    <span
                        css={{
                            fontSize: '16px',
                            fontFamily: 'Open Sans',
                            whiteSpace: 'nowrap',
                            lineHeight: '1.4',
                            fontWeight: 600,
                            padding: '0 20px',
                            '@media (max-width: 767px)': {
                                fontSize: '12px',
                                lineHeight: '1.6',
                            },
                            '[data-state=open] &:after': {
                                content: hideLabel ? `"${hideLabel}"` : '"Weniger"',
                                display: 'block',
                            },
                            '[data-state=closed] &:after': {
                                content: showLabel ? `"${showLabel}"` : '"Mehr"',
                                display: 'block',
                            },
                        }}
                    />
                )}
                <ChevronDown
                    css={{
                        width: '29px',
                        height: '14px',
                        marginTop: '6px',
                        objectFit: 'cover',
                        color: '#E60005',
                        marginLeft: '17px',
                        marginRight: '17px',
                        transition: '0.3s',
                        '[data-state=open] &': {
                            transform: 'rotate(180deg)',
                        },
                        '@media (max-width: 767px)': {
                            width: '20px',
                            height: '10px',
                            marginTop: '4px',
                        },
                    }}
                />
            </div>
            <div
                css={{
                    width: '100%',
                    height: '1px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    backgroundColor: 'var(--color-gray-mittelgrau)',
                }}
            />
        </div>
    </AccordionButton>
);

export default StyledAccordionButton;
