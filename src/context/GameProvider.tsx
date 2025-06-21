import { useLocalStorage } from '@mantine/hooks';
import { createContext, useContext, useEffect } from 'react';
import { AvailableLanguages, GameStatus } from '../types';

type GameProviderProps = {
  ready: boolean;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  currentWord: string;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
  guessedWords: string[];
  setGuessedWords: React.Dispatch<React.SetStateAction<string[]>>;
  solution: string;
  setSolution: React.Dispatch<React.SetStateAction<string>>;
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  turn: number;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  gameLanguage: AvailableLanguages;
  setGameLanguage: React.Dispatch<React.SetStateAction<AvailableLanguages>>;
  resetGame: () => void;
};

export const GameContext = createContext<
  Record<string, never> | GameProviderProps
>({});
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({
  children,
}: React.HTMLAttributes<HTMLElement>) => {
  const [ready, setReady] = useLocalStorage<boolean>({
    key: 'ready',
    defaultValue: false,
  });

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

  function resetGame() {
    setGameStatus('playing');
    setGuessedWords([]);
    setCurrentWord('');
    setSolution('');
    setTurn(1);
  }

  useEffect(() => {
    if (!ready) setReady(true);
  }, []);

  return (
    <GameContext.Provider
      value={{
        ready,
        setReady,
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
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
