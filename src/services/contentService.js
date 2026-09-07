/**
 * Capa de datos del sitio (boceto).
 *
 * Hoy devuelve datos mock en memoria. Cuando exista un backend o un CMS,
 * se reemplaza el cuerpo de estas funciones por un `fetch` y las páginas
 * siguen funcionando sin cambios: la firma es la misma.
 *
 * Regla: los componentes NUNCA definen contenido, siempre lo piden acá.
 */

/**
 * Empresas con las que trabaja el cliente (carrusel de la home).
 *
 * PARA CARGAR LOS LOGOS REALES:
 *   1. guardar los archivos en `public/logos/` (SVG o PNG con fondo transparente)
 *   2. reemplazar `logo: null` por `logo: '/logos/nombre-del-archivo.svg'`
 *   3. poner el nombre real de la empresa en `name` (se usa como texto alternativo)
 *
 * Mientras `logo` sea null, el carrusel muestra un recuadro punteado
 * con el nombre: así se ve el espacio que va a ocupar cada logo.
 */
export const getPartners = () => [
  { id: 'pt-1', name: 'Empresa 01', logo: null },
  { id: 'pt-2', name: 'Empresa 02', logo: null },
  { id: 'pt-3', name: 'Empresa 03', logo: null },
  { id: 'pt-4', name: 'Empresa 04', logo: null },
  { id: 'pt-5', name: 'Empresa 05', logo: null },
  { id: 'pt-6', name: 'Empresa 06', logo: null },
];
