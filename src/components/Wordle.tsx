import { Modal, Stack, useMantineTheme, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import useWindow from '../hooks/useWindow';
import { getWord, isValidWord } from '../service/request';
import { GameStatus } from '../types';
import RowCompleted from './RowCompleted';
import RowCurrent from './RowCurrent';
import RowEmpty from './RowEmpty';

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
    else if (event.key === 'Backspace' && currentWord.length > 0) {
      onBackspace();
    } else if (event.key === 'Enter' && currentWord.length == solution.length) {
      onEnter();
    } else if (currentWord.length >= solution.length) {
      return;
    } else if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
      onLetter(event.key);
    }
  }

  function onBackspace() {
    setCurrentWord(currentWord.slice(0, -1));
  }

  function onEnter() {
    if (!isValidWord(currentWord)) return;
    else if (currentWord === solution) setGameStatus('won');
    else if (turn === 6) setGameStatus('lost');
    setCompletedWords([...completedWords, currentWord]);
    setCurrentWord('');
    setTurn(turn + 1);
  }

  function onLetter(letter: string) {
    const newWord = currentWord + letter;
    setCurrentWord(newWord.toUpperCase());
  }

  const completedRows = completedWords.map((word, i) => (
    <RowCompleted key={i} word={word} solution={solution} />
  ));

  const emptyRows =
    turn < 6 &&
    Array.from(Array(6 - turn)).map((_, i) => (
      <RowEmpty solution={solution} key={i} />
    ));

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
        // withCloseButton={false}
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
        sx={{ height: '100vh' }}
      >
        {completedRows}
        {gameStatus === 'playing' && (
          <RowCurrent word={currentWord} solution={solution} />
        )}
        {emptyRows}
      </Stack>
    </>
  );
};

export default Wordle;
