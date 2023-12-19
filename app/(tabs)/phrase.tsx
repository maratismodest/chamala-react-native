import GuessModule from "@components/GuessModule";
import { View } from "@components/Themed";
import { useStore } from "@store/zustand";
import { appStyles } from "@styles";

export default function PhrasePage() {
  const phrases = useStore((state) => state.phrases);
  return (
    <View style={appStyles.container}>
      <GuessModule collection={phrases} option="phrases" />
    </View>
  );
}
