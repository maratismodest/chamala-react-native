import React, { useState } from "react";

import CardsPageCard from "./CardsPageCard";

import { Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { IWord } from "@/types";
import { getRandomInt } from "@/utils";

type Props = {
  words: IWord[];
};
export const CardPageMain = ({ words }: Props) => {
  const { i18n } = useTranslations();
  const getRandomIndex = () => getRandomInt(0, words.length - 1);
  const [index, setIndex] = useState(getRandomIndex);
  return (
    <>
      <CardsPageCard word={words[index]} />
      <Button
        className="mt-8"
        onPress={() => setIndex(getRandomIndex)}
        title={i18n.t("next")}
      />
    </>
  );
};
