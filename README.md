# Custom language support

### To add a language:

0. Choose a name and USE THE SAME in every file.

1. Add the solutions array to the words object at: `src\assets\words.ts`
   - Example: `{ EN: [], ES: [], CUSTOM: ['FOO', 'BAR']}`
   - Words should be in UPPERCASE!
2. Add the validation words array to: `src\assets\wordsValidation.ts`
   - Same as above. This words won't be solutions but are valid input.

### Optional:

- Add the language to `src\assets\languages.json` to use the following options...
- For a custom flag add the image URL to the flag field (aspect ratio 4:3):
  - Example: `"CUSTOM": { "flag": "url/image.svg" }`
- Change keyboard letters: `"CUSTOM": { "letters": "ABC DEF" }`
  - Use a space to define where a letter row ends.
- Change how many attempts are available: `"CUSTOM": { "attempts": 3 }`
- Add custom translation to the game texts in: `src\assets\translation.json`
