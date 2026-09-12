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
/**
 * Todos los archivos están recortados al borde de la marca, con el mismo
 * margen proporcional y 256px de alto — el doble de la tarjeta, que es lo
 * que necesita una pantalla retina. Por eso no hace falta ajustar tamaños
 * desde acá: el carrusel los mete a todos en una caja del mismo tamaño.
 *
 * TODO faltan los nombres reales de tres marcas. Los archivos son isotipos
 * sin texto, así que el nombre no se puede deducir del logo. Estos textos
 * los lee un lector de pantalla y los indexa Google, así que conviene
 * corregirlos antes de publicar.
 */
export const getPartners = () => [
  { id: 'pt-1', name: 'Expreso San José', logo: '/logos/expreso-san-jose.png' },
  { id: 'pt-2', name: 'Zingaras', logo: '/logos/zingaras.png' },
  { id: 'pt-3', name: 'Audi Hnos.', logo: '/logos/audi-hnos.png' },
  { id: 'pt-4', name: 'Agrícola García', logo: '/logos/agricola-garcia.png' },
  { id: 'pt-5', name: 'CLAAS', logo: '/logos/claas.png' },
  { id: 'pt-6', name: 'Food Five Export', logo: '/logos/food-five-export.png' },
  { id: 'pt-7', name: 'Casas & Asociados', logo: '/logos/casas-asociados.png' },
  { id: 'pt-12', name: 'Agrícola Transervi S.A.', logo: '/logos/agricola-transervi.png' },

  // TODO isotipos sin texto: el nombre no se puede deducir del archivo.
  { id: 'pt-8', name: 'Nombre a confirmar', logo: '/logos/circulo-azul.png' },
  { id: 'pt-9', name: 'Nombre a confirmar', logo: '/logos/s-verde.png' },
  { id: 'pt-10', name: 'Nombre a confirmar', logo: '/logos/v.png' },
  { id: 'pt-11', name: 'Nombre a confirmar', logo: '/logos/arbol-verde.png' },
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
 * Contenido de la página Nosotros. Texto provisto por el cliente.
 *
 * OJO con `anios` y con el título de la trayectoria: la cantidad de años
 * está escrita a mano y hay que actualizarla cada año. Si se consigue el
 * año de fundación, conviene guardarlo y calcularla sola.
 */
export const getNosotros = () => ({
  empresa: 'Rural Seguridad S.R.L.',
  lema: 'Seguridad, experiencia y compromiso al servicio de nuestros clientes.',

  intro: [
    'Rural Seguridad S.R.L. es una empresa familiar tucumana especializada en seguridad privada, fundada sobre los valores de la experiencia, el compromiso y la profesionalización permanente.',
    'Nuestra empresa se caracteriza por una gestión directa de sus socios y propietarios, lo que nos permite mantener un vínculo cercano con cada cliente, comprender sus necesidades y desarrollar asesoramiento, protocolos y planes de seguridad adaptados a cada servicio.',
  ],

  equipo: {
    titulo: 'Nuestro equipo directivo',
    miembros: [
      {
        cargo: 'Socio Fundador',
        nombre: 'José R. Carrizo',
        descripcion:
          'Comisario General (R) de la Policía de la Provincia de Tucumán, con una amplia trayectoria y experiencia en el ámbito de la seguridad pública.',
      },
      {
        cargo: 'Socio Gerente',
        nombre: 'José L. Carrizo',
        descripcion:
          'Técnico Universitario en Seguridad Pública y Diplomado en Ciberseguridad, orientado a la incorporación de nuevos conocimientos y herramientas aplicadas a la seguridad.',
      },
    ],
  },

  trayectoria: {
    anios: 4,
    titulo: 'Cuatro años de crecimiento y evolución',
    parrafos: [
      'Con 4 años de trayectoria en el sector, Rural Seguridad S.R.L. continúa consolidándose y ampliando sus capacidades, incorporando nuevos conocimientos, tecnologías y metodologías de trabajo.',
      'Nuestro objetivo es brindar soluciones integrales de seguridad, combinando experiencia, planificación y profesionalización para acompañar a nuestros clientes frente a los desafíos actuales.',
      'Trabajamos día a día para seguir creciendo, innovando y ofreciendo un servicio basado en la confianza, la responsabilidad y el compromiso.',
    ],
  },
});

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
