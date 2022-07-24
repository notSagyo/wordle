import { Modal, Stack, useMantineTheme, Text } from '@mantine/core';
import { cleanNotifications, showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import useWindow from '../hooks/useWindow';
import { getWord, isValidWord } from '../service/request';
import { GameStatus } from '../types';
import Keyboard from './Keyboard';
import RowCompleted from './RowCompleted';
import RowCurrent from './RowCurrent';
import RowEmpty from './RowEmpty';
import letters from '../assets/letters.json';

const Wordle = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [turn, setTurn] = useState<number>(1);
  const theme = useMantineTheme();
  useWindow('keydown', handleKeyDown);

  function handleKeyDown(event: KeyboardEvent) {
    if (gameStatus !== 'playing') return;
    else if (event.shiftKey || event.ctrlKey || event.altKey) return;
    else if (event.key === 'Backspace') {
      onBackspace();
    } else if (event.key === 'Enter') {
      onEnter();
    } else if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
      onLetter(event.key);
    }
  }

  function onBackspace() {
    if (currentWord.length < 1) return;
    setCurrentWord(currentWord.slice(0, -1));
  }

  function onLetter(letter: string) {
    if (currentWord.length >= solution.length) return;
    const newWord = currentWord + letter;
    setCurrentWord(newWord.toUpperCase());
  }

  async function onEnter() {
    if (currentWord.length !== solution.length) return;
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
    } else if (currentWord === solution) setGameStatus('won');
    else if (turn === 6) setGameStatus('lost');
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
      <Modal
        title={
          <Text size="xl" weight="bold">
            {gameStatus === 'won' ? 'YOU WON' : 'YOU LOST'}
          </Text>
        }
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        withCloseButton={false}
        overlayOpacity={0.5}
        overlayBlur={2.5}
      >
        <Text sx={{ letterSpacing: 0.15 }}>
          Some lorem ipsum stuff... <br /> Solution: {solution}
        </Text>
      </Modal>
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
        {gameStatus === 'playing' && (
          <RowCurrent word={currentWord} solution={solution} />
        )}
        {/* EMPTY ROWS */}
        {turn < 6 &&
          Array.from(Array(6 - turn)).map((_, i) => (
            <RowEmpty solution={solution} key={i} />
          ))}
      </Stack>
      <Keyboard
        letters={letters.english}
        onBackspace={onBackspace}
        onEnter={onEnter}
        onLetter={onLetter}
      />
    </>
  );
};

export default Wordle;
