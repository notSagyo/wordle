import { useLocalStorage } from '@mantine/hooks';

const useHistory = () => {
  const [streak, setStreak] = useLocalStorage<number>({
    key: 'streak',
    defaultValue: 0,
  });

  const [maxStreak, setMaxStreak] = useLocalStorage<number>({
    key: 'maxStreak',
    defaultValue: 0,
  });

  const [wins, setWins] = useLocalStorage<number>({
    key: 'wins',
    defaultValue: 0,
  });

  const [losses, setLoses] = useLocalStorage<number>({
    key: 'loses',
    defaultValue: 0,
  });

  const [guessDistribution, setGuessDistribution] = useLocalStorage<
    [number, number, number, number, number, number]
  >({
    key: 'guessDistribution',
    defaultValue: [0, 0, 0, 0, 0, 0],
  });

  function addWin(turn: number) {
    const newStreak = streak + 1;
    const newGuessDistribution = guessDistribution;
    newGuessDistribution[turn - 1] += 1;

    setWins(wins + 1);
    setStreak(newStreak);
    setGuessDistribution(newGuessDistribution);
    if (newStreak >= maxStreak) setMaxStreak(newStreak);
  }

  function addLoss() {
    setLoses(losses + 1);
    setStreak(0);
  }

  function resetHistory() {
    setStreak(0);
    setMaxStreak(0);
    setWins(0);
    setLoses(0);
    setGuessDistribution([0, 0, 0, 0, 0, 0]);
  }

  return {
    streak,
    maxStreak,
    addWin,
    addLoss,
    wins,
    losses,
    resetHistory,
    guessDistribution,
    setGuessDistribution,
  };
};

export default useHistory;
