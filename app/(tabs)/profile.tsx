import Happy from "@assets/svg/happy.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { useIsFocused } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Platform } from "react-native";

import {
  deleteAsyncData,
  getAsyncData,
  storeAsyncData,
} from "../../store/async-storage";

interface Profile {
  correct: number;
  wrong: number;
}

const initialProfile: Profile = {
  correct: 0,
  wrong: 0,
};

WebBrowser.maybeCompleteAuthSession();

export default function TabTwoScreen() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState<any>();
  const [message, setMessage] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com",
    expoClientId:
      "608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com",
    iosClientId:
      "608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com",
    webClientId:
      "608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com",
    clientSecret: "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",
  });

  React.useEffect(() => {
    // @ts-ignore
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      // @ts-ignore
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      // @ts-ignore
      return (
        <View>
          <Image source={{ uri: userInfo.picture }} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  const isFocused = useIsFocused();
  const [profile, setProfile] = useState<Profile | undefined>();
  useEffect(() => {
    console.log("called");

    // Call only when screen open or when back on screen
    if (isFocused) {
      getInitialData();
    }
  }, [isFocused]);

  const getInitialData = async () => {
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

  return (
    <View style={styles.container}>
      {showUserInfo()}
      {Platform.OS === "web" && (
        <Button
          title={accessToken ? "Get User Data" : "Login"}
          onPress={
            accessToken
              ? getUserData
              : () => {
                  // @ts-ignore
                  promptAsync({ useProxy: false, showInRecents: true });
                }
          }
        />
      )}
      <View className="mx-auto">
        <Happy width={96} height={96} />
      </View>
      <Text className="text-2xl">Профиль</Text>
      {profile && (
        <View>
          <Text className="flex text-lg">верно: {profile.correct}</Text>
          <Text className="flex text-lg">неверно: {profile.wrong}</Text>
          {profile.correct + profile.wrong > 0 && (
            <Text className="flex text-lg">
              точность:{" "}
              {(
                (Number(profile.correct) /
                  (Number(profile.correct) + Number(profile.wrong))) *
                100
              ).toFixed(1)}{" "}
              %
            </Text>
          )}
          <Button
            className="mt-4"
            // onPress={() => signOut({ callbackUrl: "/" })}
            onPress={() => {
              deleteAsyncData("statistics").then(() =>
                storeAsyncData("statistics", initialProfile).then(() =>
                  setProfile(initialProfile),
                ),
              );
            }}
            title="Сбросить статистику"
          />
        </View>
      )}
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
