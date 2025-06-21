import { Group, useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { TileStatus } from '../../types';
import Tile from '../Tile/Tile';

interface RowCompletedProps {
  guess: string;
  solution: string;
  animationOverlap?: number;
}

const RowCompleted = ({
  guess,
  solution,
  animationOverlap = 0.5,
}: RowCompletedProps) => {
  const theme = useMantineTheme();

  const tilesRow = useMemo(() => {
    const tilesStatuses: TileStatus[] = [];
    const solutionChars = solution.split('');
    const remainingLetters = [...solutionChars];

    solutionChars.forEach((_, i) => {
      if (guess[i] === solution[i]) {
        tilesStatuses[i] = 'correct';
        remainingLetters[i] = '';
      }
    });

    solutionChars.forEach((_, i) => {
      if (tilesStatuses[i] !== 'correct') {
        const indexOfUnused = remainingLetters.indexOf(guess[i]);
        if (indexOfUnused !== -1) {
          tilesStatuses[i] = 'present';
          remainingLetters[indexOfUnused] = '';
        } else tilesStatuses[i] = 'absent';
      }
    });

    return solutionChars.map((_, i) => {
      return (
        <Tile
          key={i}
          animationDelay={
            (theme.other.animationDuration / solution.length) *
            i *
            (1 - animationOverlap)
          }
          animationDuration={
            theme.other.animationDuration / solution.length +
            animationOverlap * theme.other.animationDuration
          }
          status={tilesStatuses[i]}
          value={guess[i]}
        />
      );
    });
  }, [solution, guess]);

  return <Group spacing={theme.other.tileSpacing}>{tilesRow}</Group>;
};

export default RowCompleted;
