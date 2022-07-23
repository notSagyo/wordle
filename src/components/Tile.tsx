import { Center, Paper } from '@mantine/core';
import { TileStatus } from '../types';
import useStyles from './Tile.styles';

interface TileProps {
  value: string;
  status: TileStatus;
}

const Tile = ({ value, status }: TileProps) => {
  const { classes, cx } = useStyles();

  const statusClasses = cx({
    [classes.correct]: status === 'correct',
    [classes.present]: status === 'present',
    [classes.absent]: status === 'absent',
    [classes.empty]: status === 'empty',
    [classes.edit]: status === 'edit',
  });

  return (
    <Paper className={cx(classes.tile, statusClasses)}>
      <Center sx={{ height: '100%' }}>{value}</Center>
    </Paper>
  );
};

export default Tile;
