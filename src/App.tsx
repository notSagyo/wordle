import { ColorScheme, MantineProvider, useMantineTheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Wordle from './components/Wordle';

export default function App() {
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <MantineProvider
      theme={{ colorScheme, other: { tileSpacing: theme.spacing.xs } }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Wordle />
    </MantineProvider>
  );
}
