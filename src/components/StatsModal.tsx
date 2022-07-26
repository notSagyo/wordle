import { Modal, Button, Text, Divider, Group } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import useGameState from '../hooks/useGameState';
import useHistory from '../hooks/useHistory';
import useStyles from './StatsModal.styles';

interface StatsModalProps {
  opened: boolean;
  setOpened: (o: boolean) => void;
}

const StatsModal = ({ opened, setOpened }: StatsModalProps) => {
  const { gameStatus, playAgain, solution } = useGameState();
  const { losses, maxStreak, streak, wins, resetHistory } = useHistory();
  const { classes } = useStyles({ lost: gameStatus === 'lost' });

  function handlePlayAgain() {
    setOpened(false);
    playAgain();
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      overlayOpacity={0.85}
      overlayBlur={3}
      className={classes.root}
      trapFocus={false}
    >
      <Divider
        variant="solid"
        labelPosition="center"
        label={
          <Text size="xl" weight="bold">
            {gameStatus === 'won'
              ? 'YOU WIN'
              : gameStatus === 'lost'
              ? 'YOU LOSE'
              : 'STATS'}
          </Text>
        }
      />
      {gameStatus !== 'playing' && (
        <>
          ❓ Solution:{' '}
          <Text component="span" className={classes.solution}>
            {solution}
          </Text>
          <br />
        </>
      )}
      ✅ Wins:{' '}
      <Text component="span" className={classes.wins}>
        {wins}
      </Text>
      <br />❌ Losses:{' '}
      <Text component="span" className={classes.losses}>
        {losses}
      </Text>
      <br />
      🔥Current streak:{' '}
      <Text component="span" className={classes.currentStreak}>
        {streak}
      </Text>
      <br />
      🥇 Best streak:{' '}
      <Text component="span" className={classes.bestStreak}>
        {maxStreak}
      </Text>
      <Group position="center" mt={'md'}>
        <Button color={'red'} onClick={resetHistory}>
          <Trash></Trash>
        </Button>
        {gameStatus !== 'playing' && (
          <Button onClick={handlePlayAgain} color="green" autoFocus={true}>
            PLAY AGAIN
          </Button>
        )}
      </Group>
    </Modal>
  );
};

export default StatsModal;
