import { ActionIcon, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { cleanNotifications, showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { Refresh } from 'tabler-icons-react';
import langJSON from '../data/languages.json';
import translationJSON from '../data/translation.json';
import useStyles from '../GlobalStyles';
import useGameState from '../hooks/useGameState';
import useHistory from '../hooks/useHistory';
import useWindow from '../hooks/useWindow';
import { getWord, isValidWord } from '../services/words';
import Keyboard from './Keyboard/Keyboard';
import RowCompleted from './Rows/RowCompleted';
import RowCurrent from './Rows/RowCurrent';
import RowEmpty from './Rows/RowEmpty';
import StatsModal from './StatsModal/StatsModal';

// TODO: Split responsibilities
const Wordle = () => {
  // GAME HOOKS
  const {
    currentWord,
    setCurrentWord,
    completedWords,
    setCompletedWords,
    solution,
    setSolution,
    gameStatus,
    setGameStatus,
    turn,
    setTurn,
    gameLanguage: lang,
  } = useGameState();
  const history = useHistory();

  // MANTINE
  const [statsOpened, setStatsOpened] = useState(false);
  const { classes: styles } = useStyles();
  const theme = useMantineTheme();

  // TRANSLATION
  const transl = translationJSON?.[lang] || translationJSON['EN'];
  const letters = langJSON?.[lang]?.letters || langJSON['EN'].letters;
  const attepmts = langJSON?.[lang]?.attempts || langJSON['EN'].attempts;

  useWindow('keydown', handleKeyDown);
  function handleKeyDown(event: KeyboardEvent) {
    if (
      gameStatus !== 'playing' ||
      event.shiftKey ||
      event.ctrlKey ||
      event.altKey
    )
      return;
    onKeyPressed(event.key);
  }

  function onKeyPressed(key: string) {
    key = key.toUpperCase();
    if (key === 'ESCAPE') onEscape();
    else if (key === 'BACKSPACE' && currentWord.length > 0) onBackspace();
    else if (key === 'ENTER' && currentWord.length === solution.length)
      onEnter();
    else if (letters.includes(key) && currentWord.length < solution.length)
      onLetter(key);
  }

  function onEscape() {
    setCurrentWord('');
  }

  function onBackspace() {
    setCurrentWord(currentWord.slice(0, -1));
  }

  function onLetter(letter: string) {
    const newWord = currentWord + letter;
    setCurrentWord(newWord.toUpperCase());
  }

  async function onEnter() {
    const isValid = await isValidWord(currentWord, lang);
    if (!isValid) {
      cleanNotifications();
      showNotification({
        title: transl.wordNotFound,
        message: transl.wordNotFoundDesc,
        color: 'red',
        disallowClose: true,
        autoClose: 4000,
      });
      return;
    }

    if (currentWord === solution) {
      setTimeout(() => {
        history.addWin(turn);
        setGameStatus('won');
      }, theme.other.showDelay * 1000 + 500);
    } else if (turn === attepmts) {
      setTimeout(() => {
        history.addLoss();
        setGameStatus('lost');
      }, theme.other.showDelay * 1000 + 500);
    }

    setCompletedWords([...completedWords, currentWord]);
    setCurrentWord('');
    setTurn(turn + 1);
  }

  // ON GAME STATUS CHANGE
  useEffect(() => {
    if (gameStatus !== 'playing') {
      setStatsOpened(true);
      return;
    }

    if (completedWords.length > 0) {
      setCompletedWords(completedWords);
      setTurn(completedWords.length + 1);
    }

    if (solution === '') {
      getWord(lang).then((w) => {
        setSolution(w);
      });
    }
  }, [gameStatus, solution]);

  return (
    <>
      <StatsModal opened={statsOpened} setOpened={setStatsOpened} />
      <Stack
        justify={'center'}
        align={'center'}
        spacing={theme.other.tileSpacing}
      >
        {/* COMPLETED WORDS */}
        {completedWords.map((word, i) => (
          <RowCompleted key={i} word={word} solution={solution} />
        ))}

        {/* CURRENT WORD */}
        {turn <= attepmts && (
          <RowCurrent word={currentWord} solution={solution} />
        )}

        {/* EMPTY ROWS */}
        {turn < attepmts &&
          Array.from(Array(attepmts - turn)).map((_, i) => (
            <RowEmpty solution={solution} key={i} />
          ))}

        {/* SOLUTION */}
        {gameStatus !== 'playing' && (
          <Group spacing={'xs'}>
            <ActionIcon
              variant="filled"
              className={styles.greenButton}
              onClick={() => setStatsOpened(true)}
              size="lg"
            >
              <Refresh />
            </ActionIcon>
            <Text size={'xl'}>
              {transl.answer}: <b>{solution}</b>
            </Text>
          </Group>
        )}
      </Stack>

      <Keyboard
        letters={letters}
        onKeyPressed={onKeyPressed}
        completedWords={completedWords}
        solution={solution}
      />
    </>
  );
};

export default Wordle;
