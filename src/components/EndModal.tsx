import { Modal, Button, Text, Divider, Group } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import useHistory from '../hooks/useHistory';
import { GameStatus } from '../types';
import useStyles from './EndModal.styles';

interface EndModalProps {
  opened: boolean;
  setOpened: (o: boolean) => void;
  gameStatus: GameStatus;
  solution: string;
}

const EndModal = ({
  gameStatus,
  opened,
  setOpened,
  solution,
}: EndModalProps) => {
  const { losses, maxStreak, streak, wins, resetHistory } = useHistory();
  const { classes } = useStyles({
    won: gameStatus === 'won',
    newStreak: streak >= maxStreak,
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      overlayOpacity={0.5}
      overlayBlur={2.5}
      className={classes.root}
      trapFocus={false}
    >
      <Divider
        variant="solid"
        labelPosition="center"
        label={
          <Text size="xl" weight="bold">
            {gameStatus === 'won' ? 'YOU WON' : 'YOU LOST'}
          </Text>
        }
      />
      ❓ Solution:{' '}
      <Text component="span" className={classes.solution}>
        {solution}
      </Text>
      <br />✅ Wins:{' '}
      <Text component="span" className={classes.wins}>
        {wins}
      </Text>
      <br />❌ Losses:{' '}
      <Text component="span" className={classes.losses}>
        {losses}
      </Text>
      <br />
      🔥 Current streak:{' '}
      <Text component="span" className={classes.currentStreak}>
        {streak}
      </Text>
      <br />
      ❤️‍🔥 Best streak:{' '}
      <Text component="span" className={classes.bestStreak}>
        {maxStreak}
      </Text>
      <Group position="center" mt={'md'}>
        <Button color={'red'} onClick={resetHistory}>
          <Trash></Trash>
        </Button>
        <Button
          onClick={() => window.location.reload()}
          color="green"
          autoFocus={true}
        >
          PLAY AGAIN
        </Button>
      </Group>
    </Modal>
  );
};

export default EndModal;
