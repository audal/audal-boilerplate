import React from 'react';
import Logo from '../images/icon.png';
import { GatsbyImageSVGFallback } from './primitives/image/gatsby-image-svg-fallback';
import Row from './primitives/grid/row';
import Col from './primitives/grid/col';
import Container from "./primitives/grid/container";

const Header: React.FC = () => (
    <Container>
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
                <Col breakpoints={{ dt: { span: 6, justify: 'center', align: 'center' } }}>
                    <GatsbyImageSVGFallback width="60px" height="60px" src={Logo} />
                </Col>
                <Col breakpoints={{ dt: { span: 6, justify: 'center', align: 'center' } }}>
                    Audal Boilerplate
                </Col>
            </Row>
        </header>
    </Container>
);

export default Header;
