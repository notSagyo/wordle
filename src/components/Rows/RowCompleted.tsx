import { Group, useMantineTheme } from '@mantine/core';
import { TileStatus } from '../../types';
import Tile from '../Tile/Tile';

interface RowCompletedProps {
  word: string;
  solution: string;
}

const RowCompleted = ({ word, solution }: RowCompletedProps) => {
  const theme = useMantineTheme();
  const checkLetter = (letter: string, pos: number): TileStatus => {
    if (solution[pos] === letter) return 'correct';
    else if (solution.includes(letter)) return 'present';
    else return 'absent';
  };

  const tilesRow = solution
    .split('')
    .map((_, i) => (
      <Tile key={i} status={checkLetter(word[i], i)} value={word[i]} />
    ));

  return <Group spacing={theme.other.tileSpacing}>{tilesRow}</Group>;
};

export default RowCompleted;
