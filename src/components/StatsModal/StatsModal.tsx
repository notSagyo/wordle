import { Modal, Button, Text, Divider, Group } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import transl from '../../assets/translation.json';
import useGameState from '../../hooks/useGameState';
import useHistory from '../../hooks/useHistory';
import useStyles from './StatsModal.styles';

interface StatsModalProps {
  opened: boolean;
  setOpened: (o: boolean) => void;
}

const StatsModal = ({ opened, setOpened }: StatsModalProps) => {
  const {
    gameStatus,
    playAgain,
    solution,
    gameLanguage: lang,
  } = useGameState();
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
              ? transl[lang].win
              : gameStatus === 'lost'
              ? transl[lang].lose
              : transl[lang].stats}
          </Text>
        }
      />
      {gameStatus !== 'playing' && (
        <>
          ❓ {transl[lang].solution}:{' '}
          <Text component="span" className={classes.solution}>
            {solution}
          </Text>
          <br />
        </>
      )}
      ✅ {transl[lang].wins}:{' '}
      <Text component="span" className={classes.wins}>
        {wins}
      </Text>
      <br />❌ {transl[lang].losses}:{' '}
      <Text component="span" className={classes.losses}>
        {losses}
      </Text>
      <br />
      🔥 {transl[lang].streak}:{' '}
      <Text component="span" className={classes.currentStreak}>
        {streak}
      </Text>
      <br />
      🥇 {transl[lang].bestStreak}:{' '}
      <Text component="span" className={classes.bestStreak}>
        {maxStreak}
      </Text>
      <Group position="center" mt={'md'}>
        <Button color={'red'} onClick={resetHistory}>
          <Trash></Trash>
        </Button>
        {gameStatus !== 'playing' && (
          <Button
            onClick={handlePlayAgain}
            autoFocus={true}
            className={classes.playAgainBtn}
          >
            {transl[lang].playAgain}
          </Button>
        )}
      </Group>
    </Modal>
  );
};

export default StatsModal;
