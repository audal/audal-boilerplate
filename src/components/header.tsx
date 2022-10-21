import React from 'react';
import Logo from '../images/icon.png';
import { GatsbyImageSVGFallback } from './primitives/image/gatsby-image-svg-fallback';
import Row from './primitives/grid/row';
import Col from './primitives/grid/col';

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
        <Row>
            <Col breakpoints={{ dt: { start: 0, span: 6, justify: 'end', align: 'center' } }}>
                <GatsbyImageSVGFallback width="60px" height="60px" css={{ marginRight: '40px' }} src={Logo} />
            </Col>
            <Col breakpoints={{ dt: { start: 6, span: 6 } }}>
                Audal Boilerplate
            </Col>
        </Row>
    </header>
);

export default Header;
