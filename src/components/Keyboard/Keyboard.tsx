import React from 'react';
import { Button, Group, Stack } from '@mantine/core';
import useStyles from './Keyboard.styles';
import tileStyles from '../Tile/Tile.styles';
import {
  getAbsentLetters,
  getCorrectLetters,
  getPresentLetters,
} from './KeyboardHelper';

interface KeyboardProps {
  letters: string;
  completedWords: string[];
  solution: string;
  onKeyPressed: (key: string) => void;
}

const Keyboard = ({
  letters,
  onKeyPressed,
  completedWords,
  solution,
}: KeyboardProps) => {
  const longestRow = letters.split(' ')[0].length;
  const { classes, cx } = useStyles({ letterCount: longestRow });
  const { classes: tileClasses } = tileStyles();

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

  const correctLetters = getCorrectLetters(completedWords, solution);
  const presentLetters = getPresentLetters(completedWords, solution);
  const absentLetters = getAbsentLetters(completedWords, solution);

  function getStatusClass(letter: string) {
    if (correctLetters.includes(letter)) return tileClasses.correct;
    if (presentLetters.includes(letter)) return tileClasses.present;
    if (absentLetters.includes(letter)) return tileClasses.absent;
  }

  const rows = (
    <Stack className={classes.keyboard}>
      {/* MAP ROWS */}
      {letters.split(' ').map((row, i) => (
        <Group key={i} position="center" className={classes.keyboardRow}>
          {/* ENTER BUTTON */}
          {i === 2 && (
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
          {i === 2 && (
            <Button onClick={handleBackspace} className={classes.bigKey}>
              BACK
            </Button>
          )}
        </Group>
      ))}
    </Stack>
  );

  return <>{rows}</>;
};

export default Keyboard;