import _ from 'lodash';

export const getCorrectLetters = (words: string[], solution: string) => {
  const correctLetters = _.uniq(
    _.flatten(
      words.map((word) =>
        word.split('').filter((letter, i) => letter === solution[i])
      )
    )
  );

  return correctLetters;
};

export const getPresentLetters = (words: string[], solution: string) => {
  const presentLetters = _.difference(
    words
      .join('')
      .split('')
      .filter((letter) => solution.includes(letter)),
    getCorrectLetters(words, solution)
  );

  return presentLetters;
};

export const getAbsentLetters = (words: string[], solution: string) => {
  const absentLetters = words
    .join('')
    .split('')
    .filter((letter) => !solution.includes(letter));

  return absentLetters;
};
