/**
 * Capa de datos del sitio (boceto).
 *
 * Hoy devuelve datos mock en memoria. Cuando exista un backend o un CMS,
 * se reemplaza el cuerpo de estas funciones por un `fetch` y las páginas
 * siguen funcionando sin cambios: la firma es la misma.
 *
 * Regla: los componentes NUNCA definen contenido, siempre lo piden acá.
 *
 * TODO todo lo de este archivo es texto de relleno. Se reemplaza por el
 * contenido real cuando el cliente lo confirme.
 */

const RELLENO =
  'Texto de ejemplo. Acá va la descripción real cuando la definamos con el cliente.';

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

/** Rubros en los que trabaja la empresa. Grilla de tarjetas en la home. */
export const getSectors = () => [
  { id: 'sc-1', title: 'Sector 01', text: RELLENO },
  { id: 'sc-2', title: 'Sector 02', text: RELLENO },
  { id: 'sc-3', title: 'Sector 03', text: RELLENO },
  { id: 'sc-4', title: 'Sector 04', text: RELLENO },
  { id: 'sc-5', title: 'Sector 05', text: RELLENO },
  { id: 'sc-6', title: 'Sector 06', text: RELLENO },
];

/**
 * Opciones del campo "Servicio de interés" del formulario de contacto.
 * Reemplazar por los servicios reales cuando el cliente los confirme.
 */
export const getContactReasons = () => [
  'Servicio 01',
  'Servicio 02',
  'Servicio 03',
  'Servicio 04',
  'Otra consulta',
];

/** Diferenciales de la empresa. Grilla de tarjetas en la home. */
export const getValues = () => [
  { id: 'vl-1', title: 'Diferencial 01', text: RELLENO },
  { id: 'vl-2', title: 'Diferencial 02', text: RELLENO },
  { id: 'vl-3', title: 'Diferencial 03', text: RELLENO },
  { id: 'vl-4', title: 'Diferencial 04', text: RELLENO },
];
