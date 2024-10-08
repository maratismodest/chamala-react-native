import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import Welcome from "@/assets/svg/welcome.svg";
import { Text, View } from "@/components/Themed";
import { Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { appStyles } from "@/styles";

export default function MainPage() {
  const { i18n } = useTranslations();
  return (
    <View style={appStyles.container}>
      <Welcome />
      <StatusBar style="auto" />
      <Text style={[appStyles.h1]} className="text-center">
        {i18n.t("welcomeTitle")}
      </Text>
      <Link href="/pick" asChild>
        <Button title={i18n.t("start")} className="px-16" />
      </Link>
    </View>
  );
}
