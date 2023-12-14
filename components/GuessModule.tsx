import React, {useCallback, useMemo, useState} from "react";
import {Button, Text, View} from "react-native";
import {useStore} from "../store";
import {IWord} from "../types";
import {getShuffled} from "../utils/getShuffled";

interface GuessModuleProps {
  collection: IWord[];
  option: 'words' | 'phrases';
  count?: number;
}

interface AnswerProps {
  id: number;
  origin: string;
  correct: string | number;
  answer: string | number | undefined;
}

export default function GuessModule({collection, option, count = 6}: GuessModuleProps) {
  const click = useStore(useCallback((state) => state.click, []));
  const inc = useStore(useCallback((state) => state.incrementClick, []));
  const [list, setList] = useState<IWord[]>(() => getShuffled(collection).slice(0, 4));
  const correct = useMemo(() => getShuffled(list)[0], [list]);
  const [answer, setAnswer] = useState<IWord | undefined>(undefined);
  const [result, setResult] = useState<AnswerProps[]>([]);

  const handleNext = () => {
    setResult(prevState =>
      prevState.concat({
        id: correct.id,
        origin: correct?.ta,
        correct: correct?.ru,
        answer: answer?.ru,
      })
    );
    inc()
    setAnswer(undefined);
    setList(getShuffled(collection.filter(x => !result.map(x => x.id).includes(x.id))).slice(0, 4));
  };

  const handleAnswer = (id: number) => {
    setAnswer(list.find(x => x.id === id));
    handleNext()
  };

  // const audioUrl =
  //   process.env.NEXT_PUBLIC_FILE_SERVER +
  //   '/audio/' +
  //   option +
  //   '/' +
  //   correct.ta.toLowerCase() +
  //   '.mp3';

  const _audioUrl =
    './../assets/audio/words/авыз.mp3'


  console.log('audioUrl', _audioUrl)
  const word = 'авыз'
  return (
    <>
      <View>
        <Text style={{fontSize: 24, textAlign: 'center', textTransform: 'uppercase'}}>{correct.ta}</Text>
        {/*<Audio url={audioUrl}/>*/}
        {/*<AudioButton word='@/assets/audio/words/авыз.mp3'/>*/}

        <View className="mt-4 flex flex-col gap-4" style={{width: 280, gap: 8, marginTop: 16}}>
          {list.map(x => (
            <Button key={x.id} onPress={() => handleAnswer(x.id)} title={x.ru}/>
          ))}
        </View>
        <Text>
          {click}
          {/*{result.length + 1} / {count}*/}
        </Text>
        {/*<ProgressBar progress={result.length / count}/>*/}
      </View>
    </>
  );
}
