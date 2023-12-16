import Happy from "@assets/svg/happy.svg";
import Button from "@components/Button";
import { Text, View } from "@components/Themed";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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

export default function TabTwoScreen() {
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
      <div className="mx-auto">
        <Happy width={96} height={96} />
      </div>
      <Text>Profile Page</Text>
      {profile && (
        <View>
          <Text className="flex">correct: {profile.correct}</Text>
          <Text className="flex">wrong: {profile.wrong}</Text>
          {profile.correct + profile.wrong > 0 && (
            <Text className="flex">
              accuracy:{" "}
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
