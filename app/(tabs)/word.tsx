import GuessModule from "@components/Games/GuessModule/GuessModule";
import { View } from "@components/Themed";
import { useStore } from "@store/zustand";
import { appStyles } from "@styles";

export default function WordPage() {
  const words = useStore((state) => state.words);
  return (
    <View style={appStyles.container}>
      <GuessModule collection={words} />
    </View>
  );
}
