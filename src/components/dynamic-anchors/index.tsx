import React, { useEffect } from "react";
import * as Chakra from "@chakra-ui/react";
import { Link } from "gatsby";
import { useLocation, navigate } from "@reach/router";
import { useInView } from "react-intersection-observer";
import mergeRefs from "react-merge-refs";

/*
 *
 * This set of components creates scrollable sections, for single-page scroller sites, and works with SSR
 *
 *  */

export default function ScrollableSection({ href, meta, ...props }) {
  let location = useLocation();
  let ref = React.useRef();
  let [inViewRef, inView] = useInView({
    threshold: 0.2,
    initialInView: false,
    triggerOnce: false,
  });
  const parsedName = href.replace(/^\//, "") || null;
  const parsedLocation = location.pathname.replace(/^\//, "") || null;

  useEffect(() => {
    if (!inView) {
      if (parsedName === parsedLocation) {
        // @ts-ignore
        let dims = ref?.current.getBoundingClientRect();
        if (dims) {
          window.scrollTo(window.scrollX, dims.top - 100);
        }
      }
    }
  }, [location]);

  useEffect(() => {
    if (inView && parsedLocation !== parsedName) {
      if (meta?.title) {
        document.title = meta.title;
      }
      window.history.pushState({}, meta?.title ? meta.title : "", parsedName);
    }
  }, [inView]);

  return <div ref={mergeRefs([inViewRef, ref])} {...props} />;
}

export const ScrollableLink = ({ href, onClick, ...props }) => {
  const handleClick = () => {
    const parsedName = href.replace(/^\//, "") || null;
    navigate(parsedName);

    if (onClick && typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <Chakra.Link
      _hover={{ textDecoration: "none" }}
      style={{ boxShadow: "none" }}
      as={Link}
      to={href}
      onClick={handleClick}
      {...props}
    />
  );
};
