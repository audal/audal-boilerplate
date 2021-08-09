import React from "react";
import * as Chakra from "@chakra-ui/react";
import useScrollPosition from "@react-hook/window-scroll";
import Logo from "../images/icon.png";
import { GatsbyImageSVGFallback } from "./gatsby-image-svg-fallback";

const Header: React.FC = () => {
  //const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

  const scrollY = useScrollPosition(20);

  React.useEffect(() => {
    // Optionally do something on body scroll here, like maybe change a header size
  }, [scrollY]);

  return (
    <Chakra.Box
      pos="sticky"
      zIndex="100"
      top="0"
      as="header"
      height="150px"
      width="100%"
      transition="1s ease-out"
      display="flex"
      alignItems="center"
      justifyContent="center"
      css={{ backdropFilter: "blur(12px)" }}
    >
      <GatsbyImageSVGFallback width="60px" height="60px" mr="40px" src={Logo} />
      Audal Boilerplate
    </Chakra.Box>
  );
};

export default Header;
