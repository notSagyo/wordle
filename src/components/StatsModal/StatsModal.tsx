import {
  Modal,
  Button,
  Text,
  Divider,
  Group,
  Progress,
  useMantineTheme,
} from '@mantine/core';
import _ from 'lodash';
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
  const theme = useMantineTheme();
  const { losses, maxStreak, streak, wins, resetHistory, guessDistribution } =
    useHistory();
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
      {/* TITLE */}
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
      {/* STATS */}
      {gameStatus !== 'playing' && (
        <div>
          ❓ {transl[lang].solution}:{' '}
          <Text component="span" className={classes.solution}>
            {solution} <br />
          </Text>
        </div>
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
      {/* GUESS DISTRIBUTION */}
      <Divider
        variant="solid"
        labelPosition="center"
        mt={'lg'}
        mb={'xs'}
        label={
          <Text size="xl" weight="bold">
            {transl[lang].guessDistribution}
          </Text>
        }
      />
      <div>
        {guessDistribution.map((guess, i) => (
          <Group key={i} position="apart">
            <Text className={classes.distNumber}>{i + 1}</Text>
            <Progress
              radius={'xs'}
              value={(guess / _.sum(guessDistribution)) * 100}
              sx={{ flexGrow: 1 }}
              color={theme.other.green}
            />
            <Text className={classes.distNumber}>{guessDistribution[i]}</Text>
          </Group>
        ))}
      </div>
      {/* BUTTONS */}
      <Group position="center" mt={'lg'}>
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
