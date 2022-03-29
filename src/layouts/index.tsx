/** @jsxImportSource @compiled/react */
import React from "react";
import { PageProps } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import "keen-slider/keen-slider.min.css";
import "focus-visible/dist/focus-visible";
import FadeTransition from "../components/transitions/fade-transition";
import "./reset.css"

const Layout = ({ children, location }: PageProps): React.ReactElement => {
  return (
    <>
      <div css={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <Header />
        <FadeTransition shouldChange={location.pathname}>
          {children}
        </FadeTransition>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
