import { createStyles, CSSObject } from '@mantine/core';

interface StyleProps {
  lost: boolean;
}

const useStyles = createStyles((theme, { lost }: StyleProps) => {
  const darkMode = theme.colorScheme === 'dark';

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
      color: lost ? theme.colors.red : theme.colors.green[6],
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
      color: lost ? theme.colors.red : theme.colors.green[6],
    },

    bestStreak: {
      ...numberStyles,
      color: theme.colors.green[6],
    },

    playAgainBtn: {
      color: darkMode ? theme.white : theme.black,
      backgroundColor: theme.other.green,

      '&:hover': {
        backgroundColor: theme.fn.darken(theme.other.green, 0.05),
      },
    },
  };
});

export default useStyles;