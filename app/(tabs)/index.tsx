import Welcome from "@assets/svg/welcome.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { appStyles } from "@styles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Alert, StyleSheet, Image } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={appStyles.container}>
      <Welcome />
      <StatusBar style="auto" />
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
