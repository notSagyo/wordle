import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  const emptyColor = theme.other.emptyColor;
  const absentColor = theme.other.absentColor;
  const editColor = theme.other.editColor;
  const presentColor = theme.other.yellow;
  const correctColor = theme.other.green;

  return {
    tile: {
      width: 0,
      height: 0,
      padding: theme.fontSizes.xl,
      color: theme.other.foreground,
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
