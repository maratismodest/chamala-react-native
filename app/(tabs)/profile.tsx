import Happy from "@assets/svg/happy.svg";
import Button from "@components/Button";
import {Text, View} from "@components/Themed";
import {LocaleContext} from "@providers/LocaleProvider";
import {useIsFocused} from "@react-navigation/native";
import {deleteAsyncData, getAsyncData, storeAsyncData,} from "@store/async-storage";
import {appStyles} from "@styles";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, {useContext, useEffect, useState} from "react";
import {env} from "../../data/env";

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
  androidClientId: env.ANDROID_CLIENT_ID,
  iosClientId: env.IOS_CLIENT_ID,
  webClientId: env.WEB_CLIENT_ID,
};

export default function ProfilePage() {
  const {setLocale, i18n} = useContext(LocaleContext)

  const isFocused = useIsFocused();
  const [profile, setProfile] = useState<Profile | undefined>();
  useEffect(() => {
    console.log("called");

    // Call only when screen open or when back on screen
    if (isFocused) {
      getInitialData();
    }
  }, [isFocused]);


  const [accessToken, setAccessToken] = React.useState<string | undefined>();
  const [userInfo, setUserInfo] = React.useState<any>();
  const [message, setMessage] = React.useState();
  const [request, response, promptAsync] =
    Google.useAuthRequest(authRequestConfig);

  React.useEffect(() => {
    // @ts-ignore
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      // @ts-ignore
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

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

  const signOut = () => {
    setAccessToken(undefined);
    setUserInfo(undefined);
  };

  return (
    <View style={appStyles.container}>
      {/*<Button*/}
      {/*  title={accessToken ? "Logout" : "Login"}*/}
      {/*  onPress={*/}
      {/*    accessToken*/}
      {/*      ? signOut*/}
      {/*      : () => {*/}
      {/*        // @ts-ignore*/}
      {/*        promptAsync({useProxy: false, showInRecents: true});*/}
      {/*      }*/}
      {/*  }*/}
      {/*/>*/}
      <View className="mx-auto">
        <Happy width={96} height={96}/>
      </View>
      <Text style={appStyles.h1}>{i18n.t("profile")}</Text>
      {profile && (
        <View>
          <Text style={appStyles.text}>
            {i18n.t("correct")}: {profile.correct}
          </Text>
          <Text style={appStyles.text}>
            {i18n.t("wrong")}: {profile.wrong}
          </Text>
          {profile.correct + profile.wrong > 0 && (
            <Text style={appStyles.text}>
              {i18n.t("accuracy")}:{" "}
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
            title={i18n.t("reset")}
          />
        </View>
      )}
      <View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 16}}>
          <Button title='Ru' onPress={() => setLocale('ru')}/>
          <Button title='En' onPress={() => setLocale('en')}/>
        </View>
        <Text style={{textAlign: 'center'}}>Поменять язык</Text>
      </View>

    </View>
  );
}
