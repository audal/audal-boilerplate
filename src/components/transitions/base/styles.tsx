import { Box } from "@chakra-ui/react";
import React from "react";

const createAnimationStyles = ({
  keyframes,
  delay,
  duration,
  timing,
  fill,
  origin,
  onTop,
}) => {
  return {
    animationName: keyframes,
    animationDelay: delay,
    animationDuration: `${duration}ms`,
    animationTimingFunction: timing,
    animationFillMode: fill,
    transformOrigin: `${origin || "50% 50%"}`,
    zIndex: onTop ? 1 : undefined,
  };
};

const stateMap = {
  entering: ({ enterAnimation }) => createAnimationStyles(enterAnimation),
  exiting: ({ exitAnimation }) => createAnimationStyles(exitAnimation),
};

export const PageTransitionGroup = (props) => (
  <Box
    css={{
      position: "relative",
      width: "100%",
      height: "100%",
      perspective: "1200px",
      overflow: "hidden",
    }}
    {...props}
  />
);

export const PageTransitionWrapper = ({
  state,
  enterAnimation,
  exitAnimation,
  ...props
}) => {
  return (
    <Box
      css={{
        backfaceVisibility: "hidden",
        height: "100%",
        left: "0",
        /*overflow: "hidden",
                position: "absolute",*/
        top: "0",
        transformStyle: "preserve-3d",
        transform: "translate3d(0, 0, 0)",
        width: "100%",
        willChange: "transform",
        ...(stateMap[state] &&
          stateMap[state]({ enterAnimation, exitAnimation })),
      }}
      {...props}
    />
  );
};
