import React from "react";
import * as Chakra from "@chakra-ui/react";

const Footer: React.FC = () => (
  <Chakra.Box as="footer">
    <Chakra.Flex bg="black" width="100%">
      <Chakra.Flex
        alignItems="center"
        width="100%"
        justifyContent="center"
        textAlign="center"
        color="white"
        py="20px"
      >
        ©{new Date().getFullYear()}
        <Chakra.Text mx="1" as="strong">
          Audal Labs
        </Chakra.Text>
      </Chakra.Flex>
    </Chakra.Flex>
  </Chakra.Box>
);

export default Footer;
