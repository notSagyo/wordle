import { wordsValidation } from '../assets/wordsValidation';
import { words } from '../assets/words';
import { AvailableLanguages } from '../types';

export const getWords = async (
  language: AvailableLanguages = 'EN'
): Promise<string[]> => {
  const langWords = words[language];
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
  const isValidWord = wordsValidation[language].includes(word);
  return isValidWord;
};
