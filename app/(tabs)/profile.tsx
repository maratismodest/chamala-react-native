import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";

import Happy from "@/assets/svg/happy.svg";
import Button from "@/components/Button";
import { Text, View } from "@/components/Themed";
import { initialProfile } from "@/pages-lib/profile/utils";
import { LocaleContext } from "@/providers/LocaleProvider";
import { useStore } from "@/store";
import { appStyles } from "@/styles";

export default function ProfilePage() {
  const { setLocale, i18n } = useContext(LocaleContext);
  const { profile, setProfile } = useStore((state) => state);

  const changeLanguage = (locale: "ru" | "en") => {
    AsyncStorage.setItem("locale", locale).then(() => {
      setLocale(locale);
    });
  };

  const handleReset = () => {
    setProfile(initialProfile);
  };

  return (
    <View style={appStyles.container}>
      <View className="mx-auto">
        <Happy width={96} height={96} />
      </View>
      <Text style={appStyles.h1}>{i18n.t("profile")}</Text>
      {profile && (
        <View style={{ maxWidth: 400, width: "100%", paddingHorizontal: 16 }}>
          <Text style={[appStyles.text, { color: "green" }]}>
            {i18n.t("correct")}: {profile.correct}
          </Text>
          <Text style={[appStyles.text, { color: "red" }]}>
            {i18n.t("wrong")}: {profile.wrong}
          </Text>
          <Text style={appStyles.text}>
            {i18n.t("accuracy")}: {(100 * profile.accuracy).toFixed(1)}%
          </Text>
        </View>
      )}
      <Button
        style={{ marginTop: 16, width: "auto" }}
        onPress={handleReset}
        title={i18n.t("reset")}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 16,
        }}
      >
        <Button title="Ru" onPress={() => changeLanguage("ru")} />
        <Button title="En" onPress={() => changeLanguage("en")} />
      </View>
    </View>
  );
}
