import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const buttons = [
  {
    id: 1,
    title: "Слово",
    href: "/three",
    isDisabled: false,
  },
  // {
  //   id: 2,
  //   title: "Фраза",
  //   href: "/phrases",
  //   isDisabled: true,
  // },
] as const;

export default function TabTwoScreen() {
  return (
    <View
      style={styles.container}
      // className="flex-1 justify-center items-center gap-4"
    >
      <Text className="font-bold text-2xl">Выбери игру</Text>
      <View className="grid grid-cols-1 gap-4">
        {buttons.map(({ id, href, title, isDisabled }) => (
          <Link key={id} href={href as any} asChild>
            <Button title={title} />
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    marginBottom: 8,
  },
});
