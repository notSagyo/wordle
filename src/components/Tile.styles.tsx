import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  const darkMode = theme.colorScheme === 'dark' ? true : false;

  return {
    tile: {
      backgroundColor: darkMode ? theme.colors.dark[6] : theme.colors.gray[2],
      width: 0,
      height: 0,
      padding: theme.fontSizes.xl,
      color: darkMode ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.xl,
    },

    edit: {
      backgroundColor: darkMode ? theme.colors.dark[2] : theme.colors.gray[5],
    },

    empty: {
      backgroundColor: darkMode ? theme.colors.dark[9] : theme.colors.gray[2],
    },

    absent: {
      backgroundColor: darkMode ? theme.colors.dark[4] : theme.colors.gray[4],
    },

    present: {
      backgroundColor: darkMode
        ? theme.colors.orange[4]
        : theme.colors.yellow[5],
    },

    correct: {
      backgroundColor: darkMode ? theme.colors.green[7] : theme.colors.green[5],
    },
  };
});

export default useStyles;
