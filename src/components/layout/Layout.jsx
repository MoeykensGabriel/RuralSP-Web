import { Outlet } from 'react-router-dom';

import useScrollToTop from '../../hooks/useScrollToTop';
import Header from './Header';
import Footer from './Footer';

/**
 * Estructura base compartida por todas las páginas.
 *
 * Se monta como ruta padre en `App.jsx`: cada página se renderiza en el
 * <Outlet />, sin repetir header ni footer en ningún archivo.
 */
export default function Layout() {
  useScrollToTop();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Solo aparece al navegar con teclado (Tab desde el inicio) */}
      <a
        className="absolute -top-24 left-5 z-200 rounded-lg bg-inverse-bg px-4 py-3 font-semibold text-inverse-fg transition-[top] focus-visible:top-3"
        href="#contenido"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
