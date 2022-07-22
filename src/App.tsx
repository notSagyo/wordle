import { ColorScheme, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <MantineProvider
      theme={{ colorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
    </MantineProvider>
  );
}
