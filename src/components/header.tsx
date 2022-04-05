/** @jsxImportSource @compiled/react */
import React from "react";
import Logo from "../images/icon.png";
import { GatsbyImageSVGFallback } from "./gatsby-image-svg-fallback";
import {Link} from "gatsby";

const Header: React.FC = () => {

  return (
    <Link
        as="header"
        css={{
          position: "sticky",
          zIndex: "10",
          top: 0,
          height: "150px",
          width: "100%",
          transition: "1s ease-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(12px)"
        }}
        to="/"
    >
      <GatsbyImageSVGFallback width="60px" height="60px" css={{marginRight: "40px"}} src={Logo} />
      Audal Boilerplate
    </Link>
  );
};

export default Header;
