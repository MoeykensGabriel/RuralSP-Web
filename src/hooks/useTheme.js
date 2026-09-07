import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';

/**
 * Acceso al tema activo.
 * @returns {{ theme: 'light' | 'dark', toggleTheme: () => void }}
 */
export default function useTheme() {
  return useContext(ThemeContext);
}
