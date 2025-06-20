import { createStyles, keyframes } from '@mantine/core';

type StyleProps = {
  animationDelay: number;
  animationDuration: number;
};

const useStyles = createStyles(
  (theme, { animationDelay, animationDuration }: StyleProps) => {
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
        backgroundColor: theme.other.editColor,
        animation: `${pitch(theme.other.absentColor)}
        ${animationDuration}ms forwards`,
        animationDelay: `${animationDelay}ms`,
      },
      present: {
        backgroundColor: theme.other.editColor,
        animation: `${pitch(theme.other.yellow)}
        ${animationDuration}ms forwards`,
        animationDelay: `${animationDelay}ms`,
      },
      correct: {
        backgroundColor: theme.other.editColor,
        animation: `${pitch(theme.other.green)}
        ${animationDuration}ms forwards`,
        animationDelay: `${animationDelay}ms`,
      },
    };
  }
);

export default useStyles;
