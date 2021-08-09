import React from "react";
import * as Chakra from "@chakra-ui/react";

/*
	This component creates opacity transition based on the shouldChange prop changing.
 */

interface Props extends Chakra.FlexProps {
  shouldChange: string;
}

const FadeTransition: React.FC<Props> = ({ shouldChange, children }) => {
  const prevChildren = React.useRef<React.ReactNode>();
  const currentChildren = React.useRef<React.ReactNode>();
  const currentContainer = React.useRef<HTMLDivElement>();

  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);

  const currentKey = React.useRef<string>(null);

  if (
    currentKey?.current !== null &&
    currentKey.current !== shouldChange &&
    currentChildren?.current &&
    currentChildren.current !== children
  ) {
    currentKey.current = shouldChange;
    prevChildren.current = currentChildren.current;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  } else {
    currentChildren.current = children;
    currentKey.current = shouldChange;
  }

  return (
    <Chakra.Flex width="100%" height="100%" flexGrow={1} position="relative">
      <Chakra.Flex
        width="100%"
        height="100%"
        ref={currentContainer}
        transition="0.2s"
        opacity={isAnimating ? 0 : 1}
        flexGrow={1}
      >
        {isAnimating ? prevChildren.current : children}
      </Chakra.Flex>
    </Chakra.Flex>
  );
};

export default FadeTransition;
