import React from "react";

import CollectModule from "@/components/Games/CollectModule";
import { View } from "@/components/Themed";
import { appStyles } from "@/styles";

export default function CollectPage() {
  return (
    <View style={appStyles.container}>
      <CollectModule />
    </View>
  );
}
