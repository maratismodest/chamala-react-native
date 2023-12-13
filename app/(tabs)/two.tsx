import {Button, StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';

const buttons = [
  {
    id: 1,
    title: "Слово"
  },
  {
    id: 2,
    title: "Фраза"
  },
]

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выбери игру</Text>
      <View style={{display: 'flex', flexDirection: 'column', gap:8}}>
        {
          buttons.map(({id, title}) => <Button key={id} title={title}/>)
        }
      </View>


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
  button: {
    marginBottom: 8
  }
});
