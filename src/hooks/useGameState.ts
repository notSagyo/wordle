import { useLocalStorage } from '@mantine/hooks';
import { GameStatus } from '../types';

const useGameState = () => {
  const [currentWord, setCurrentWord] = useLocalStorage<string>({
    key: 'currentWord',
    defaultValue: '',
  });

  const [completedWords, setCompletedWords] = useLocalStorage<string[]>({
    key: 'completedWords',
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

  const [cleanupDate] = useLocalStorage<number>({
    key: 'cleanupDate',
    defaultValue: 1658822682796,
  });

  function cleanup() {
    if (cleanupDate != 1658822682796) playAgain();
  }

  function playAgain() {
    setGameStatus('playing');
    setCompletedWords([]);
    setCurrentWord('');
    setSolution('');
    setTurn(1);
  }

  return {
    currentWord,
    setCurrentWord,
    completedWords,
    setCompletedWords,
    solution,
    setSolution,
    gameStatus,
    setGameStatus,
    playAgain,
    turn,
    setTurn,
    cleanup,
  };
};

export default useGameState;
