import Welcome from "@assets/svg/welcome.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { appStyles } from "@styles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function TabOneScreen() {
  return (
    <View style={appStyles.container}>
      <Welcome />
      <StatusBar style="auto" />
      <Text style={[appStyles.h1, { textAlign: "center" }]}>
        Изучение татарского языка в формате мини-игр
      </Text>
      <Link href="/pick" asChild>
        <Button title="Начать" />
      </Link>
    </View>
  );
}
