import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => {
  return {
    label: {
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },

    icon: {
      marginLeft: 5,
      transition: 'transform 150ms ease',
      transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
    },
  };
});

export default useStyles;
