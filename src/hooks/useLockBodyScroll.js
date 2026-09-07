import { useEffect } from 'react';

/**
 * Bloquea el scroll del body mientras `locked` sea true.
 * Se usa con el menú mobile abierto, para que el fondo no se mueva.
 *
 * @param {boolean} locked
 */
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
