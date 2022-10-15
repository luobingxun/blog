import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export const ThemeContext = createContext<{
  changeTheme?: () => void;
  isDark?: boolean;
}>({});

enum THEME {
  LIGHT = 'light',
  DARK = 'dark'
}

const ThemeProvider: React.FC<{
  chidlren: ReactNode;
}> = ({ chidlren }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const setTheme = useCallback((mode: THEME) => {
    const html = document.querySelector('html'),
      isDarkMode = mode === THEME.DARK,
      addThemeKey = isDarkMode ? THEME.DARK : THEME.LIGHT,
      removeThemeKey = isDarkMode ? THEME.LIGHT : THEME.DARK;

    html.classList.remove(removeThemeKey);
    html.classList.add(addThemeKey);
    localStorage.removeItem(removeThemeKey);
    localStorage.setItem(addThemeKey, JSON.stringify(true));
    setIsDark(isDarkMode);
  }, []);

  const changeTheme = useCallback(() => {
    setTheme(!isDark ? THEME.DARK : THEME.LIGHT);
  }, [isDark]);

  useEffect(() => {
    setTheme(localStorage.getItem(THEME.DARK) ? THEME.DARK : THEME.LIGHT);
  }, []);

  return <ThemeContext.Provider value={{ changeTheme, isDark }}>{chidlren}</ThemeContext.Provider>;
};

export default ThemeProvider;
