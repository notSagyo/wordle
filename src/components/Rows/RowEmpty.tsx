import { Group, useMantineTheme } from '@mantine/core';
import Tile from '../Tile/Tile';

interface RowEmptyProps {
  solution: string;
}

const RowEmpty = ({ solution }: RowEmptyProps) => {
  const theme = useMantineTheme();
  const tilesRow = solution
    .split('')
    .map((_, i) => <Tile key={i} status="empty" value="" />);

  return <Group spacing={theme.other.tileSpacing}>{tilesRow}</Group>;
};

export default RowEmpty;
