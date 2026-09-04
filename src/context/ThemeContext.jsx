import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    localStorage.setItem('vedik_theme', 'dark');
    const root = document.documentElement;
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
  }, []);

  const toggleTheme = () => {
    setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
