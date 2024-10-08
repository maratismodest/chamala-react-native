import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";

import Happy from "@/assets/svg/happy.svg";
import { Text, View } from "@/components/Themed";
import { Button } from "@/components/ui";
import { LocaleContext } from "@/providers/LocaleProvider";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import { Language } from "@/types";

export default function ProfilePage() {
  const { setLocale, i18n } = useContext(LocaleContext);
  const { profile, resetProfile } = useStore();

  const changeLanguage = (locale: Language) => {
    AsyncStorage.setItem("locale", locale).then(() => {
      setLocale(locale);
    });
  };

  const { correct, accuracy, wrong } = profile;

  return (
    <View style={appStyles.container}>
      <View className="mx-auto">
        <Happy width={96} height={96} />
      </View>
      <Text style={appStyles.h1}>{i18n.t("profile")}</Text>
      <View className="px-4 w-full max-w-[400px]">
        <Text style={[appStyles.text]} className="text-green-500">
          {i18n.t("correct")}: {correct}
        </Text>
        <Text style={[appStyles.text]} className="text-red-500">
          {i18n.t("wrong")}: {wrong}
        </Text>
        <Text style={appStyles.text}>
          {i18n.t("accuracy", { percent: (100 * accuracy).toFixed(1) })}
        </Text>
      </View>
      <Button
        className="mt-4 w-auto !my-global-class"
        onPress={resetProfile}
        title={i18n.t("reset")}
      />
      <View className="flex flex-row justify-between gap-4 mt-4">
        <Button title="Ru" onPress={() => changeLanguage("ru")} />
        <Button title="En" onPress={() => changeLanguage("en")} />
      </View>
    </View>
  );
}
