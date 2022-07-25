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
      color: theme.colors.green[6],
    },

    losses: {
      ...numberStyles,
      color: theme.colors.red,
    },

    currentStreak: {
      ...numberStyles,
      color: won ? theme.colors.green[6] : theme.colors.red,
    },

    bestStreak: {
      ...numberStyles,
      color: theme.colors.green[6],
    },
  };
});

export default useStyles;
