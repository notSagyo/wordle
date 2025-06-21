import {
  ActionIcon,
  Button,
  Group,
  Image,
  Menu,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useFullscreen, useMediaQuery } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import {
  ChartInfographic,
  ChevronDown,
  Maximize,
  MoonStars,
  Sun,
} from 'tabler-icons-react';
import { useGameContext } from '../../context/GameProvider';
import langJSON from '../../data/languages.json';
import { solutionWords } from '../../data/solutions';
import { AvailableLanguages } from '../../types';
import StatsModal from '../StatsModal/StatsModal';
import useStyles from './SettingsBar.styles';

interface ILanguages {
  language: AvailableLanguages;
  image: string;
}

const languages: ILanguages[] = [];
for (const key in solutionWords) {
  languages.push({
    language: (key as AvailableLanguages) || 'EN',
    image: langJSON?.[key as AvailableLanguages]?.flag || langJSON['EN'].flag,
  });
}

const SettingsBar = () => {
  // Language
  const { gameLanguage, setGameLanguage, resetGame } = useGameContext();
  const [langOpened, setLangOpened] = useState(false);
  const langSelected = useMemo(
    () => languages.find((lang) => lang.language === gameLanguage),
    [gameLanguage]
  );

  // Theme / Mantine
  const [statsOpened, setStatsOpened] = useState<boolean>(false);
  const { toggle: toggleFullscreen } = useFullscreen();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles({ opened: langOpened });
  const theme = useMantineTheme();
  const dark = colorScheme === 'dark';
  const md = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  // ON CHANGE LANGUAGE
  function handleLanguageChange(language: AvailableLanguages) {
    const newLang = languages.find((lang) => lang.language === language);
    if (newLang && langSelected?.language !== language) {
      setGameLanguage(language);
      resetGame();
    }
  }

  // LANGUAGE MENU ITEMS
  const langMenuItems = languages.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={20} height={15} />}
      onClick={() => handleLanguageChange(item.language)}
      key={item.language}
    >
      {item.language}
    </Menu.Item>
  ));

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
          <Menu.Dropdown>{langMenuItems}</Menu.Dropdown>
        </Menu>

        {/* DARK MODE TOGGLE */}
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size="lg"
        >
          {dark ? (
            <Sun color={theme.other.foreground} />
          ) : (
            <MoonStars color={theme.other.foreground} />
          )}
        </ActionIcon>

        {/* OPEN STATS */}
        <ActionIcon
          variant="default"
          onClick={() => setStatsOpened(true)}
          size="lg"
        >
          <ChartInfographic color={theme.other.foreground} />
        </ActionIcon>

        {/* FULL SCREEN */}
        <ActionIcon
          variant="default"
          onClick={toggleFullscreen}
          size="lg"
          ml={'auto'}
        >
          <Maximize color={theme.other.foreground} />
        </ActionIcon>
      </Group>
    </>
  );
};

export default SettingsBar;
