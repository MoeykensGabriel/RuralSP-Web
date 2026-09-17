import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PATHS, rutaSeccion } from './routes/paths';
import { getSecciones } from './services/contentService';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import SeccionIndice from './pages/SeccionIndice';
import SeccionItem from './pages/SeccionItem';
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
 *
 * Las secciones con subpáginas son la excepción: sus rutas se generan solas
 * a partir de `getSecciones()`, así que agregar una sección o una subpágina
 * no requiere tocar este archivo.
 */
export default function App() {
  return (
    <Routes>
      {/* Ruta padre sin path: aporta el layout, no una URL propia. */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={PATHS.servicios} element={<Servicios />} />

        {/* Una sección genera dos rutas: su índice y sus subpáginas. El
            `:item` es el comodín que cubre todas las subpáginas, presentes
            y futuras, porque la lista vive en `contentService`. */}
        {getSecciones().map((seccion) => (
          <Fragment key={seccion.slug}>
            <Route
              path={rutaSeccion(seccion.slug)}
              element={<SeccionIndice slug={seccion.slug} />}
            />
            <Route
              path={`${rutaSeccion(seccion.slug)}/:item`}
              element={<SeccionItem slug={seccion.slug} />}
            />
          </Fragment>
        ))}

        <Route path={PATHS.nosotros} element={<Nosotros />} />
        <Route path={PATHS.contacto} element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
