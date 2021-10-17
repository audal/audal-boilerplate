import { accordionAnatomy as parts } from "@chakra-ui/anatomy";

const baseStyleContainer = {};

const baseStyleButton = {
  transitionProperty: "common",
  transitionDuration: "normal",
  fontSize: "1rem",
  _focus: {
    boxShadow: "outline",
  },
  _hover: {},
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  px: 0,
  py: 0,
};

const baseStylePanel = {
  pt: 0,
  px: 0,
  pb: 0,
};

const baseStyleIcon = {
  fontSize: "1.25em",
};

const baseStyle = {
  container: baseStyleContainer,
  button: baseStyleButton,
  panel: baseStylePanel,
  icon: baseStyleIcon,
};

export default {
  parts: parts.keys,
  baseStyle,
};
