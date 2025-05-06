import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
export const ThemeContext = createContext();

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  // Verificar si hay una preferencia guardada en localStorage
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (typeof storedPrefs === 'string') {
        return storedPrefs;
      }
    }

    // Siempre iniciar con modo claro por defecto, ignorando preferencias del sistema
    return 'light';
  };

  // Estado para el tema actual
  const [theme, setTheme] = useState(getInitialTheme);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Efecto para aplicar el tema al documento HTML
  useEffect(() => {
    const root = window.document.documentElement;

    // Eliminar la clase anterior
    root.classList.remove('light', 'dark');

    // Añadir la nueva clase
    root.classList.add(theme);

    // Guardar la preferencia en localStorage
    localStorage.setItem('color-theme', theme);
  }, [theme]);

  // Efecto adicional para asegurar que se inicie con modo claro
  useEffect(() => {
    // Al montar el componente, forzar el tema claro si es la primera visita
    if (!localStorage.getItem('color-theme')) {
      setTheme('light');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};
