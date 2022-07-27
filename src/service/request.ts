import { words as validationListEN } from '../assets/wordsValidation';
import { words as validationListES } from '../assets/wordsValidationES';
import { words as wordListEN } from '../assets/words';
import { words as wordListES } from '../assets/wordsES';
import { AvailableLanguages } from '../types';

export const getWords = async (
  language: AvailableLanguages = 'EN'
): Promise<string[]> => {
  let words: string[] = [];
  if (language === 'EN') words = wordListEN;
  else if (language === 'ES') words = wordListES;
  return words;
};

export const getWord = async (
  language: AvailableLanguages = 'EN'
): Promise<string> => {
  const words = (await getWords(language)).filter(
    (word) => word.length === 5 && /^[a-zñ]+$/i.test(word)
  );
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};

export const isValidWord = async (
  word: string,
  language: AvailableLanguages = 'EN'
): Promise<boolean> => {
  let isValidWord = false;

  if (language === 'EN') isValidWord = validationListEN.includes(word);
  else if (language === 'ES') isValidWord = validationListES.includes(word);
  return isValidWord;
};
