import { GlobalState } from "react-gstate";
import React from "react";
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";
import * as Chakra from "@chakra-ui/react";

export interface AnimationState {
  pageHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  renderedOnce: boolean;
  isChanging: boolean;
}

class AnimationStateStore extends GlobalState<AnimationState> {
  getViewportWidth = () => {
    if (typeof window !== "undefined") {
      return Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
    }
    return 0;
  };

  getViewportHeight = () => {
    if (typeof window !== "undefined") {
      return Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
    }
    return 0;
  };

  getPageHeight = () => {
    if (typeof window !== "undefined") {
      return document.body.clientHeight;
    }
    return 0;
  };

  currentPageAsScrollRef = { current: 0 };
  isChangingRef = { current: false };
  isDesktopAsStateRef = { current: true };

  setIsChangingRef = (data) => {
    this.isChangingRef.current = data;
    this.setState({ isChanging: data });
  };

  syntheticScrollTo = (offset, callback) => {
    const fixedOffset = offset.toFixed();
    const onScroll = function () {
      if (window.pageYOffset.toFixed() === fixedOffset) {
        window.removeEventListener("scroll", onScroll);
        callback();
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };

  initialRun = () => {
    if (typeof window !== "undefined") {
      window.onresize = this.doResize;
      this.setState({
        renderedOnce: true,
        viewportWidth: this.getViewportWidth(),
        viewportHeight: this.getViewportHeight(),
        pageHeight: this.getPageHeight(),
      });
    }
  };

  doResize = () => {
    this.initialRun();
  };

  getPositionOfElement = (ref) => {
    if (ref.current) {
      const {
        top,
        right,
        bottom,
        left,
        width,
        height,
        x,
        y,
      } = ref.current.getBoundingClientRect();

      let pageTop = window.pageYOffset + top;
      let pageBottom = pageTop + height;
      return {
        top,
        right,
        bottom,
        left,
        width,
        height,
        x,
        y,
        pageTop,
        pageBottom,
      };
    }
  };
}

export const AnimationState = new AnimationStateStore({
  viewportWidth: 1920,
  viewportHeight: 1080,
  pageHeight: 1080,
  renderedOnce: false,
  isChanging: false,
});

export const useScrollTrigger = (depth = 1) => {
  const containerRef = React.useRef();
  const childRef = React.useRef();

  const { scrollY } = useViewportScroll();

  let [pageTop, setPageTop] = React.useState(0);
  let [pageBottom, setPageBottom] = React.useState(0);
  let [childWidth, setChildWidth] = React.useState(0);
  let [childHeight, setChildHeight] = React.useState(0);
  let [positionStyle, setPositionStyle] = React.useState("relative");

  useAnimatableLayoutEffect(() => {
    if (containerRef?.current && childRef?.current) {
      let childPos = AnimationState.getPositionOfElement(childRef);
      let containerPos = AnimationState.getPositionOfElement(containerRef);

      if (containerPos.height === 0) {
        containerPos.pageBottom =
          containerPos.pageTop + childPos.height * depth;
        containerPos.height = childPos.height * depth;
      }

      let pageTopCalc = containerPos.pageTop;
      let pageBottomCalc = containerPos.pageBottom - viewportHeight;

      if (childPos.height > AnimationState.getViewportHeight()) {
        let vhP = AnimationState.getViewportHeight() * 0.3;
        pageTopCalc = containerPos.pageTop - vhP;
        pageBottomCalc = containerPos.pageTop - vhP + childPos.height;
      }

      setPageTop(pageTopCalc);
      setPageBottom(pageBottomCalc);

      setChildWidth(childPos.width);
      setChildHeight(childPos.height);

      let pS =
        childPos.height < AnimationState.getViewportHeight()
          ? "sticky"
          : "relative";
      setPositionStyle(pS);
    }
  }, [childRef]);

  const transform = useTransform(scrollY, [pageTop, pageBottom], [0, 100]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const progress = useSpring(transform, physics);

  let viewportHeight = AnimationState.getViewportHeight();

  return {
    containerRef,
    childRef,
    progress,
    childWidth,
    childHeight,
    containerStyles: {
      style: {
        height:
          childHeight < AnimationState.getViewportHeight()
            ? `${childHeight * depth}px`
            : "auto",
      },
    },
    childStyles: {
      style: {
        position: positionStyle,
        top:
          childHeight > viewportHeight
            ? "30%"
            : `${viewportHeight / 2 - childHeight / 2}px`,
      },
    },
  };
};

export const Parallax = ({ x, y, children }) => {
  let brk = Chakra.useBreakpoint("base");
  let isUnderDesktop = brk === "base" || x === "sm" || x === "md";

  const containerRef = React.useRef();

  let [pageTop, setPageTop] = React.useState(0);
  let [pageBottom, setPageBottom] = React.useState(0);

  const doCalc = () => {
    if (containerRef?.current) {
      let containerPos = AnimationState.getPositionOfElement(containerRef);
      setPageTop(containerPos.pageTop);
      setPageBottom(containerPos.pageBottom);
    }
  };

  const { scrollY } = useViewportScroll();

  const transform = useTransform(
    scrollY,
    [Math.max(pageTop - AnimationState.getViewportHeight(), 0), pageBottom],
    [y[0], y[1]]
  );
  const physics = { damping: 30, mass: 0.05, stiffness: 200 }; // easing of smooth scroll
  const progress = useSpring(transform, physics);

  useAnimatableLayoutEffect(() => {
    doCalc();
  }, [containerRef, pageTop, pageBottom]);

  return (
    <div ref={containerRef}>
      <Chakra.Box
        as={motion.div}
        style={{ y: progress }}
        transform={isUnderDesktop ? "none!important" : "auto"}
      >
        {children}
      </Chakra.Box>
    </div>
  );
};

export const useAnimatableLayoutEffect = (effect, deps = []) => {
  const [windowWidth, windowHeight] = useWindowSize();

  React.useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      effect();

      // It's crazy that setInterval is cheaper than Intersection Observer. Oh well.
      let timer = setInterval(() => {
        effect();
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [...deps, windowWidth, windowHeight]);
};
