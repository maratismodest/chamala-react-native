import * as React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const FancyButton = React.forwardRef((props: any, ref) => {
  const { style, onPress, title, ...otherProps } = props;
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} {...otherProps}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
});
export default FancyButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 32,
    elevation: 3,
    backgroundColor: "rgb(15, 128, 18)",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
