import React from "react";
import * as Chakra from "@chakra-ui/react";
import { PageProps } from "gatsby";
import { Seo } from "../components/seo";

const Index = ({ location }: PageProps): React.ReactElement => (
  <Chakra.Box width="100%">
    <Seo title="Audal Labs Boilerplate" location={location} />
    <Chakra.Box>Blank Page</Chakra.Box>
  </Chakra.Box>
);

export default Index;
