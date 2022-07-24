import { words as validationList } from '../assets/wordsValidation';
import { words as wordList } from '../assets/words';

export const getWords = async (): Promise<string[]> => {
  return wordList;
};

export const getWord = async (): Promise<string> => {
  const words = (await getWords()).filter(
    (word) => word.length === 5 && /^[a-zA-Z]+$/.test(word)
  );
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};

export const isValidWord = async (word: string): Promise<boolean> => {
  return validationList.includes(word);
};
