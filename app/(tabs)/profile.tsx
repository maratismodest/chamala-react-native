import Happy from "@assets/svg/happy.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { useIsFocused } from "@react-navigation/native";
import { appStyles } from "@styles";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";

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

const authRequestConfig = {
  androidClientId:
    "608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com",
  expoClientId:
    "608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com",
  iosClientId:
    "608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com",
  webClientId:
    "608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com",
  clientSecret: "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",
};

function showUserInfo(userInfo: any) {
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

async function getUserData(accessToken: string) {
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/userinfo/v2/me",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  userInfoResponse.json().then((data) => {
    return data;
  });
}

export default function TabTwoScreen() {
  // const [accessToken, setAccessToken] = React.useState<string | undefined>();
  // const [userInfo, setUserInfo] = React.useState<any>();
  // const [message, setMessage] = React.useState();
  // const [request, response, promptAsync] =
  //   Google.useAuthRequest(authRequestConfig);
  //
  // React.useEffect(() => {
  //   // @ts-ignore
  //   setMessage(JSON.stringify(response));
  //   if (response?.type === "success") {
  //     // @ts-ignore
  //     setAccessToken(response.authentication.accessToken);
  //   }
  // }, [response]);

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

  // const signOut = () => {
  //   setAccessToken(undefined);
  //   setUserInfo(undefined);
  // };

  return (
    <View style={appStyles.container}>
      {/*{showUserInfo(userInfo)}*/}
      {/*{Platform.OS === "web" && (*/}
      {/*  <Button*/}
      {/*    title={accessToken ? "Logout" : "Login"}*/}
      {/*    onPress={*/}
      {/*      accessToken*/}
      {/*        ? signOut*/}
      {/*        : () => {*/}
      {/*            // @ts-ignore*/}
      {/*            promptAsync({ useProxy: false, showInRecents: true });*/}
      {/*          }*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}
      <View className="mx-auto">
        <Happy width={96} height={96} />
      </View>
      <Text style={appStyles.h1}>Профиль</Text>
      {profile && (
        <View>
          <Text style={appStyles.text}>верно: {profile.correct}</Text>
          <Text style={appStyles.text}>неверно: {profile.wrong}</Text>
          {profile.correct + profile.wrong > 0 && (
            <Text style={appStyles.text}>
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