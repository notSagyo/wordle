import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => {
  const darkMode = theme.colorScheme === 'dark' ? true : false;

  return {
    control: {
      width: 'fit-content',
      height: 34,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 15px',
      borderRadius: theme.radius.sm,
      border: `1px solid ${
        darkMode ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
      backgroundColor: darkMode
        ? theme.colors.dark[opened ? 4 : 5]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

      '&:hover': {
        backgroundColor: darkMode ? theme.colors.dark[4] : theme.colors.gray[0],
      },
    },

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
