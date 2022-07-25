import { Stack, useMantineTheme, Text } from '@mantine/core';
import { cleanNotifications, showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import useWindow from '../hooks/useWindow';
import { getWord, isValidWord } from '../service/request';
import { GameStatus } from '../types';
import Keyboard from './Keyboard/Keyboard';
import RowCompleted from './Rows/RowCompleted';
import RowCurrent from './Rows/RowCurrent';
import RowEmpty from './Rows/RowEmpty';
import letters from '../assets/letters.json';
import useStreak from '../hooks/useStreak';
import EndModal from './EndModal';

const Wordle = () => {
  const streak = useStreak();
  const [modalOpened, setModalOpened] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [turn, setTurn] = useState<number>(1);
  const theme = useMantineTheme();
  useWindow('keydown', handleKeyDown);

  function handleKeyDown(event: KeyboardEvent) {
    if (
      gameStatus !== 'playing' ||
      event.shiftKey ||
      event.ctrlKey ||
      event.altKey
    )
      return;
    onKeyPressed(event.key);
  }

  function onKeyPressed(key: string) {
    key = key.toUpperCase();
    if (key === 'ESCAPE') onEscape();
    else if (key === 'BACKSPACE' && currentWord.length > 0) onBackspace();
    else if (key === 'ENTER' && currentWord.length === solution.length)
      onEnter();
    else if (/^[a-z]{1}$/i.test(key) && currentWord.length < solution.length)
      onLetter(key);
  }

  function onEscape() {
    setCurrentWord('');
  }

  function onBackspace() {
    setCurrentWord(currentWord.slice(0, -1));
  }

  function onLetter(letter: string) {
    const newWord = currentWord + letter;
    setCurrentWord(newWord.toUpperCase());
  }

  async function onEnter() {
    const isValid = await isValidWord(currentWord);
    if (!isValid) {
      cleanNotifications();
      showNotification({
        title: 'Invalid word',
        message:
          "I'm not saying it doesn't exist... but it's not in our dictionary.",
        color: 'red',
        disallowClose: true,
        autoClose: 4000,
      });
      return;
    } else if (currentWord === solution) {
      streak.win();
      setGameStatus('won');
    } else if (turn === 6) {
      streak.lose();
      setGameStatus('lost');
    }
    setCompletedWords([...completedWords, currentWord]);
    setCurrentWord('');
    setTurn(turn + 1);
  }

  useEffect(() => {
    getWord().then((w) => setSolution(w));
  }, []);

  useEffect(() => {
    if (gameStatus !== 'playing') {
      setModalOpened(true);
    }
  }, [gameStatus]);

  return (
    <>
      <EndModal
        gameStatus={gameStatus}
        opened={modalOpened}
        solution={solution}
      />
      <Stack
        justify={'center'}
        align={'center'}
        spacing={theme.other.tileSpacing}
      >
        {/* COMPLETED WORDS */}
        {completedWords.map((word, i) => (
          <RowCompleted key={i} word={word} solution={solution} />
        ))}
        {/* CURRENT WORD */}
        {turn <= 6 && <RowCurrent word={currentWord} solution={solution} />}
        {/* EMPTY ROWS */}
        {turn < 6 &&
          Array.from(Array(6 - turn)).map((_, i) => (
            <RowEmpty solution={solution} key={i} />
          ))}
        {/* SOLUTION */}
        {gameStatus === 'lost' && (
          <Text size={'xl'}>
            Solution: <b>{solution}</b>
          </Text>
        )}
      </Stack>
      <Keyboard
        letters={letters.english}
        onKeyPressed={onKeyPressed}
        completedWords={completedWords}
        solution={solution}
      />
    </>
  );
};

export default Wordle;
