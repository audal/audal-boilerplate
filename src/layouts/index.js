import React from 'react'
import * as Chakra from '@chakra-ui/react'
import PageTransition from "../components/page-transition";

export default function ({ children }) {


  return (
    <>
      <Chakra.Flex minH="100vh" flexDirection="column">
          {/* layout goes here - things like headings etc */}
        <PageTransition>{children}</PageTransition>
      </Chakra.Flex>
    </>
  )
}
