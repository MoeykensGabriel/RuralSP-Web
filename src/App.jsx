import { Route, Routes } from 'react-router-dom';

import { PATHS } from './routes/paths';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

/**
 * Mapa de rutas de la aplicación.
 *
 * `Layout` es la ruta padre: todo lo que cuelga de ella comparte header y
 * footer automáticamente. Para sumar una página nueva:
 *   1. crear el archivo en `src/pages/`
 *   2. agregar su ruta en `src/routes/paths.js`
 *   3. sumar un <Route> acá y (si va en el menú) un ítem en `config/site.js`
 */
export default function App() {
  return (
    <Routes>
      {/* Ruta padre sin path: aporta el layout, no una URL propia. */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={PATHS.servicios} element={<Servicios />} />
        <Route path={PATHS.nosotros} element={<Nosotros />} />
        <Route path={PATHS.contacto} element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
