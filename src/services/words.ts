import { validationWords } from '../assets/validation';
import { solutionWords } from '../assets/solutions';
import { AvailableLanguages } from '../types';

//* Keeping everything async in case I decide to fetch the data from an API
export const getWords = async (
  language: AvailableLanguages = 'EN'
): Promise<string[]> => {
  const langWords = solutionWords[language];
  return langWords;
};

export const getWord = async (
  language: AvailableLanguages = 'EN'
): Promise<string> => {
  const words = await getWords(language);
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};

export const isValidWord = async (
  word: string,
  language: AvailableLanguages = 'EN'
): Promise<boolean> => {
  const isValidWord = validationWords[language].includes(word);
  return isValidWord;
};
