import Play from "@assets/svg/play.svg";
import { Audio, InterruptionModeIOS } from "expo-av";
import * as React from "react";
import { useRef } from "react";
import { Animated, Pressable } from "react-native";

export default function AudioButton({ uri }: { uri: string }) {
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
  const [sound, setSound] = React.useState<any>();

  async function playSound() {
    await Audio.setAudioModeAsync({
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      allowsRecordingIOS: false,
    });
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri,
    });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
