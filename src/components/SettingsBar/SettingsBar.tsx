import {
  ActionIcon,
  Group,
  Image,
  Menu,
  UnstyledButton,
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
import {
  availableLanguages,
  useLanguageContext,
} from '../../context/LanguageContext';
import flags from '../../assets/flags.json';
import useStyles from './SettingsBar.styles';
import StatsModal from '../StatsModal';

interface LanguagesInterface {
  language: availableLanguages;
  image: string;
}

const languages: LanguagesInterface[] = [
  {
    language: 'EN',
    image: flags.urlEn,
  },
  {
    language: 'ES',
    image: flags.urlEs,
  },
];

const SettingsBar = () => {
  const [statsOpened, setStatsOpened] = useState<boolean>(false);
  const [langSelected, setLangSelected] = useState(languages[0]);
  const [langOpened, setLangOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { language, setLanguage } = useLanguageContext();
  const { classes } = useStyles({ opened: langOpened });
  const theme = useMantineTheme();

  const dark = colorScheme === 'dark';
  const md = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const langItems = languages.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={20} height={15} />}
      onClick={() => setLanguage(item.language)}
      key={item.language}
    >
      {item.language}
    </Menu.Item>
  ));

  useEffect(() => {
    const newLang = languages.find((lang) => lang.language === language);
    newLang && setLangSelected(newLang);
  }, [language]);

  return (
    <>
      <StatsModal opened={statsOpened} setOpened={setStatsOpened} />
      <Group p={theme.spacing.md} sx={{ marginBottom: !md ? 'auto' : '' }}>
        {/* LANGUAGE SELECT */}
        <Menu
          onOpen={() => setLangOpened(true)}
          onClose={() => setLangOpened(false)}
          styles={{ body: { width: 100 } }}
          control={
            <UnstyledButton className={classes.control}>
              <Group spacing="xs">
                <Image src={langSelected.image} width={20} height={15} />
                <span className={classes.label}>{langSelected.language}</span>
              </Group>
              <ChevronDown size={16} className={classes.icon} />
            </UnstyledButton>
          }
        >
          {langItems}
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
