import CollectModule from "@components/CollectModule";
import { View } from "@components/Themed";
import { appStyles } from "@styles";
import React from "react";

export default function CollectPage() {
  return (
    <View style={appStyles.container}>
      <CollectModule />
    </View>
  );
}
