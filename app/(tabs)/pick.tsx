import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { appStyles } from "@styles";
import { Link } from "expo-router";
import React from "react";

const buttons = [
  {
    id: 1,
    title: "Слово",
    href: "/word",
    isDisabled: false,
  },
  {
    id: 2,
    title: "Фраза",
    href: "/phrase",
    isDisabled: true,
  },
  {
    id: 3,
    title: "Собери",
    href: "/collect",
    isDisabled: true,
  },
] as const;

export default function TabTwoScreen() {
  return (
    <View style={appStyles.container}>
      <Text style={appStyles.h1}>Выбери игру</Text>
      <View style={{ gap: 16, marginTop: 16 }}>
        {buttons.map(({ id, href, title, isDisabled }) => (
          <Link key={id} href={href} asChild>
            <Button title={title} />
          </Link>
        ))}
      </View>
    </View>
  );
}
