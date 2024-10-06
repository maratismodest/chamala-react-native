import { useEffect, useMemo, useState } from "react";

import { View } from "@/components/Themed";
import { Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { CardsPageCard } from "@/pages/CardsPage";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import { getRandomInt } from "@/utils";

export default function CardsPage() {
  const { i18n } = useTranslations();
  const words = useStore((state) => state.cards);
  const getRandomIndex = () => getRandomInt(0, words.length - 1);
  const [index, setIndex] = useState(getRandomIndex);

  return (
    <View style={appStyles.container} className="flex-col justify-evenly">
      <CardsPageCard word={words[index]} />

      <Button
        className="mt-8"
        onPress={() => setIndex(getRandomIndex)}
        title={i18n.t("next")}
      />
    </View>
  );
}
