import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lleva la vista al tope cada vez que cambia la ruta.
 * Sin esto, al navegar de una página larga a otra el usuario aterriza
 * a mitad de la pantalla. Se llama una sola vez, desde el Layout.
 */
export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
}
