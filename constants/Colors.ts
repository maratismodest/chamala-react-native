const tintColorLight = "#2f95dc";
const tintColorDark = "#ffffff";
const black = "#000000";
const gray = "#cccccc";

export default {
  light: {
    text: black,
    background: tintColorDark,
    tint: tintColorLight,
    tabIconDefault: gray,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: tintColorDark,
    background: black,
    tint: tintColorDark,
    tabIconDefault: gray,
    tabIconSelected: tintColorDark,
  },
};
