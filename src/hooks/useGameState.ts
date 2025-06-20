import { useLocalStorage } from '@mantine/hooks';
import { AvailableLanguages, GameStatus } from '../types';

// ?TODO: move to context?
const useGameState = () => {
  const [currentWord, setCurrentWord] = useLocalStorage<string>({
    key: 'currentWord',
    defaultValue: '',
  });

  const [guessedWords, setGuessedWords] = useLocalStorage<string[]>({
    key: 'guessedWords',
    defaultValue: [],
  });

  const [solution, setSolution] = useLocalStorage<string>({
    key: 'solution',
    defaultValue: '',
  });

  const [gameStatus, setGameStatus] = useLocalStorage<GameStatus>({
    key: 'gameStatus',
    defaultValue: 'playing',
  });

  const [turn, setTurn] = useLocalStorage<number>({
    key: 'turn',
    defaultValue: 1,
  });

  const [gameLanguage, setGameLanguage] = useLocalStorage<AvailableLanguages>({
    key: 'language',
    defaultValue: 'EN',
  });

  function playAgain() {
    setGameStatus('playing');
    setGuessedWords([]);
    setCurrentWord('');
    setSolution('');
    setTurn(1);
  }

  return {
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
    gameLanguage,
    setGameLanguage,
    playAgain,
  };
};

export default useGameState;
