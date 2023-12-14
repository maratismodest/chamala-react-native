import Welcome from "@assets/svg/welcome.svg";
import { Text, View } from "@components/Themed";
import { appStyles } from "@styles";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function TabOneScreen() {
  return (
    <View
      // style={styles.container}
      className="flex-1 justify-center items-center gap-2 p-2"
    >
      <Welcome />
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
