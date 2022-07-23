import words from '../assets/words.json';

export const getWord = async (): Promise<string> => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export const isValidWord = (word: string): boolean => {
  return words.includes(word);
};
