/**
 * Rutas de la aplicacion.
 * Se centralizan aca para no repetir strings sueltos por el codigo:
 * si una URL cambia, se cambia en este archivo y se propaga a todos lados.
 */
export const PATHS = {
  home: '/',
  servicios: '/servicios',
  nosotros: '/nosotros',
  contacto: '/contacto',
};

/**
 * Rutas de las secciones con subpaginas (Seguridad fisica, Sectores...).
 * No se escriben a mano: se arman con los slugs de `getSecciones()` en
 * `services/contentService.js`, que es donde vive la lista.
 *
 *   rutaSeccion('sectores')            -> /sectores
 *   rutaItem('sectores', 'eventos')    -> /sectores/eventos
 */
export const rutaSeccion = (slugSeccion) => `/${slugSeccion}`;
export const rutaItem = (slugSeccion, slugItem) => `/${slugSeccion}/${slugItem}`;

export default PATHS;
