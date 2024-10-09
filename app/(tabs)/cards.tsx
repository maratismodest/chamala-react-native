import { View } from "@/components";
import { CardPageMain } from "@/pages/cards-page";
import { useStore } from "@/store";
import { appStyles } from "@/styles";

export default function CardsPage() {
  const words = useStore((state) => state.words.filter((item) => item.image));
  return (
    <View style={appStyles.container}>
      <CardPageMain words={words} />
    </View>
  );
}
