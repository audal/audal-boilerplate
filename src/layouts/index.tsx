import React from 'react';
import * as Chakra from '@chakra-ui/react';
import { PageProps } from 'gatsby';
import Header from '../components/header';
import Footer from '../components/footer';
import 'keen-slider/keen-slider.min.css';
import Transition from '../components/transitions/transition';
import 'focus-visible/dist/focus-visible';
import { Global, css } from '@emotion/react';

const Layout = ({ children, location }: PageProps): React.ReactElement => {
  /*
      This will hide the focus indicator if the element receives focus via the mouse,
      but it will still show up on keyboard focus.
    */
  const GlobalStyles = css`
    .js-focus-visible :focus:not([data-focus-visible-added]) {
      outline: none;
      box-shadow: none;
    }
  `;

  return (
    <>
      <Global styles={GlobalStyles} />
      <Chakra.Flex minH="100vh" flexDirection="column">
        <Header />
        <Transition
          preset="fadeBetween"
          shouldChange={location.pathname}
          centerContent={false}
        >
          {children}
        </Transition>
        <Footer />
      </Chakra.Flex>
    </>
  );
};

export default Layout;
