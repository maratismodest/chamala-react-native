import {View, Text} from "@components/Themed";
import React, {useEffect, useState} from 'react';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button} from "react-native";
WebBrowser.maybeCompleteAuthSession();

// ANDROID_CLIENT_ID=608106149141-oqh4a1bvonl1nl49k4gt8tse13vvi6u8.apps.googleusercontent.com
// IOS_CLIENT_ID=608106149141-fqees75kvitmk53gv762pdd4hnsljf6h.apps.googleusercontent.com
// WEB_CLIENT_ID=608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);

  //client IDs from .env
  const config = {
    androidClientId: '608106149141-oqh4a1bvonl1nl49k4gt8tse13vvi6u8.apps.googleusercontent.com',
    iosClientId: '608106149141-fqees75kvitmk53gv762pdd4hnsljf6h.apps.googleusercontent.com',
    webClientId: '608106149141-ao3j9c74j63lonenfarbn4anp31rvq65.apps.googleusercontent.com',
  };
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const getUserInfo = async (token:string) => {
    //absent token
    if (!token) return;
    //present token
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      //store user information  in Asyncstorage
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(
        "Failed to fetch user data:",
        // response.status,
        // response.statusText
      );
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Attempt to retrieve user information from AsyncStorage
      const userJSON = await AsyncStorage.getItem("user");

      if (userJSON) {
        // If user information is found in AsyncStorage, parse it and set it in the state
        setUserInfo(JSON.parse(userJSON));
      } else if (response?.type === "success") {
        // If no user information is found and the response type is "success" (assuming response is defined),
        // call getUserInfo with the access token from the response
        getUserInfo(response?.authentication?.accessToken as string);
      }
    } catch (error) {
      // Handle any errors that occur during AsyncStorage retrieval or other operations
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
  };

//add it to a useEffect with response as a dependency
  useEffect(() => {
    signInWithGoogle();
  }, [response]);

//log the userInfo to see user details
  console.log(JSON.stringify(userInfo))
  return (
    <View>
      <Text>{JSON.stringify(userInfo)}</Text>
      <Text>Test</Text>
      <Button title= "sign in with google" onPress={()=>{promptAsync()}}/>
    </View>
  );
};

export default Login;
