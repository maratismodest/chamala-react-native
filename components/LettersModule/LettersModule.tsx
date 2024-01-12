import Happy from '@assets/svg/happy.svg';
import Sad from '@assets/svg/sad.svg';
import AudioButton from '@components/AudioButton';
import AppButton from '@components/Button';
import { CollectProps, initialState, State } from './utils';
import i18n from '@i18n';
import { storeAsyncData } from '@store/async-storage';
import { useStore } from '@store/zustand';
import { appStyles } from '@styles';
import { IWord, Profile } from '@types';
import { getShuffled } from '@utils/getShuffled';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';


interface Props {
  words: IWord[];
}

export default function LettersModule({ words }: Props) {
  const { profile, setProfile, modal, setModal } = useStore((state) => state);

  const [{ isTrue, correct, chosens, options }, setState] = useState<State>(initialState);

  const getNewWord = useCallback(() => {
    setModal(false);
    const correct = getShuffled(words)[0];
    const realOptions = correct.ta.toLowerCase().split('');
    const options = getShuffled(realOptions).map((x, index) => ({
      word: x,
      id: index,
    }));
    setState({ ...initialState, options, correct });
  }, [words]);

  useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  const closeModal = () => {
    getNewWord();
  };

  const handleAdd = (x: CollectProps) => {
    setState(prev => ({
      ...prev,
      chosens: [...prev.chosens, x],
      options: prev.options.filter((item) => item.id !== x.id),
    }));
  };

  const handleRemove = (x: CollectProps) => {
    setState(prev => ({
      ...prev,
      chosens: prev.chosens.filter((item) => item.id !== x.id),
      options: [...prev.options, x],
    }));
  };

  const handleCheck = () => {
    const original = correct?.ta.toLowerCase();
    const current = chosens.map((x) => x.word.toLowerCase()).join('');
    const isCorrect = original === current;
    const _correct = profile.correct + (isCorrect ? 1 : 0);
    const _wrong = profile.wrong + (!isCorrect ? 1 : 0);
    const _accuracy = _correct / (_correct + _wrong);
    const res: Profile = {
      ...profile,
      correct: _correct,
      wrong: _wrong,
      accuracy: _accuracy,
    };
    setState(prev => ({ ...prev, isTrue: original === current }));
    setModal(true);
    setProfile(res);
    storeAsyncData('statistics', res);
  };

  if (!correct) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <>
      {/*<Text style={appStyles.h1}>Воспроизвести</Text>*/}
      <AudioButton uri={correct.audio} />
      <View style={styles.buttons}>
        {chosens.map((x) => (
          <AppButton
            key={x.id}
            onPress={() => handleRemove(x)}
            title={x.word}
            style={styles.button}
          />
        ))}
      </View>
      <View style={[appStyles.divider, { backgroundColor: '#eee' }]} />
      <View style={styles.buttons}>
        {options.map((x) => (
          <AppButton
            key={x.id}
            onPress={() => handleAdd(x)}
            title={x.word}
            style={styles.button}
          />
        ))}
      </View>
      <AppButton
        disabled={chosens.length < correct.ta.length}
        className='mt-4'
        onPress={handleCheck}
        title={i18n.t('check')}
        opacity={modal}
      />
      <Modal
        animationType='slide'
        transparent
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModal(!modal);
        }}
      >
        <View style={appStyles.centeredView}>
          <View style={appStyles.modalView}>
            <View className='flex-row items-center'>
              {isTrue ? (
                <Happy width={90} height={90} />
              ) : (
                <Sad width={90} height={90} />
              )}
              <View>
                {isTrue ? (
                  <Text>{i18n.t('correct')}</Text>
                ) : (
                  <>
                    <Text style={{ color: 'rgb(239, 68, 68)' }}>
                      {i18n.t('wrong')}
                    </Text>
                    <Text>
                      {i18n.t('correct')}: {correct.ta}
                    </Text>
                  </>
                )}
              </View>
            </View>

            <AppButton
              title={i18n.t('next')}
              onPress={closeModal}
              style={{ width: 200 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttons: {
    minHeight: 100,
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: 38,
  },
});
