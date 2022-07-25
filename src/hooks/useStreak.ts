import { useLocalStorage } from '@mantine/hooks';

const useStreak = () => {
  const [streak, setStreak] = useLocalStorage({
    key: 'streak',
    defaultValue: 0,
  });

  function win() {
    setStreak(streak + 1);
  }

  function lose() {
    setStreak(0);
  }

  return { streak, win, lose };
};

export default useStreak;
