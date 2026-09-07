import { createContext } from 'react';

/**
 * Contexto del tema (claro / oscuro).
 *
 * Vive en su propio archivo .js —separado del provider— para que
 * `ThemeProvider.jsx` exporte únicamente un componente y el Fast Refresh
 * de Vite siga funcionando (regla `react-refresh/only-export-components`).
 *
 * No se consume directo: usá el hook `useTheme()`.
 */
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export default ThemeContext;
