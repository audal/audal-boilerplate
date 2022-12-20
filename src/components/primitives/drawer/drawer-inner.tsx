import React from 'react';
import CloseIcon from '../../../images/close-icon.svg';
import { DrawerTrigger } from './index';

const DrawerInner = ({ title, children, tags }: {
    title: React.ReactNode | React.ReactNode[], children: React.ReactNode | React.ReactNode[], tags?: {name: string}[]
}): JSX.Element => (
    <div css={{
        backgroundColor: 'var(--color-primary-pine)',
        height: '100%',
        color: 'var(--color-shades-white)',
    }}
    >
        <div
            css={{
                position: 'relative',
                display: 'flex',
                justifyContent: tags ? 'space-between' : 'flex-end',
                paddingTop: '28px',
                paddingLeft: tags ? '36px' : '0',
                alignItems: 'center',
                paddingBottom: '4px',
                '@media (max-width: 767px)': {
                    paddingBottom: '15px',
                    paddingLeft: tags ? '20px' : '0',
                },
            }}
        >

            { tags && (
                <div
                    css={{
                        display: 'flex',
                    }}
                >
                    {
                        tags.map(({ name }) => (
                            <div
                                css={{
                                    textTransform: 'uppercase',
                                    padding: '4px 6px',
                                    background: '#3B7A57',
                                    fontSize: '12px',
                                    lineHeight: '16px',
                                    height: 'fit-content',
                                    display: 'inline-flex',
                                    marginRight: '10px',
                                    letterSpacing: '0.4px',
                                }}
                            >
                                {name}
                            </div>
                        ))
                    }
                </div>
            )}
            <DrawerTrigger css={{
                height: '40px',
                right: '0',
                width: '56px',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '12px',
                paddingLeft: '12px',
                paddingBottom: '12px',
                paddingRight: '29px',
                justifyContent: 'center',
                backgroundColor: 'var(--color-primary-pine)',
                borderWidth: '1px',
                borderRight: 'none',
                transition: '0.3s',
                '&:hover': {
                    borderColor: 'var(--color-shades-white)',
                },
            }}
            >
                <CloseIcon />
            </DrawerTrigger>
        </div>
        <div css={{
            paddingLeft: '36px',
            paddingRight: '0',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            height: 'calc(100% - 90px)',
            '@media (max-width: 767px)': {
                paddingLeft: '20px',
            },
        }}
        >
            <div css={{
                fontSize: '30px',
                lineHeight: '38px',
                paddingBottom: '60px',
                '@media (max-width: 767px)': {
                    fontSize: '24px',
                    lineHeight: '30px',
                    paddingBottom: '48px',
                },
            }}
            >
                {title}
            </div>
            {children}
        </div>
    </div>
);
export default DrawerInner;
