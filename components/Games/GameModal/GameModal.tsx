import React from "react";
import { Alert, Modal, View } from "react-native";

import Happy from "@/assets/svg/happy.svg";
import Sad from "@/assets/svg/sad.svg";
import AppButton from "@/components/Button";
import { Text } from "@/components/Themed";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import type { IWord } from "@/types";

type Props = {
  correct: IWord;
  answer: IWord;
  handleNext: () => void;
};

export const GameModal = ({ correct, answer, handleNext }: Props) => {
  const { i18n } = useTranslations();
  const { modal, setModal } = useStore((state) => state);
  const isCorrect = answer.ta === correct.ta;
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModal(!modal);
      }}
    >
      <View style={appStyles.centeredView}>
        <View style={appStyles.modalView}>
          <View className="flex-row items-center">
            {isCorrect ? (
              <Happy width={90} height={90} />
            ) : (
              <Sad width={90} height={90} />
            )}
            <View>
              {isCorrect ? (
                <Text>{i18n.t("correct")}</Text>
              ) : (
                <>
                  <Text style={{ color: "rgb(239, 68, 68)" }}>
                    {i18n.t("wrong")}
                  </Text>
                  <Text>
                    {i18n.t("correct")}: {correct.ta}
                  </Text>
                </>
              )}
            </View>
          </View>

          <AppButton
            title={i18n.t("next")}
            onPress={handleNext}
            style={{ width: 200 }}
          />
        </View>
      </View>
    </Modal>
  );
};
