import React, { memo } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { animations, AnimationTypes } from "./base/animations";
import { presets, PresetTypes, PresetSingleType } from "./base/presets";
import { PageTransitionGroup, PageTransitionWrapper } from "./base/styles";
import * as Chakra from "@chakra-ui/react";

interface TransitionProps extends Chakra.BoxProps {
  preset: PresetTypes;
  shouldChange?: string;
  enterAnimation?: AnimationTypes;
  exitAnimation?: AnimationTypes;
  centerContent?: boolean;
}

function PageTransition({
  children,
  enterAnimation: enterAnimationOverride,
  exitAnimation: exitAnimationOverride,
  preset,
  shouldChange,
  centerContent = true,
  ...rest
}: TransitionProps) {
  const selectEnterAnimation = () => {
    if (enterAnimationOverride) {
      return animations[enterAnimationOverride];
    }
    if (preset) {
      return {
        ...animations[presets[preset].enter.name],
        delay: (presets[preset] as PresetSingleType).enter.delay,
        onTop: (presets[preset] as PresetSingleType).enter.onTop,
      };
    }
    return "fadeIn";
  };

  const selectExitAnimation = () => {
    if (exitAnimationOverride) {
      return animations[exitAnimationOverride];
    }
    if (preset) {
      return {
        ...animations[presets[preset].exit.name],
        delay: (presets[preset] as PresetSingleType).exit.delay,
        onTop: (presets[preset] as PresetSingleType).exit.onTop,
      };
    }
    return "fadeOut";
  };

  const enterAnimation = selectEnterAnimation();
  const exitAnimation = selectExitAnimation();
  const timeout = Math.max(enterAnimation.duration, exitAnimation.duration);

  return (
    <Chakra.Flex width="100%" height="100%" flexGrow={1} position="relative">
      <Chakra.Flex width="100%" flexGrow={1}>
        <PageTransitionGroup {...rest}>
          <TransitionGroup component={null}>
            <Transition key={shouldChange} timeout={timeout}>
              {(state) => (
                <PageTransitionWrapper
                  enterAnimation={enterAnimation}
                  exitAnimation={exitAnimation}
                  state={state}
                  alignItems={centerContent ? "center" : undefined}
                  justifyContent={centerContent ? "center" : undefined}
                  display={centerContent ? "flex" : undefined}
                >
                  {children}
                </PageTransitionWrapper>
              )}
            </Transition>
          </TransitionGroup>
        </PageTransitionGroup>
      </Chakra.Flex>
    </Chakra.Flex>
  );
}

export default memo(PageTransition);
