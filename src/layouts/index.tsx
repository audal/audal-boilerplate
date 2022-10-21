import React from 'react';
import { PageProps } from 'gatsby';
import { Global } from '@emotion/react';
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav';
import Header from '../components/header';
import Footer from '../components/footer';
import '@reach/skip-nav/styles.css';
import FadeTransition from '../components/animations/transitions/fade-transition';
import Provider from '../components/primitives/provider';
import generateRootStyles from '../utils/generate-root-styles';
import GridContextProvider from '../components/primitives/grid/context';
import 'focus-visible/dist/focus-visible';
import './reset.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = ({ children, location }: PageProps): React.ReactElement => (
    <Provider>
        <GridContextProvider
            breakpoints={{
                dt: { query: '@media screen', columns: 12, gap: 30 },
                tb: { query: '@media (max-width: 1200px)', columns: 12, gap: 30 },
                mb: { query: '@media (max-width: 767px)', columns: 4, gap: 30 },
            }}
            maxWidth={1440}
        >
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
                    <SkipNavContent css={{ width: '100%' }} id="skip-nav" as="main">{children}</SkipNavContent>
                </FadeTransition>
                <Footer />
            </div>
        </GridContextProvider>
    </Provider>
);

export default Layout;
