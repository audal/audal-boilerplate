import React from 'react';
import { Link } from 'gatsby';
import HouseIcon from '../../../images/house-solid.svg';
import ChevronRight from '../../../images/chevron-right-alternative.svg';
import Container from '../grid/container';
import StyledLink from '../styled-link';

interface BreadcrumbsProps {
    crumbs?: { text?: string | null, url?: string | null }[]
    sliceFirst?: boolean
}

/*
* These are controlled by Yoast.
* Breadcrumb updates must be done in the Yoast Panel on each individual page.
*
* Yoast will automatically create breadcrumbs based on page structure, but if you
* wish to alter these, they will need to be changed within the plugin UI.
* */

const Breadcrumbs = ({ crumbs, sliceFirst = true }: BreadcrumbsProps) => (
    <Container
        css={{
            display: 'flex',
            paddingTop: '22px',
            paddingBottom: '12px',
            backgroundColor: 'var(--color-gray-white)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
                height: '10px',
                borderTop: '9px solid #fff',
                backgroundColor: 'var(--color-gray-almostwhite)',
            },
            '&::-webkit-scrollbar-thumb': {
                height: '10px',
                borderTop: '9px solid #fff',
                backgroundClip: 'padding-box',
                backgroundColor: 'var(--color-blue-mittelblau)',
            },
        }}
    >
        <Link to="/">
            <HouseIcon css={{
                height: '20px',
                marginBottom: '2px',
            }}
            />
        </Link>
        {crumbs && crumbs.slice(sliceFirst ? 1 : 0).map(({ text, url }, index) => (
            <React.Fragment key={index}>
                <div
                    css={{
                        paddingLeft: '20px',
                        '@media (max-width: 767px)': {
                            paddingLeft: '10px',
                        },
                    }}
                >
                    <ChevronRight css={{
                        height: '12px',
                    }}
                    />
                </div>
                <StyledLink
                    small
                    to={url || ''}
                    className="p3"
                    css={{
                        color: '#2A2A2A',
                        marginLeft: '16px',
                        whiteSpace: 'nowrap',
                        '@media (max-width: 767px)': {
                            marginLeft: '8px',
                        },
                    }}
                >
                    {text}
                </StyledLink>
            </React.Fragment>
        ))}
    </Container>
);

export default Breadcrumbs;
