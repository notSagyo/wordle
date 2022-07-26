import { createStyles, CSSObject } from '@mantine/core';

interface StyleProps {
  letterCount?: number;
}

const useStyles = createStyles((theme, { letterCount }: StyleProps) => {
  const desktopGap = 8;
  const mobileGap = 5;
  const keySize = 42;
  const mobileKeyHeight = 64;
  const bigKeyWidth = 64;
  const mobileKeyWidth = `calc((100vw/${letterCount || 10}) - ${mobileGap}px)`;
  const bgc = theme.other.editColor;

  const keyStyles: CSSObject = {
    width: keySize,
    height: keySize,
    padding: 0,
    color: theme.other.foreground,
    backgroundColor: bgc,

    '&:hover': { backgroundColor: bgc },

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: mobileKeyWidth,
      height: mobileKeyHeight,
    },
  };

  return {
    key: { ...keyStyles },

    bigKey: {
      ...keyStyles,
      width: bigKeyWidth,

      [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
        width: 'auto',
        height: mobileKeyHeight,
        flexGrow: 1,
        '&:first-of-type': { marginLeft: mobileGap * 0.5 },
        '&:last-of-type': { marginRight: mobileGap * 0.5 },
      },
    },

    keyboard: {
      gap: desktopGap,
      marginTop: theme.spacing.xl,
      marginBottom: 'auto',

      [`@media (max-width: ${theme.breakpoints.md}px)`]: {
        marginBottom: mobileGap,
      },

      [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
        gap: mobileGap,
        marginTop: mobileGap,
      },
    },

    keyboardRow: {
      gap: desktopGap,
      [`@media (max-width: ${theme.breakpoints.xs}px)`]: { gap: mobileGap },
    },

    edit: {
      backgroundColor: theme.other.editColor,
      '&:hover': { backgroundColor: theme.other.editColor },
    },

    empty: {
      backgroundColor: theme.other.emptyColor,
      '&:hover': { backgroundColor: theme.other.emptyColor },
    },

    absent: {
      backgroundColor: theme.other.absentColor,
      '&:hover': { backgroundColor: theme.other.absentColor },
    },

    present: {
      backgroundColor: theme.other.yellow,
      '&:hover': { backgroundColor: theme.other.yellow },
    },

    correct: {
      backgroundColor: theme.other.green,
      '&:hover': { backgroundColor: theme.other.green },
    },
  };
});

export default useStyles;
