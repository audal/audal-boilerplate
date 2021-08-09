import React from "react";
import * as Chakra from "@chakra-ui/react";
import { PageProps } from "gatsby";
import FadeTransition from "../components/transitions/fade-transition";
import Header from "../components/header";
import Footer from "../components/footer";
import "keen-slider/keen-slider.min.css";

const Layout = ({ children, location }: PageProps): React.ReactElement => {
  global.baseUrl = "/.netlify/functions/base";

  return (
    <>
      <Chakra.Flex minH="100vh" flexDirection="column">
        <Header />
        <FadeTransition shouldChange={location.pathname}>
          {children}
        </FadeTransition>
        <Footer />
      </Chakra.Flex>
    </>
  );
};

export default Layout;
