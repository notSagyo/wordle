import { Group, useMantineTheme } from '@mantine/core';
import Tile from '../Tile/Tile';

interface RowCompletedProps {
  word: string;
  solution: string;
}

const RowCurrent = ({ word, solution }: RowCompletedProps) => {
  const theme = useMantineTheme();

  const editTiles = word
    .split('')
    .map((letter, i) => <Tile key={i} status="edit" value={letter} />);

  const emptytiles =
    solution.length > word.length
      ? Array.from(Array(solution.length - word.length)).map((letter, i) => (
          <Tile key={i} status="empty" value={letter} />
        ))
      : [];

  return (
    <Group spacing={theme.other.tileSpacing}>
      {editTiles}
      {emptytiles}
    </Group>
  );
};

export default RowCurrent;
