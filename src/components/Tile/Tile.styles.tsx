import { createStyles, keyframes } from '@mantine/core';

const useStyles = createStyles((theme) => {
  const pitch = (color: string) =>
    keyframes({
      '0%': {
        transform: 'rotate3d(0, 0, 0)',
        backgroundColor: theme.other.editColor,
      },
      '50%': {
        transform: 'rotate3d(1, 0, 0, 90deg)',
        backgroundColor: theme.other.editColor,
      },
      '51%': { backgroundColor: color },
      '100%': { backgroundColor: color },
    });

  return {
    tile: {
      width: 0,
      height: 0,
      padding: theme.fontSizes.xl,
      color: theme.other.foreground,
      fontWeight: 500,
      fontSize: theme.fontSizes.xl,
    },

    edit: { backgroundColor: theme.other.editColor },
    empty: { backgroundColor: theme.other.emptyColor },
    absent: {
      backgroundColor: theme.other.absentColor,
      animation: `${pitch(theme.other.absentColor)}
        ${theme.other.showDelay}s forwards`,
    },
    present: {
      backgroundColor: theme.other.yellow,
      animation: `${pitch(theme.other.yellow)}
        ${theme.other.showDelay}s forwards`,
    },
    correct: {
      backgroundColor: theme.other.green,
      animation: `${pitch(theme.other.green)}
        ${theme.other.showDelay}s forwards`,
    },
  };
});

export default useStyles;
