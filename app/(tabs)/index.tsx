import Welcome from "@assets/svg/welcome.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { appStyles } from "@styles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, {useContext} from "react";
import {LocaleContext} from "../../providers/LocaleProvider";

export default function MainPage() {
  const {setLocale,i18n} = useContext(LocaleContext)
  return (
    <View style={appStyles.container}>

      <Welcome />
      <StatusBar style="auto" />
      <Text style={[appStyles.h1, { textAlign: "center" }]}>
        {i18n.t("welcomeTitle")}
      </Text>
      <Link href="/pick" asChild>
        <Button title={i18n.t("start")} />
      </Link>
    </View>
  );
}
