import { createStyles, CSSObject } from '@mantine/core';

interface StyleProps {
  letterCount?: number;
}

const useStyles = createStyles((theme, { letterCount }: StyleProps) => {
  const darkMode = theme.colorScheme === 'dark' ? true : false;
  const desktopGap = 8;
  const mobileGap = 5;
  const keySize = 42;
  const mobileKeyHeight = 64;
  const bigKeyWidth = 64;
  const mobileKeyWidth = `calc((100vw/${letterCount || 10}) - ${mobileGap}px)`;
  const bgc = darkMode ? theme.colors.dark[3] : theme.colors.gray[4];

  const keyStyles: CSSObject = {
    width: keySize,
    height: keySize,
    padding: 0,
    color: darkMode ? theme.white : theme.colors.dark[4],
    backgroundColor: bgc,

    '&:hover': {
      backgroundColor: bgc,
    },

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: mobileKeyWidth,
      height: mobileKeyHeight,
    },
  };

  return {
    key: {
      ...keyStyles,
    },

    bigKey: {
      ...keyStyles,
      width: bigKeyWidth,
      filter: `saturate(0.75)`,

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
        marginBottom: mobileGap,
      },
    },

    keyboardRow: {
      gap: desktopGap,

      [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
        gap: mobileGap,
      },
    },
  };
});

export default useStyles;
