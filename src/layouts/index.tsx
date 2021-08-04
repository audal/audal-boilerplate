import React from "react";
import * as Chakra from "@chakra-ui/react";
import { PageProps } from "gatsby";
import PageTransition from "../components/transitions/page-transition";
import Header from "../components/header";
import Footer from "../components/footer";
import "keen-slider/keen-slider.min.css";

const Layout: React.FC<PageProps> = ({ children, location }) => {

    global.baseUrl = "/.netlify/functions/base";

    return (
        <>
            <Chakra.Flex minH="100vh" flexDirection="column">
                <Header />
                <PageTransition location={location}>{children}</PageTransition>
                <Footer />
            </Chakra.Flex>
        </>
    );
};

export default Layout;
