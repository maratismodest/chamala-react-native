import {Audio} from 'expo-av';
import * as React from 'react';
import {Button, View} from 'react-native';

export default function App({word}: { word: string }) {
  const [sound, setSound] = React.useState<any>();

  async function playSound() {
    console.log('Loading Sound');
    const {sound} = await Audio.Sound.createAsync({uri: 'https://file-examples.com/storage/fe165662b6657a0549b59ee/2017/11/file_example_MP3_700KB.mp3'});
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button title="Play Sound" onPress={playSound}/>
    </View>
  );
}
