import Play from "@assets/svg/play.svg";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable } from "react-native";

export default function AudioPlayer({ uri }: { uri: string }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().then();
      }
    };
  }, [sound]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: encodeURI(uri),
      });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  return (
    <Pressable
      style={{ marginBottom: 8 }}
      onPress={playSound}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        <Play width={96} height={96} />
      </Animated.View>
    </Pressable>
  );
}
