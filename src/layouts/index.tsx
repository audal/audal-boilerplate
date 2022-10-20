import React from 'react';
import { PageProps } from 'gatsby';
import { Global } from '@emotion/react';
import Header from '../components/header';
import Footer from '../components/footer';
import 'focus-visible/dist/focus-visible';
import './reset.css';
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav';
import '@reach/skip-nav/styles.css';
import FadeTransition from '../components/animations/transitions/fade-transition';
import Provider from '../components/primitives/provider';
import generateRootStyles from '../utils/generate-root-styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = ({ children, location }: PageProps): React.ReactElement => (
    <Provider>
        <Global
            styles={generateRootStyles({
                smallScreenSize: 320,
                largeScreenSize: 1440,
                backgroundColor: '#fff',
                textColor: '#000',
            })}
        />
        <SkipNavLink contentId="skip-nav" />
        <div className="__audal_labs" css={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Header />
            <FadeTransition shouldChange={location.pathname}>
                <SkipNavContent id="skip-nav" as="main">{children}</SkipNavContent>
            </FadeTransition>
            <Footer />
        </div>
    </Provider>
);

export default Layout;
