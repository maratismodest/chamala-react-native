import Welcome from "@assets/svg/welcome.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { appStyles } from "@styles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import i18n from "../../i18n";

export default function TabOneScreen() {
  return (
    <View style={appStyles.container}>
      <Welcome />
      <StatusBar style="auto" />
      <Text style={[appStyles.h1, { textAlign: "center" }]}>
        {i18n.t("welcome")}
      </Text>
      <Link href="/pick" asChild>
        <Button title="Начать" />
      </Link>
    </View>
  );
}
