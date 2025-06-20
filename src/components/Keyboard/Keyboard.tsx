import { Button, Group, Stack, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Backspace } from 'tabler-icons-react';
import { GameStatus } from '../../types';
import useStyles from './Keyboard.styles';
import {
  getAbsentLetters,
  getCorrectLetters,
  getPresentLetters,
} from './KeyboardHelper';

interface KeyboardProps {
  letters: string;
  guessedWords: string[];
  solution: string;
  gameStatus: GameStatus;
  onKeyPressed: (key: string) => void;
}

const Keyboard = ({
  letters,
  guessedWords,
  solution,
  gameStatus,
  onKeyPressed,
}: KeyboardProps) => {
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [presentLetters, setPresentLetters] = useState<string[]>([]);
  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const longestRow = Math.max(...letters.split(' ').map((w) => w.length));
  const { classes, cx } = useStyles({ letterCount: longestRow });
  const theme = useMantineTheme();

  function handleLetter(event: React.MouseEvent) {
    const content = (event.target as HTMLElement).textContent;
    content && onKeyPressed(content);
  }

  function handleEnter() {
    onKeyPressed('ENTER');
  }

  function handleBackspace() {
    onKeyPressed('BACKSPACE');
  }

  useEffect(() => {
    const updateGuessedWords = () => {
      setCorrectLetters(getCorrectLetters(guessedWords, solution));
      setPresentLetters(getPresentLetters(guessedWords, solution));
      setAbsentLetters(getAbsentLetters(guessedWords, solution));
    };

    if (gameStatus === 'playing') {
      setTimeout(() => updateGuessedWords(), theme.other.animationDuration);
    } else updateGuessedWords();
  }, [guessedWords, solution]);

  function getStatusClass(letter: string) {
    if (correctLetters.includes(letter)) return classes.correct;
    if (presentLetters.includes(letter)) return classes.present;
    if (absentLetters.includes(letter)) return classes.absent;
  }

  return (
    <Stack className={classes.keyboard}>
      {/* MAP ROWS */}
      {letters.split(' ').map((row, i) => (
        <Group key={i} position="center" className={classes.keyboardRow}>
          {/* ENTER BUTTON */}
          {i === letters.split(' ').length - 1 && (
            <Button onClick={handleEnter} className={classes.bigKey}>
              OK
            </Button>
          )}
          {/* MAP LETTERS */}
          {row.split('').map((letter, j) => (
            <Button
              key={j}
              onClick={handleLetter}
              className={cx(classes.key, getStatusClass(letter))}
            >
              {letter}
            </Button>
          ))}
          {/* BACK BUTTON */}
          {i === letters.split(' ').length - 1 && (
            <Button onClick={handleBackspace} className={classes.bigKey}>
              <Backspace size={24} />
            </Button>
          )}
        </Group>
      ))}
    </Stack>
  );
};

export default Keyboard;
