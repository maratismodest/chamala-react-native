import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import { EditScreenInfo, Text, View } from "@/components";

export default function ModalScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-xl">Info</Text>
      <View
        className="my-8 h-[1px] w-[80%]"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
