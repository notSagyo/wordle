import { createStyles, CSSObject } from '@mantine/core';

interface StyleProps {
  won: boolean;
  newStreak: boolean;
}

const useStyles = createStyles((theme, { won, newStreak }: StyleProps) => {
  const darkMode = theme.colorScheme === 'dark' ? true : false;
  const numberStyles: CSSObject = {
    fontWeight: 'bold',
  };

  return {
    root: {
      letterSpacing: 0.15,
      lineHeight: 2,
    },

    solution: {
      ...numberStyles,
      color: won ? theme.colors.green[6] : theme.colors.red,
    },

    wins: {
      ...numberStyles,
      color: darkMode ? theme.colors.green : theme.colors.green,
    },

    losses: {
      ...numberStyles,
      color: darkMode ? theme.colors.red : theme.colors.red,
    },

    currentStreak: {
      ...numberStyles,
      color: newStreak ? theme.colors.green : theme.colors.red,
    },

    bestStreak: {
      ...numberStyles,
      color: darkMode ? theme.colors.green : theme.colors.green,
    },
  };
});

export default useStyles;
