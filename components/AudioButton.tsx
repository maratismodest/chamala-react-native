import { Audio } from "expo-av";
import * as React from "react";
import { Button, View } from "react-native";

export default function AudioButton({ uri }: { uri: string }) {
  const [sound, setSound] = React.useState<any>();

  async function playSound() {
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
    <View>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}
