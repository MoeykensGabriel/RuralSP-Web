/**
 * Rutas de la aplicacion.
 * Se centralizan aca para no repetir strings sueltos por el codigo:
 * si una URL cambia, se cambia en este archivo y se propaga a todos lados.
 */
export const PATHS = {
  home: '/',
  servicios: '/servicios',
  sectores: '/sectores',
  nosotros: '/nosotros',
  contacto: '/contacto',
};

/**
 * Ruta de un sector puntual: /sectores/eventos, /sectores/fabricas, etc.
 * El `slug` sale de `getSectores()` en `services/contentService.js`.
 */
export const rutaSector = (slug) => `${PATHS.sectores}/${slug}`;

export default PATHS;
