import {StyleSheet} from 'react-native';
import GuessModule from "@components/GuessModule";
import {View} from '@components/Themed';
import {useStore} from "../../store";

export default function TabTwoScreen() {
  const words = useStore(state => state.words)
  return (
    <View style={styles.container}>
      <GuessModule collection={words} option="words"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
