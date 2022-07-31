import { Stack, useMantineTheme, Text, Group, ActionIcon } from '@mantine/core';
import { cleanNotifications, showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import useWindow from '../hooks/useWindow';
import { getWord, isValidWord } from '../services/words';
import Keyboard from './Keyboard/Keyboard';
import RowCompleted from './Rows/RowCompleted';
import RowCurrent from './Rows/RowCurrent';
import RowEmpty from './Rows/RowEmpty';
import langJSON from '../assets/languages.json';
import useHistory from '../hooks/useHistory';
import StatsModal from './StatsModal/StatsModal';
import { Refresh } from 'tabler-icons-react';
import useGameState from '../hooks/useGameState';
import translationJSON from '../assets/translation.json';
import useStyles from '../GlobalStyles';

const Wordle = () => {
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
  const { classes: styles } = useStyles();
  const [statsOpened, setStatsOpened] = useState(false);
  const history = useHistory();
  const theme = useMantineTheme();
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
    } else if (currentWord === solution) {
      history.addWin(turn);
      setGameStatus('won');
    } else if (turn === attepmts) {
      history.addLoss();
      setGameStatus('lost');
    }
    setCompletedWords([...completedWords, currentWord]);
    setCurrentWord('');
    setTurn(turn + 1);
  }

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
