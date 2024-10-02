import { useRef, forwardRef } from "react";
import { Animated, Pressable, StyleProp, Text, ViewStyle } from "react-native";

import { styles } from "./Button.styles";

type Props = {
  title: string;
  onPress?: any;
  style?: StyleProp<ViewStyle>;
  className?: string;
  disabled?: boolean;
  opacity?: boolean;
};

export const Button = forwardRef((props: Props, ref) => {
  const animated = useRef(new Animated.Value(1)).current;
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
  const {
    style,
    onPress,
    title,
    className,
    disabled = false,
    opacity = false,
    ...otherProps
  } = props;
  return (
    <Pressable
      style={[
        styles.button,
        style,
        disabled ? { backgroundColor: "gray" } : {},
        opacity ? { opacity: 0.5 } : {},
      ]}
      onPress={onPress}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      className={className}
      disabled={disabled}
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
