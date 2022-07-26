import { Stack, useMantineTheme, Text, Group, ActionIcon } from '@mantine/core';
import { cleanNotifications, showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import useWindow from '../hooks/useWindow';
import { getWord, isValidWord } from '../service/request';
import Keyboard from './Keyboard/Keyboard';
import RowCompleted from './Rows/RowCompleted';
import RowCurrent from './Rows/RowCurrent';
import RowEmpty from './Rows/RowEmpty';
import letters from '../assets/letters.json';
import useHistory from '../hooks/useHistory';
import StatsModal from './StatsModal';
import { Refresh } from 'tabler-icons-react';
import useGameState from '../hooks/useGameState';

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
    cleanup,
  } = useGameState();
  const history = useHistory();
  const theme = useMantineTheme();
  const [statsOpened, setStatsOpened] = useState(false);
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
    else if (/^[a-z]{1}$/i.test(key) && currentWord.length < solution.length)
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
    const isValid = await isValidWord(currentWord);
    if (!isValid) {
      cleanNotifications();
      showNotification({
        title: 'Invalid word',
        message:
          "I'm not saying it doesn't exist... but it's not in our dictionary.",
        color: 'red',
        disallowClose: true,
        autoClose: 4000,
      });
      return;
    } else if (currentWord === solution) {
      history.addWin();
      setGameStatus('won');
    } else if (turn === 6) {
      history.addLoss();
      setGameStatus('lost');
    }
    setCompletedWords([...completedWords, currentWord]);
    setCurrentWord('');
    setTurn(turn + 1);
  }

  useEffect(() => {
    cleanup();
    if (gameStatus !== 'playing') {
      setStatsOpened(true);
      return;
    }

    if (completedWords.length > 0) {
      setCompletedWords(completedWords);
      setTurn(completedWords.length + 1);
    }

    if (solution === '') {
      getWord().then((w) => {
        setSolution(w);
      });
    }
  }, [gameStatus]);

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
        {turn <= 6 && <RowCurrent word={currentWord} solution={solution} />}

        {/* EMPTY ROWS */}
        {turn < 6 &&
          Array.from(Array(6 - turn)).map((_, i) => (
            <RowEmpty solution={solution} key={i} />
          ))}

        {/* SOLUTION */}
        {gameStatus !== 'playing' && (
          <Group spacing={'xs'}>
            <ActionIcon
              variant="filled"
              color={'green'}
              onClick={() => setStatsOpened(true)}
              size="lg"
            >
              <Refresh color={theme.white} />
            </ActionIcon>
            <Text size={'xl'}>
              ANSWER: <b>{solution}</b>
            </Text>
          </Group>
        )}
      </Stack>

      <Keyboard
        letters={letters.english}
        onKeyPressed={onKeyPressed}
        completedWords={completedWords}
        solution={solution}
      />
    </>
  );
};

export default Wordle;
