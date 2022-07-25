import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  const darkMode = theme.colorScheme === 'dark' ? true : false;
  const emptyColor = darkMode ? theme.colors.dark[9] : theme.colors.gray[3];
  const absentColor = darkMode ? theme.colors.dark[5] : theme.colors.gray[2];
  const editColor = darkMode ? theme.colors.dark[3] : theme.colors.gray[4];
  const presentColor = darkMode
    ? theme.colors.orange[4]
    : theme.colors.yellow[3];
  const correctColor = darkMode ? theme.colors.green[7] : theme.colors.green[3];

  return {
    tile: {
      width: 0,
      height: 0,
      padding: theme.fontSizes.xl,
      color: darkMode ? theme.white : theme.colors.dark[4],
      fontWeight: 500,
      fontSize: theme.fontSizes.xl,
    },

    edit: {
      backgroundColor: editColor,
      '&:hover': { backgroundColor: editColor },
    },

    empty: {
      backgroundColor: emptyColor,
      '&:hover': { backgroundColor: emptyColor },
    },

    absent: {
      backgroundColor: absentColor,
      '&:hover': { backgroundColor: absentColor },
    },

    present: {
      backgroundColor: presentColor,
      '&:hover': { backgroundColor: presentColor },
    },

    correct: {
      backgroundColor: correctColor,
      '&:hover': { backgroundColor: correctColor },
    },
  };
});

export default useStyles;
