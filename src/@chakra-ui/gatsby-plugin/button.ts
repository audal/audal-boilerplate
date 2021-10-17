import { darken } from "@chakra-ui/theme-tools";
import type {} from "@chakra-ui/theme-tools";

const baseStyle = {
  borderRadius: "none",
  height: "auto",
  fontWeight: "400",
  transition: "0.3s",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
};

const variantSolid = (props) => {
  const { theme, size, ...filteredProps } = props;

  const hasHover = !!props._hover;

  if (hasHover) {
    return {
      _hover: props._hover,
      _active: filteredProps,
      _focus: props._hover,
      _disabled: {
        opacity: 0.7,
      },
    };
  }

  props._hover = {
    backgroundColor: darken(
      props.backgroundColor || props.bgColor || props.background || props.bg,
      40
    ),
    color: darken(props.color, 40),
  };

  return {
    _hover: props._hover,
    _active: filteredProps,
    _focus: props._hover,
    _disabled: {
      opacity: 0.7,
    },
  };
};

const variantUnstyled = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0,
};

const variants = {
  solid: variantSolid,
  unstyled: variantUnstyled,
};

const sizes = {
  lg: {
    height: "auto",
  },
  md: {
    height: "auto",
  },
  sm: {
    height: "auto",
  },
  xs: {
    height: "auto",
  },
};

const defaultProps = {
  variant: "solid",
  size: "md",
};

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};
