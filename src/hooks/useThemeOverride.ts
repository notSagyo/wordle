import {
  ColorScheme,
  MantineThemeOverride,
  useMantineTheme,
} from '@mantine/core';

/** Only call this to override MantineProvider's theme */
const useThemeOverride = (colorScheme: ColorScheme): MantineThemeOverride => {
  const mTheme = useMantineTheme();
  const darkMode = colorScheme === 'dark';

  // Colors
  const foreground = darkMode ? mTheme.white : mTheme.colors.dark[4];
  // Tiles colors
  const green = mTheme.colors.green[darkMode ? 7 : 3];
  const yellow = darkMode ? mTheme.colors.orange[4] : mTheme.colors.yellow[3];
  const editColor = darkMode ? mTheme.colors.dark[3] : mTheme.colors.gray[4];
  const emptyColor = darkMode ? mTheme.colors.dark[9] : mTheme.colors.gray[3];
  const absentColor = darkMode ? mTheme.colors.dark[5] : mTheme.colors.gray[2];

  return {
    other: {
      green,
      yellow,
      editColor,
      emptyColor,
      absentColor,
      foreground,
      tileSpacing: mTheme.spacing.xs,
      black: mTheme.colors.dark[4],
    },
  };
};

export default useThemeOverride;
