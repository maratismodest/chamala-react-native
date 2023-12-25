import Happy from "@assets/svg/happy.svg";
import Button from "@components/Button";
import {Text, View} from "@components/Themed";
import {LocaleContext} from "@providers/LocaleProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deleteAsyncData, getAsyncData, storeAsyncData,} from "@store/async-storage";
import {appStyles} from "@styles";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, {useContext, useEffect, useState} from "react";

import {Image} from 'react-native'
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

const ShowUserInfo = ({userInfo}: any) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image source={{uri: userInfo.picture}} style={{width: 100, height: 100, borderRadius: 50}}/>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{userInfo.name}</Text>
    </View>
  )
}

export default function ProfilePage() {
  const {setLocale, i18n} = useContext(LocaleContext)
  const [userInfo, setUserInfo] = useState<any>(null);
  const [request, response, promptAsync] =
    Google.useAuthRequest(authRequestConfig);

  const [profile, setProfile] = useState<any>()

  const getUserInfo = async (token: any) => {
    if (!token) return
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {Authorization: `Bearer ${token}`}
      });
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user))
      setUserInfo(user);
    } catch (e) {
      console.error('e', e)
    }

  }


  const getInitialData = () => {
    getAsyncData("statistics").then((res) => {
      if (!res) {
        storeAsyncData("statistics", initialProfile).then(() =>
          setProfile(initialProfile),
        );
      } else {
        setProfile(JSON.parse(res));
      }
    })
  }

  useEffect(() => {
    getInitialData()
  }, []);

  useEffect(() => {
    signIn()
  }, [response]);

  const signIn = async () => {
    const user = await AsyncStorage.getItem('@user')
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response?.authentication?.accessToken)
      }

    } else {
      setUserInfo(JSON.parse(user))
    }
  }

  const changeLanguage = (locale: 'ru' | 'en') => {
    AsyncStorage.setItem('locale', locale).then(()=>{
      setLocale(locale)
    })
  }

  return (
    <View style={appStyles.container}>
      <View className="mx-auto">
        <Happy width={96} height={96}/>
      </View>
      <Text style={appStyles.h1}>{i18n.t("profile")}</Text>
      {userInfo && <ShowUserInfo userInfo={userInfo}/>}
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

      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 16}}>
        <Button title='Ru' onPress={() => changeLanguage('ru')}/>
        <Button title='En' onPress={() => changeLanguage('en')}/>
      </View>
      <View style={{marginTop: 16}}>
        {!userInfo && <Button
            title={i18n.t("login")}
            disabled={!request}
            onPress={
              () => promptAsync()
            }
        />}
        {userInfo && <Button
            title={i18n.t("logout")}
            onPress={
              async () => {
                await AsyncStorage.removeItem('@user')
                setUserInfo(undefined)
              }
            }
        />}
      </View>
    </View>
  );
}
