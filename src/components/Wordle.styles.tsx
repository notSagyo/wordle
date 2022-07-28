import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  const darkMode = theme.colorScheme === 'dark' ? true : false;

  return {
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
