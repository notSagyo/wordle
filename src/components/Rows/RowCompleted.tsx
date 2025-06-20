import { Group, useMantineTheme } from '@mantine/core';
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
  animationOverlap = 0.25,
}: RowCompletedProps) => {
  const theme = useMantineTheme();
  const checkLetter = (letter: string, pos: number): TileStatus => {
    if (solution[pos] === letter) return 'correct';
    else if (solution.includes(letter)) return 'present';
    else return 'absent';
  };

  const tilesRow = solution
    .split('')
    .map((_, i) => (
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
        status={checkLetter(guess[i], i)}
        value={guess[i]}
      />
    ));

  return <Group spacing={theme.other.tileSpacing}>{tilesRow}</Group>;
};

export default RowCompleted;
