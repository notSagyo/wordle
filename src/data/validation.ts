import { validationEN } from './validation-EN';
import { validationES } from './validation-ES';
import { wordsLeague } from './words-league';

export const validationWords = {
  EN: validationEN,
  ES: validationES,

  // Sample custom language
  LEAGUE: wordsLeague,
};
