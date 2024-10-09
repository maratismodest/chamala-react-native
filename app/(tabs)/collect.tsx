import React from "react";

import { View } from "@/components";
import CollectModule from "@/components/Games/CollectModule";
import { useStore } from "@/store";
import { appStyles } from "@/styles";

export default function CollectPage() {
  const phrases = useStore((state) => state.phrases);
  return (
    <View style={appStyles.container}>
      <CollectModule phrases={phrases} />
    </View>
  );
}
