import { useRef } from "react";
import * as React from "react";
import { Text, StyleSheet, Pressable, Animated } from "react-native";

interface Props {
  title: string;
  onPress?: any;
  style?: any;
  className?: string;
}

const FancyButton = React.forwardRef((props: Props, ref) => {
  const animated = useRef(new Animated.Value(1)).current;
  console.log("className");
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const { style, onPress, title, className, ...otherProps } = props;
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      className={className}
      {...otherProps}
    >
      <Animated.View
        style={{
          opacity: animated,
        }}
      >
        <Text style={styles.text} numberOfLines={1}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
});
export default FancyButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
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
