import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Chakra from '@chakra-ui/react';

/*

	This component creates a page transition based on the browser location changing.

 */

const PageTransition: React.FC = (props) => {


  let locationParams = ['', ''];

  if (typeof window !== "undefined") {
    locationParams = window.location.pathname.split('/');
  }

  const duration = 0.4;
  const variants = {
    initial: {
      opacity: 0,
      transition: { duration },
      position: 'absolute',
      width: '100%',
      overflowY: 'hidden',
    },
    enter: {
      opacity: 1,
      transition: {
        duration,
        delay: duration,
        when: 'beforeChildren'
      },
      overflowY: 'initial',
      position: 'relative',
    },
    exit: {
      opacity: 0,
      transition: { duration },
      position: 'absolute',
      width: '100%',
      overflowY: 'hidden',
    }
  };


  // @ts-ignore
  return (
    <AnimatePresence>
      {/*// @ts-ignore */}
      <Chakra.Flex flexGrow={1} height="100%" as={motion.main} key={locationParams[0] + locationParams[1]} variants={variants} initial="initial" animate="enter" exit="exit" {...props} />
    </AnimatePresence>
  );
};

export default PageTransition;
