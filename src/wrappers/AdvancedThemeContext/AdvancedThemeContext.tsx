import { createContext, useContext, useEffect, useState } from 'react';

interface AdvancedThemeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const AdvancedThemeContext = createContext<
  AdvancedThemeContextProps | undefined
>(undefined);

const AdvancedThemeProvider = ({ children }) => {
  // to change default, false is light, true is dark
  // also change gatsby-ssr.tsx
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem('isDarkMode', JSON.stringify(newDarkModeState));
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <AdvancedThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </AdvancedThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(AdvancedThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { AdvancedThemeProvider, useTheme };
