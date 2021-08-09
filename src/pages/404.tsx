import React from "react";
import * as Chakra from "@chakra-ui/react";
import { PageProps } from "gatsby";
import { Seo } from "../components/seo";

const NotFoundPage = ({ location }: PageProps): React.ReactElement => (
  <Chakra.Box width="100%">
    <Seo title="404 - Audal Labs Boilerplate" location={location} />
    <Chakra.Box>Page Not Found</Chakra.Box>
  </Chakra.Box>
);

export default NotFoundPage;
