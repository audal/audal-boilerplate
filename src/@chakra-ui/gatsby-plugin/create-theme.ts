import { theme as defaultTheme } from "@chakra-ui/theme";

export const createTheme = (theme) => {
  if (!theme?.styles?.global[":root"]["--background-col"]) {
    if (typeof window !== "undefined") {
      alert(
        "In @chakra-ui/gatsby-plugin/theme.ts - Please Set the :root Background Color to the Organisation's main Background Color"
      );
    }
    throw new Error(
      "In @chakra-ui/gatsby-plugin/theme.ts - Please Set the :root Background Color to the Organisation's main Background Color"
    );
  }

  if (!theme?.styles?.global[":root"]["--text-col"]) {
    if (typeof window !== "undefined") {
      alert(
        "In @chakra-ui/gatsby-plugin/theme.ts - Please Set the :root Color to the Organisation's main Text Color"
      );
    }
    throw new Error(
      "In @chakra-ui/gatsby-plugin/theme.ts - Please Set the :root Color to the Organisation's main Text Color"
    );
  }

  if (!theme?.fonts?.heading || !theme?.fonts?.body) {
    if (typeof window !== "undefined") {
      alert(
        "In @chakra-ui/gatsby-plugin/theme.ts - Please Set Fonts for 'heading' and 'body'. Read more about importing custom fonts here - https://guides.audallabs.com/guide/2016-12-17-making-sense-of-the-scaas-new-flavor-wheel/"
      );
    }
    throw new Error(
      "In @chakra-ui/gatsby-plugin/theme.ts - Please Set Fonts for 'heading' and 'body'. Read more about importing custom fonts here - https://guides.audallabs.com/guide/2016-12-17-making-sense-of-the-scaas-new-flavor-wheel/"
    );
  }

  // @ts-ignore
  theme.styles.global = defaultTheme.styles.global(theme.styles.global);

  return theme;
};
