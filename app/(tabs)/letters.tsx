import LettersModule from '@components/LettersModule/LettersModule';
import { View } from '@components/Themed';
import { useStore } from '@store/zustand';
import { appStyles } from '@styles';
import React, { useCallback } from 'react';

export default function LettersPage() {
  const words = useStore(useCallback((state) => state.words, []));

  return (
    <View style={appStyles.container}>
      <LettersModule words={words.filter(word => word.ta.length < 8)} />
    </View>
  );
}
