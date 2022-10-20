import React from 'react';
import { Link } from 'gatsby';
import Logo from '../images/icon.png';
import { GatsbyImageSVGFallback } from './primitives/image/gatsby-image-svg-fallback';

const Header: React.FC = () => (
    <header
        css={{
            position: 'sticky',
            zIndex: '10',
            top: 0,
            height: '150px',
            width: '100%',
            transition: '1s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(12px)',
        }}
    >
        <GatsbyImageSVGFallback width="60px" height="60px" css={{ marginRight: '40px' }} src={Logo} />
        Audal Boilerplate
    </header>
);

export default Header;
