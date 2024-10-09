import React, { useState } from "react";

import CardsPageCard from "./CardsPageCard";

import { Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { IWord } from "@/types";
import { getRandomItem } from "@/utils";

type Props = {
  words: IWord[];
};

export const CardPageMain = ({ words }: Props) => {
  const { i18n } = useTranslations();
  const [word, setWord] = useState(getRandomItem(words));
  return (
    <>
      <CardsPageCard word={word} />
      <Button
        className="mt-8"
        onPress={() => setWord(getRandomItem(words))}
        title={i18n.t("next")}
      />
    </>
  );
};
