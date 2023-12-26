import Happy from "@assets/svg/happy.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { LocaleContext } from "@providers/LocaleProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import {
  deleteAsyncData,
  getAsyncData,
  storeAsyncData,
} from "@store/async-storage";
import { appStyles } from "@styles";
import React, { useContext, useEffect, useState } from "react";
import { initialProfile, Profile } from "@pages-lib/profile/utils";

export default function ProfilePage() {
  const isFocused = useIsFocused();
  const { setLocale, i18n } = useContext(LocaleContext);
  const [profile, setProfile] = useState<Profile | undefined>();

  const getInitialData = () => {
    getAsyncData("statistics").then((res) => {
      if (!res) {
        storeAsyncData("statistics", initialProfile).then(() =>
          setProfile(initialProfile),
        );
      } else {
        setProfile(JSON.parse(res));
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      getInitialData();
    }
  }, [isFocused]);

  const changeLanguage = (locale: "ru" | "en") => {
    AsyncStorage.setItem("locale", locale).then(() => {
      setLocale(locale);
    });
  };

  return (
    <View style={appStyles.container}>
      <View className="mx-auto">
        <Happy width={96} height={96} />
      </View>
      <Text style={appStyles.h1}>{i18n.t("profile")}</Text>
      {profile && (
        <View style={{ maxWidth: 300, width: "100%" }}>
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
        // onPress={() => signOut({ callbackUrl: "/" })}
        onPress={() => {
          deleteAsyncData("statistics").then(() =>
            storeAsyncData("statistics", initialProfile).then(() =>
              setProfile(initialProfile),
            ),
          );
        }}
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
