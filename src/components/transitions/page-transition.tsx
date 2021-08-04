import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Chakra from "@chakra-ui/react";

/*
	This component creates a page transition based on the browser location changing.
 */

interface Props extends Chakra.FlexProps {
  location: any;
}

const PageTransition: React.FC<Props> = ({ location, ...props }) => {
  const [isNodeRender, setIsNodeRender] = React.useState(false);
  const [isFirstHydratedRender, setIsFirstHydratedRender] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsNodeRender(false);
      setIsFirstHydratedRender(true);
    } else {
      setIsNodeRender(true);
    }
  }, []);

  const duration = 0.4;
  const variants = {
    initial: {
      opacity: !isNodeRender && isFirstHydratedRender ? 0 : 1,
      transition: { duration },
      position: "relative",
      width: "100%",
      overflowY: "hidden",
    },
    enter: {
      opacity: 1,
      transition: {
        duration,
        delay: duration,
        when: "beforeChildren",
      },
      overflowY: "initial",
      position: "relative",
    },
    exit: {
      opacity: 0,
      transition: { duration },
      position: "relative",
      width: "100%",
      overflowY: "hidden",
    },
  };

  const windowDef = typeof window !== "undefined";

  return (
      <AnimatePresence>
        <Chakra.Flex
            flexGrow={1}
            height="100%"
            as={motion.main}
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit={windowDef && "exit"}
            {...props}
        />
      </AnimatePresence>
  );
};

export default PageTransition;
