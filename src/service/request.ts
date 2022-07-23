import wordsJson from '../assets/words.json';

export const getWords = async (): Promise<string[]> => {
  return wordsJson;
};

export const getWord = async (): Promise<string> => {
  const words = await getWords();
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};

export const isValidWord = async (word: string): Promise<boolean> => {
  const words = await getWords();
  return words.includes(word);
};
