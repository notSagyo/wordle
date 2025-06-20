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
    guessedWords,
    setGuessedWords,
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
  const t9n = translationJSON?.[lang] || translationJSON['EN'];
  const letters = langJSON?.[lang]?.letters || langJSON['EN'].letters;
  const attempts = langJSON?.[lang]?.attempts || langJSON['EN'].attempts;

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
        title: t9n.wordNotFound,
        message: t9n.wordNotFoundDesc,
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
      }, theme.other.animationDuration + 500);
    } else if (turn === attempts) {
      setTimeout(() => {
        history.addLoss();
        setGameStatus('lost');
      }, theme.other.animationDuration + 500);
    }

    setGuessedWords([...guessedWords, currentWord]);
    setCurrentWord('');
    setTurn(turn + 1);
  }

  // ON GAME STATUS CHANGE
  useEffect(() => {
    if (gameStatus !== 'playing') {
      setStatsOpened(true);
      return;
    }

    if (guessedWords.length > 0) {
      setGuessedWords(guessedWords);
      setTurn(guessedWords.length + 1);
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
        {/* GUESSED WORDS */}
        {guessedWords.map((word, i) => (
          <RowCompleted key={i} guess={word} solution={solution} />
        ))}

        {/* CURRENT WORD */}
        {turn <= attempts && (
          <RowCurrent guess={currentWord} solution={solution} />
        )}

        {/* EMPTY ROWS */}
        {turn < attempts &&
          Array.from(Array(attempts - turn)).map((_, i) => (
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
              {t9n.answer}: <b>{solution}</b>
            </Text>
          </Group>
        )}
      </Stack>

      <Keyboard
        key={lang}
        letters={letters}
        onKeyPressed={onKeyPressed}
        guessedWords={guessedWords}
        solution={solution}
        gameStatus={gameStatus}
      />
    </>
  );
};

export default Wordle;
