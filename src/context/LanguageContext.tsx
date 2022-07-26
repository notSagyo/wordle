import { createContext, HtmlHTMLAttributes, useContext, useState } from 'react';

export type availableLanguages = 'EN' | 'ES';

// TODO: remove any
const LanguageContext = createContext<any>({});
export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageContextProvider = ({
  children,
}: HtmlHTMLAttributes<HTMLElement>) => {
  const [language, setLanguage] = useState<availableLanguages>('EN');

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
