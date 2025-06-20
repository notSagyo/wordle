import { Center, Paper } from '@mantine/core';
import { TileStatus } from '../../types';
import useStyles from './Tile.styles';

interface TileProps {
  value: string;
  status: TileStatus;
  animationDelay?: number;
  animationDuration?: number;
}

const Tile = ({
  value,
  status,
  animationDelay = 0,
  animationDuration = 500,
}: TileProps) => {
  const { classes, cx } = useStyles({ animationDelay, animationDuration });

  const statusClasses = cx(classes.tile, {
    [classes.correct]: status === 'correct',
    [classes.present]: status === 'present',
    [classes.absent]: status === 'absent',
    [classes.empty]: status === 'empty',
    [classes.edit]: status === 'edit',
  });

  return (
    <Paper className={statusClasses}>
      <Center sx={{ height: '100%' }}>{value}</Center>
    </Paper>
  );
};

export default Tile;
