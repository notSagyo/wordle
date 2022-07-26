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
import { LanguageContextProvider } from './context/LanguageContext';

export default function App() {
  const theme = useMantineTheme();
  const md = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, other: { tileSpacing: theme.spacing.xs } }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-center" limit={1}>
          <Stack
            sx={{ height: '100%' }}
            justify={md ? 'space-between' : 'center'}
            spacing={theme.spacing.xl}
          >
            <LanguageContextProvider>
              <SettingsBar />
              <Wordle />
            </LanguageContextProvider>
          </Stack>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
