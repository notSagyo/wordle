import { Group, useMantineTheme } from '@mantine/core';
import Tile from '../Tile/Tile';

interface RowCompletedProps {
  guess: string;
  solution: string;
}

const RowCurrent = ({ guess, solution }: RowCompletedProps) => {
  const theme = useMantineTheme();

  const editTiles = guess
    .split('')
    .map((letter, i) => <Tile key={i} status="edit" value={letter} />);

  const emptyTiles =
    solution.length > guess.length
      ? Array.from(Array(solution.length - guess.length)).map((letter, i) => (
          <Tile key={i} status="empty" value={letter} />
        ))
      : [];

  return (
    <Group spacing={theme.other.tileSpacing}>
      {editTiles}
      {emptyTiles}
    </Group>
  );
};

export default RowCurrent;
