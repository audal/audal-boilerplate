import React from "react";
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";
import * as Chakra from "@chakra-ui/react";

export const getViewportWidth = () => {
  if (typeof window !== "undefined") {
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
  }
  return 0;
};

export const getViewportHeight = () => {
  if (typeof window !== "undefined") {
    return Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
  }
  return 0;
};

export const getPageHeight = () => {
  if (typeof window !== "undefined") {
    return document.body.clientHeight;
  }
  return 0;
};

export const syntheticScrollTo = (offset, callback) => {
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

export const getPositionOfElement = (ref) => {
  if (ref.current) {
    const { top, right, bottom, left, width, height, x, y } =
      ref.current.getBoundingClientRect();

    const pageTop = window.pageYOffset + top;
    const pageBottom = pageTop + height;
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

export const useScrollTrigger = (depth = 1) => {
  const containerRef = React.useRef();
  const childRef = React.useRef();

  const { scrollY } = useViewportScroll();

  const [pageTop, setPageTop] = React.useState(0);
  const [pageBottom, setPageBottom] = React.useState(0);
  const [childWidth, setChildWidth] = React.useState(0);
  const [childHeight, setChildHeight] = React.useState(0);
  const [positionStyle, setPositionStyle] = React.useState("relative");

  useAnimatableLayoutEffect(() => {
    if (containerRef?.current && childRef?.current) {
      const childPos = getPositionOfElement(childRef);
      const containerPos = getPositionOfElement(containerRef);

      if (containerPos.height === 0) {
        containerPos.pageBottom =
          containerPos.pageTop + childPos.height * depth;
        containerPos.height = childPos.height * depth;
      }

      let pageTopCalc =
        containerPos.pageTop -
        childPos.height * depth +
        getViewportHeight() * 0.5;
      let pageBottomCalc =
        containerPos.pageBottom - getViewportHeight() + childPos.height * depth;

      if (childPos.height > getViewportHeight()) {
        const vhP = getViewportHeight() * 0.3;
        pageTopCalc = containerPos.pageTop - vhP;
        pageBottomCalc = containerPos.pageTop - vhP + childPos.height;
      }

      setPageTop(pageTopCalc);
      setPageBottom(pageBottomCalc);

      setChildWidth(childPos.width);
      setChildHeight(childPos.height);

      const pS = childPos.height < getViewportHeight() ? "sticky" : "relative";
      setPositionStyle(pS);
    }
  }, []);

  const transform = useTransform(scrollY, [pageTop, pageBottom], [0, 100]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const progressSpring = useSpring(transform, physics);
  const progress = useTransform(progressSpring, [0, 100], ["0%", "-100%"]);

  const viewportHeight = getViewportHeight();

  return {
    containerRef,
    childRef,
    progress,
    rawProgress: progressSpring,
    childWidth,
    childHeight,
    containerStyles: {
      style: {
        height:
          childHeight < getViewportHeight()
            ? `${childHeight * depth}px`
            : "auto",
      },
    },
    childStyles: {
      style: {
        position: positionStyle,
        top: childHeight > viewportHeight ? "30%" : `50vh`,
        transform: childHeight > viewportHeight ? "none" : "translateY(-50%)",
      },
    },
  };
};

interface ParallaxProps extends Chakra.BoxProps {
  x?: number[];
  y?: number[];
}

export const Parallax = ({
  x = [0, 0],
  y = [0, 0],
  children,
  ...props
}: ParallaxProps) => {
  const containerRef = React.useRef();

  const [pageTop, setPageTop] = React.useState(0);
  const [pageBottom, setPageBottom] = React.useState(0);

  const doCalc = () => {
    if (containerRef?.current) {
      const containerPos = getPositionOfElement(containerRef);
      setPageTop(containerPos.pageTop);
      setPageBottom(containerPos.pageBottom);
    }
  };

  const { scrollY } = useViewportScroll();

  const transform = useTransform(
    scrollY,
    [Math.max(pageTop - getViewportHeight(), 0), pageBottom],
    [y[0], y[1]]
  );

  const transformX = useTransform(
    scrollY,
    [Math.max(pageTop - getViewportHeight(), 0), pageBottom],
    [x[0], x[1]]
  );

  const physics = { damping: 30, mass: 0.05, stiffness: 200 }; // easing of smooth scroll
  const progress = useSSRSpring(transform, physics, y[0]);
  const progressX = useSSRSpring(transformX, physics, x[0]);

  useAnimatableLayoutEffect(() => {
    doCalc();
  }, [containerRef, pageTop, pageBottom]);

  return (
    <Chakra.Box ref={containerRef} {...props}>
      <Chakra.Box
        as={motion.div}
        style={{ x: progressX, y: progress }}
        css={{
          transform: `translateY(${y[0]}px) translateX(${x[0]}px)`,
          "@media (max-width: 62em)": {
            transform: "none!important",
            opacity: "1!important",
          },
        }}
        opacity={{ base: "" }}
      >
        {children}
      </Chakra.Box>
    </Chakra.Box>
  );
};

export const useAnimatableLayoutEffect = (effect, deps = []) => {
  const [windowWidth, windowHeight] = useWindowSize();

  React.useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      effect();

      const timer = setTimeout(() => {
        effect();
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [...deps, windowWidth, windowHeight]);
};

const useSSRSpring = (transform, physics, initialValue) => {
  const [hasRenderedOnce, setHasRenderedOnce] = React.useState(false);
  const progress = useSpring(transform, physics);

  React.useEffect(() => {
    setTimeout(() => {
      setHasRenderedOnce(true);
    }, 500);
  }, []);

  if (!hasRenderedOnce) {
    // @ts-ignore
    progress.current = progress.prev = initialValue;
    progress.set(initialValue);
  }

  return progress;
};
