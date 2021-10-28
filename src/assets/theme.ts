import { extendTheme } from "@chakra-ui/react";

const FontFamily: string = "PT Sans";

const customTheme: object = extendTheme({
  fonts: {
    body: FontFamily,
    heading: FontFamily,
    mono: FontFamily,
  },
  styles: {
    global: {
      body: {
        color: "#2c3e50",
      },
    },
  },
  colors: {
    primary: {
      50: "#ffeae9",
      100: "#efc5c2",
      200: "#e29f9b",
      300: "#d77974",
      400: "#cc534b",
      500: "#b33b32",
      600: "#8b2d27",
      700: "#64201c",
      800: "#3d1210",
      900: "#190402",
    },
    secondary: {
      50: "#fff3db",
      100: "#ffdeaf",
      200: "#ffc87f",
      300: "#ffb24d",
      400: "#ff9c1d",
      500: "#e68204",
      600: "#b36500",
      700: "#804800",
      800: "#4e2a00",
      900: "#1f0c00",
    },
    accent: {
      50: "#dff7ff",
      100: "#bce3f4",
      200: "#95cee8",
      300: "#6ebbdd",
      400: "#49a8d3",
      500: "#308eb9",
      600: "#226e91",
      700: "#144f69",
      800: "#033041",
      900: "#00121b",
    },
    success: {
      50: "#e0fded",
      100: "#bcf2d3",
      200: "#94e9b8",
      300: "#6bde9c",
      400: "#44d581",
      500: "#2abb68",
      600: "#1e9250",
      700: "#116839",
      800: "#053f21",
      900: "#001706",
    },
    error: {
      50: "#ffe6e3",
      100: "#fcbeb9",
      200: "#f3968c",
      300: "#ec6c5f",
      400: "#e64333",
      500: "#cc2a19",
      600: "#a02013",
      700: "#73150c",
      800: "#470a04",
      900: "#1f0100",
    },
  },
});

export default customTheme;
