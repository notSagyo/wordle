import { useLocalStorage } from '@mantine/hooks';

const useHistory = () => {
  const [streak, setStreak] = useLocalStorage({
    key: 'streak',
    defaultValue: 0,
  });

  const [maxStreak, setMaxStreak] = useLocalStorage({
    key: 'maxStreak',
    defaultValue: 0,
  });

  const [wins, setWins] = useLocalStorage({
    key: 'wins',
    defaultValue: 0,
  });

  const [losses, setLoses] = useLocalStorage({
    key: 'loses',
    defaultValue: 0,
  });

  function addWin() {
    const newStreak = streak + 1;
    setWins(wins + 1);
    setStreak(newStreak);
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
  }

  return { streak, maxStreak, addWin, addLoss, wins, losses, resetHistory };
};

export default useHistory;
