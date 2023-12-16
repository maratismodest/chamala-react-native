import Welcome from "@assets/svg/welcome.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appStyles } from "@styles";
import { Link } from "expo-router";
import { Alert, StyleSheet } from "react-native";

const storeData = async (value: any) => {
  try {
    await AsyncStorage.setItem("my-key", value);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("my-key");
    if (value !== null) {
      // value previously stored
      Alert.alert(value);
    }
  } catch (e) {
    // error reading value
  }
};

export default function TabOneScreen() {
  return (
    <View style={appStyles.container}>
      <Welcome />
      <Text style={styles.title}>Chamala</Text>
      <Text style={styles.description}>
        Изучение татарского языка в формате мини-игр
      </Text>
      <Link href="/two" asChild>
        <Button title="Начать игру" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 40,
  },
  description: {
    fontSize: 28,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
