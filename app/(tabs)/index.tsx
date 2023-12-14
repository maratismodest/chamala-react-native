import { Text, View } from "@components/Themed";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

import { appStyles } from "../../styles";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("@assets/svg/welcome.svg")} />
      <Text style={styles.title}>Chamala</Text>
      <Text style={styles.description}>
        Изучение татарского языка в формате мини-игр
      </Text>
      <Link href="/two" asChild>
        <Pressable>
          <Text style={[appStyles.button]}>Начать игру</Text>
        </Pressable>
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
