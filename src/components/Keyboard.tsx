import React from 'react';
import { Button, Group, Stack } from '@mantine/core';
import useStyles from './Keyboard.styles';

interface KeyboardProps {
  letters: string;
  onLetter: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

const Keyboard = ({
  letters,
  onBackspace,
  onEnter,
  onLetter,
}: KeyboardProps) => {
  const longestRow = letters.split(' ')[0].length;
  const { classes } = useStyles({ letterCount: longestRow });

  function handleLetter(event: React.MouseEvent) {
    const content = (event.target as HTMLElement).textContent;
    content && onLetter(content);
  }

  function handleEnter() {
    onEnter();
  }

  function handleBackspace() {
    onBackspace();
  }

  const rows = (
    <Stack className={classes.keyboard}>
      {/* Map Rows */}
      {letters.split(' ').map((row, i) => (
        <Group key={i} position="center" className={classes.keyboardRow}>
          {i === 2 && (
            <Button onClick={handleBackspace} className={classes.bigKey}>
              BACK
            </Button>
          )}
          {/* Map Letters */}
          {row.split('').map((letter, j) => (
            <Button key={j} onClick={handleLetter} className={classes.key}>
              {letter}
            </Button>
          ))}
          {i === 2 && (
            <Button onClick={handleEnter} className={classes.bigKey}>
              OK
            </Button>
          )}
        </Group>
      ))}
    </Stack>
  );

  return <div>{rows}</div>;
};

export default Keyboard;
