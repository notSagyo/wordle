import {
  Button,
  Divider,
  Group,
  Modal,
  Progress,
  Text,
  useMantineTheme,
} from '@mantine/core';
import _ from 'lodash';
import { Trash } from 'tabler-icons-react';
import { useGameContext } from '../../context/GameProvider';
import translationJSON from '../../data/translation.json';
import useGlobalStyles from '../../GlobalStyles';
import useHistory from '../../hooks/useHistory';
import useStyles from './StatsModal.styles';

interface StatsModalProps {
  opened: boolean;
  setOpened: (o: boolean) => void;
}

const StatsModal = ({ opened, setOpened }: StatsModalProps) => {
  const {
    gameStatus,
    resetGame,
    solution,
    gameLanguage: lang,
  } = useGameContext();
  const theme = useMantineTheme();
  const { losses, maxStreak, streak, wins, resetHistory, guessDistribution } =
    useHistory();
  const { classes: styles } = useGlobalStyles();
  const { classes } = useStyles({ lost: gameStatus === 'lost' });
  const t9n = translationJSON?.[lang] || translationJSON['EN'];

  function handlePlayAgain() {
    setOpened(false);
    resetGame();
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
              ? t9n.win
              : gameStatus === 'lost'
              ? t9n.lose
              : t9n.stats}
          </Text>
        }
      />
      {/* STATS */}
      {gameStatus !== 'playing' && (
        <div>
          ❓ {t9n.solution}:{' '}
          <Text component="span" className={classes.solution}>
            {solution} <br />
          </Text>
        </div>
      )}
      ✅ {t9n.wins}:{' '}
      <Text component="span" className={classes.wins}>
        {wins}
      </Text>
      <br />❌ {t9n.losses}:{' '}
      <Text component="span" className={classes.losses}>
        {losses}
      </Text>
      <br />
      🔥 {t9n.streak}:{' '}
      <Text component="span" className={classes.currentStreak}>
        {streak}
      </Text>
      <br />
      🥇 {t9n.bestStreak}:{' '}
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
            {t9n.guessDistribution}
          </Text>
        }
      />
      <div>
        {guessDistribution.map((guess, i) => (
          <Group key={i} position="apart">
            <Text className={classes.distNumber}>{i + 1}</Text>
            <Progress
              radius={'xs'}
              value={(guess / (_.max(guessDistribution) || guess)) * 100}
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
            className={styles.greenButton}
          >
            {t9n.playAgain}
          </Button>
        )}
      </Group>
    </Modal>
  );
};

export default StatsModal;
