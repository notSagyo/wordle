import {
  ActionIcon,
  Button,
  Group,
  Image,
  Menu,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
  ChartInfographic,
  ChevronDown,
  MoonStars,
  Sun,
} from 'tabler-icons-react';
import useStyles from './SettingsBar.styles';
import StatsModal from '../StatsModal/StatsModal';
import { AvailableLanguages } from '../../types';
import useGameState from '../../hooks/useGameState';
import langJSON from '../../assets/languages.json';
import { solutionWords } from '../../assets/solutions';

interface LanguagesInterface {
  language: AvailableLanguages;
  image: string;
}

const languages: LanguagesInterface[] = [];
for (const key in solutionWords) {
  languages.push({
    language: (key as AvailableLanguages) || 'EN',
    image: langJSON?.[key as AvailableLanguages]?.flag || langJSON['EN'].flag,
  });
}

const SettingsBar = () => {
  const { gameLanguage, setGameLanguage, playAgain } = useGameState();
  const [statsOpened, setStatsOpened] = useState<boolean>(false);
  const [langSelected, setLangSelected] = useState(
    languages.find((lang) => lang.language === gameLanguage)
  );
  const [langOpened, setLangOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles({ opened: langOpened });
  const theme = useMantineTheme();

  const dark = colorScheme === 'dark';
  const md = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const langItems = languages.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={20} height={15} />}
      onClick={() => setGameLanguage(item.language)}
      key={item.language}
    >
      {item.language}
    </Menu.Item>
  ));

  useEffect(() => {
    const newLang = languages.find((lang) => lang.language === gameLanguage);
    if (newLang && langSelected?.language !== gameLanguage) {
      setLangSelected(newLang);
      playAgain();
    }
  }, [gameLanguage]);

  return (
    <>
      <StatsModal opened={statsOpened} setOpened={setStatsOpened} />
      <Group p={theme.spacing.md} sx={{ marginBottom: !md ? 'auto' : '' }}>
        {/* LANGUAGE SELECT */}
        <Menu
          opened={langOpened}
          onChange={setLangOpened}
          position="bottom-start"
          trigger="hover"
          width={'fit-content'}
        >
          <Menu.Target>
            <Button variant="default">
              <Group spacing="xs">
                <Image src={langSelected?.image} width={20} height={15} />
                <span className={classes.label}>{langSelected?.language}</span>
              </Group>
              <ChevronDown size={16} className={classes.icon} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>{langItems}</Menu.Dropdown>
        </Menu>

        {/* DARK MODE TOGGLE */}
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size="lg"
        >
          {dark ? (
            <Sun color={theme.white} />
          ) : (
            <MoonStars color={theme.colors.dark[4]} />
          )}
        </ActionIcon>

        {/* OPEN STATS */}
        <ActionIcon
          variant="default"
          onClick={() => setStatsOpened(true)}
          size="lg"
        >
          <ChartInfographic color={dark ? theme.white : theme.colors.dark[4]} />
        </ActionIcon>
      </Group>
    </>
  );
};

export default SettingsBar;
