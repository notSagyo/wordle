import { createStyles, CSSObject } from '@mantine/core';

interface StyleProps {
  letterCount: number;
}

const useStyles = createStyles(
  (theme, { letterCount: letterCount }: StyleProps) => {
    const desktopGap = 8;
    const mobileGap = 5;
    const keySize = 42;
    const mobileKeyHeight = 64;
    const bigKeyWidth = 64;
    const mobileKeyWidth = `calc((100vw/${letterCount}) - ${mobileGap}px)`;

    const keyStyles: CSSObject = {
      width: keySize,
      height: keySize,
      padding: 0,

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
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

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          width: 'auto',
          height: mobileKeyHeight,
          flexGrow: 1,
          maxWidth: bigKeyWidth,
        },
      },

      keyboard: {
        gap: desktopGap,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          gap: mobileGap,
        },
      },

      keyboardRow: {
        gap: desktopGap,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          gap: mobileGap,
        },
      },
    };
  }
);

export default useStyles;
