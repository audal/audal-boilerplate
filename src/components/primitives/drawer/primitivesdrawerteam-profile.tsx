import React from 'react';
import ButtonBlock from '../button/block';

const TeamProfile = (): JSX.Element => (
    <div
        css={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-start',
            flexDirection: 'column',
        }}
    >
        <div
            css={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                position: 'relative',
                gridColumn: 'span 12',
                flexDirection: 'column',
                '@media (max-width: 1200px)': {
                    gridColumn: 'span 4',
                },
            }}
        >
            <div
                css={{
                    width: 'auto',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    padding: '20px 38px 60px 36px',
                    justifyContent: 'flex-start',
                    '@media (max-width: 767px)': {
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    },
                }}
            >
                <ButtonBlock />
                <h1
                    css={{
                        color: 'var(--color-shades-white)',
                        maxWidth: '432px',
                        paddingTop: '12px',
                        '@media (max-width: 767px)': {
                            fontSize: '24px',
                            lineHeight: '30px',
                        },
                        fontSize: '30px',

                        fontWeight: '400',
                        lineHeight: '38px',
                    }}
                >
                    Tim Ryder Director
                </h1>
            </div>
            <div
                css={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    paddingLeft: '36px',
                    paddingRight: '38px',
                    flexDirection: 'column',
                    '@media (max-width: 767px)': {
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    },
                }}
            >
                <span
                    css={{
                        color: 'var(--color-shades-white)',
                        fontWeight: '400',
                        paddingBottom: '53px',
                        fontSize: '16px',

                        lineHeight: '22px',
                    }}
                >
                    About
                </span>
                <span
                    css={{
                        color: 'var(--color-shades-white)',
                        fontWeight: '400',
                        paddingBottom: '53px',
                        fontSize: '14px',

                        lineHeight: '20px',
                    }}
                >
                    <span>
                        Donec ut blandit eros. Pellentesque imperdiet lacinia tincidunt.
                        Donec tempus vitae risus in vehicula. Aenean blandit fringilla
                        rutrum. Sed condimentum tempor lobortis. Duis vel sapien congue,
                        cursus sapien vel, luctus est. Etiam lobortis nisl eu lorem
                        accumsan pharetra. Phasellus posuere et leo nec luctus. Sed
                        hendrerit, ipsum sit amet placerat dictum, lectus augue lobortis
                        arcu, id aliquet mauris est a dui.

                    </span>
                    <br
                        css={{
                            color: 'var(--color-shades-white)',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '20px',
                        }}
                    />
                    <br />
                    <br
                        css={{
                            color: 'var(--color-shades-white)',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '20px',
                        }}
                    />
                    <br />
                    <span>
                        Etiam lobortis nisl eu lorem accumsan pharetra. Phasellus posuere
                        et leo nec luctus. Sed hendrerit, ipsum sit amet placerat dictum,
                        lectus augue lobortis arcu, id aliquet mauris est a dui.
                    </span>
                </span>
            </div>
            <div
                css={{
                    width: '100%',
                    bottom: '20px',
                    height: 'auto',
                    display: 'flex',
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    alignItems: 'flex-start',
                    padding: '10px 36px',
                    justifyContent: 'space-between',
                    '@media (max-width: 767px)': {
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    },
                }}
            >
                <span
                    css={{
                        color: 'var(--color-shades-white)',
                        width: '100%',
                        fontSize: '14px',

                        lineHeight: '20px',
                    }}
                >
                    <span>view Gallery</span>
                    <br />
                </span>
                <span
                    css={{
                        color: 'var(--color-shades-white)',
                        width: '100%',
                        fontSize: '14px',

                        lineHeight: '20px',
                    }}
                >
                    <span>back to Projects</span>
                    <br />
                </span>
            </div>
        </div>
    </div>
);
export default TeamProfile;
