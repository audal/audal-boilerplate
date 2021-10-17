import { theme as defaultTheme } from "@chakra-ui/react";
import * as Button from "./button";
import * as Accordion from "./accordion";
import { createTheme } from "./create-theme";

const theme = {
  breakpoints: defaultTheme.breakpoints,
  radii: defaultTheme.radii,
  borders: defaultTheme.borders,
  fontWeights: defaultTheme.fontWeights,
  transition: defaultTheme.transition,
  direction: defaultTheme.direction,
  config: {
    cssVarPrefix: "audal",
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  zIndices: defaultTheme.zIndices,
  components: {
    ...defaultTheme.components,
    Button: Button,
    Accordion: Accordion,
  },
  styles: {
    global: {
      ":root": {
        "--background-col": "black",
        "--text-col": "white",
      },
      html: {
        backgroundColor: "var(--background-col) !important",
        color: "var(--text-col) !important",
        transition: "color 0.8s, background-color 0.8s !important",
      },
      body: {
        overflowY: "scroll",
        backgroundColor: "var(--background-col) !important",
        color: "var(--text-col) !important",
        transition: "color 0.8s, background-color 0.8s !important",
      },
      ".chakra-link": {
        textDecoration: "none!important",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          height: "1px",
          width: "0",
          bottom: "-1px",
          backgroundColor: "#000",
          transition: "0.3s",
        },
        "&:hover::after": {
          left: "0%",
          width: "100%",
          backgroundColor: "#000",
        },
        "&:hover": {
          opacity: 0.9,
        },
      },
    },
  },
  colors: {
    transparent: "transparent",
    current: "currentColor",
    blackAlpha: defaultTheme.colors.blackAlpha,
    whiteAlpha: defaultTheme.colors.whiteAlpha,
    black: "#000",
    white: "#fff",
  },
  shadows: { ...defaultTheme.shadows, outline: "0 !important" },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
};

export default createTheme(theme);
