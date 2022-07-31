import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useHotkeys, useLocalStorage, useMediaQuery } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import SettingsBar from './components/SettingsBar/SettingsBar';
import Wordle from './components/Wordle';
import useThemeOverride from './hooks/useThemeOverride';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'colorScheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const theme = useMantineTheme();
  const themeOverride = useThemeOverride(colorScheme);
  const md = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          ...themeOverride,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-center" limit={1}>
          <Stack
            sx={{ height: '100%' }}
            justify={md ? 'space-between' : 'center'}
            spacing={theme.spacing.xl}
          >
            <SettingsBar />
            <Wordle />
          </Stack>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
