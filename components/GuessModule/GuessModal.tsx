import Happy from "@assets/svg/happy.svg";
import Sad from "@assets/svg/sad.svg";
import AppButton from "@components/Button";
import { Text } from "@components/Themed";
import useTransitions from "@hooks/useTransitions";
import { useStore } from "@store/zustand";
import { appStyles } from "@styles";
import { IWord, Language } from "@types";
import React from "react";
import { Alert, Modal, View } from "react-native";

interface GuessModalProps {
  correct: IWord;
  answer: IWord | undefined;
  handleNext: () => void;
}

const GuessModal = ({ correct, answer, handleNext }: GuessModalProps) => {
  const { i18n } = useTransitions();
  const { modal, setModal } = useStore((state) => state);

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
            {correct.id === answer?.id ? (
              <Happy width={90} height={90} />
            ) : (
              <Sad width={90} height={90} />
            )}
            <View>
              {correct.id === answer?.id ? (
                <Text>{i18n.t("correct")}</Text>
              ) : (
                <>
                  <Text style={{ color: "rgb(239, 68, 68)" }}>
                    {i18n.t("wrong")}
                  </Text>
                  <Text>
                    {i18n.t("correct")}: {correct[i18n.locale as Language]}
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

export default GuessModal;
