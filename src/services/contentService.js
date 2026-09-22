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

/**
 * ============================================================
 *  SECCIONES CON SUBPÁGINAS
 * ============================================================
 * Cada sección es un ítem desplegable del menú con varias subpáginas
 * adentro. Esta lista manda en CUATRO lugares a la vez:
 *
 *   1. el desplegable del menú (header y panel mobile)
 *   2. las rutas: /<slug> y /<slug>/<slug del ítem>
 *   3. la página índice, que lista los ítems de la sección
 *   4. la página de cada ítem
 *
 * PARA AGREGAR UNA SUBPÁGINA: sumá un objeto a `items` con `slug` (lo que
 * va en la URL: minúscula, sin acentos ni espacios), `title` y `text`.
 *
 * FOTO (opcional): `imagen` con la ruta dentro de `public/` y `imagenAlt`
 * describiendo lo que se ve. Proporción ideal 2:1, mínimo 1200px de ancho.
 * Los ítems sin foto muestran un recuadro de reemplazo del mismo tamaño,
 * así todas las tarjetas quedan parejas.
 *
 * PARA AGREGAR UNA SECCIÓN ENTERA: sumá un objeto acá con su `slug`,
 * `titulo`, `bajada` y sus `items`. No hay que tocar rutas, ni el menú,
 * ni ningún componente: aparece sola en los cuatro lugares.
 *
 * TODO falta el texto real de cada subpágina y confirmar ambas listas.
 */
export const getSecciones = () => [
  {
    slug: 'seguridad-fisica',
    titulo: 'Seguridad física',
    eyebrow: 'Qué hacemos',
    bajada: 'Personal en el lugar, con procedimientos escritos y supervisión.',
    items: [{ id: 'sf-vigilancia', slug: 'vigilancia', title: 'Vigilancia', text: RELLENO }],
  },
  {
    slug: 'sectores',
    titulo: 'Sectores',
    eyebrow: 'Dónde trabajamos',
    bajada:
      'Cada actividad tiene sus riesgos y su forma de operar. Estos son los rubros en los que trabajamos.',
    items: [
      {
        id: 'sc-administracion-publica',
        slug: 'administracion-publica',
        title: 'Administración pública',
        text: 'Protección física y control de accesos en edificios públicos, dependencias gubernamentales y organismos oficiales, garantizando la seguridad de funcionarios, visitantes y patrimonio estatal.',
        imagen: '/sectores/administracion-publica.webp',
        imagenAlt: 'Protección física y vigilancia en dependencias de la administración pública',
      },
      {
        id: 'sc-barrios-cerrados',
        slug: 'barrios-cerrados',
        title: 'Barrios cerrados',
        text: 'Seguridad perimetral, control de accesos vehiculares y peatonales, patrullaje preventivo 24/7 y respuesta operativa para barrios privados y urbanizaciones cerradas.',
        imagen: '/sectores/barrios-cerrados.png',
        imagenAlt: 'Vista perimetral y accesos a barrio privado',
      },
      {
        id: 'sc-centros-comerciales',
        slug: 'centros-comerciales',
        title: 'Centros comerciales',
        text: 'Vigilancia en shoppings y paseos de compras, con personal capacitado en prevención de pérdidas, gestión de grandes flujos de público y atención ante emergencias.',
        imagen: '/sectores/centros-comerciales.webp',
        imagenAlt: 'Vigilancia y presencia disuasiva en centros comerciales y shoppings',
      },
      {
        id: 'sc-construccion',
        slug: 'construccion',
        title: 'Construcción',
        text: 'Resguardo de obras en ejecución, maquinarias, herramientas y acopio de materiales, evitando intrusiones y robos tanto en horario operativo como nocturno.',
        imagen: '/sectores/construccion.webp',
        imagenAlt: 'Resguardo y seguridad en obras de construcción y maquinaria',
      },
      {
        id: 'sc-estacionamientos',
        slug: 'estacionamientos',
        title: 'Estacionamientos',
        text: 'Control de ingresos y egresos, vigilancia preventiva de vehículos resguardados y disuasión de delitos en playas de estacionamiento públicas y privadas.',
        imagen: '/sectores/estacionamientos.webp',
        imagenAlt: 'Control de ingresos y vigilancia en playas de estacionamiento',
      },
      {
        id: 'sc-hospitales',
        slug: 'hospitales',
        title: 'Hospitales',
        text: 'Seguridad en centros de salud, clínicas y sanatorios, orientada a mantener el orden en guardia, ingresos y áreas sensibles con trato empático y profesional.',
        imagen: '/sectores/hospitales.webp',
        imagenAlt: 'Seguridad y control de accesos en hospitales y centros sanitarios',
      },
      {
        id: 'sc-hoteles',
        slug: 'hoteles',
        title: 'Hoteles',
        text: 'Protección discreta para huéspedes, personal e instalaciones hoteleras, manteniendo estándares de cordialidad, control de accesos y vigilancia constante.',
        imagen: '/sectores/hoteles.webp',
        imagenAlt: 'Vigilancia y protección discreta en instalaciones hoteleras',
      },
      {
        id: 'sc-industria',
        slug: 'industria',
        title: 'Industria',
        text: 'Vigilancia física en plantas industriales y parques logísticos, con riguroso control de cargas, visitas y verificación de normas de higiene y seguridad laboral.',
        imagen: '/sectores/eventos.webp',
        imagenAlt: 'Vigilancia física y control de accesos en plantas industriales',
      },
    ],
  },
];

/** Busca una sección por su slug. Devuelve undefined si la URL no existe. */
export const getSeccion = (slug) => getSecciones().find((s) => s.slug === slug);

/** Busca una subpágina dentro de una sección. Undefined si no existe. */
export const getItemDeSeccion = (slugSeccion, slugItem) =>
  getSeccion(slugSeccion)?.items.find((i) => i.slug === slugItem);

/**
 * Bloque "Presentación" de la home. Texto provisto por el cliente.
 *
 * El texto llegó como seis párrafos corridos y se acomodó en tres partes:
 * `intro` (quiénes son), `pilares` (los cuatro diferenciales) y `cierre`
 * (el objetivo). Los párrafos están tal cual.
 *
 * Los `titulo` de cada pilar NO los escribió el cliente: son la frase clave
 * de cada párrafo, sacada de su propio texto, para que el bloque se pueda
 * recorrer de un vistazo. Se pueden cambiar o borrar sin tocar la página.
 */
export const getPresentacion = () => ({
  intro:
    'Rural Seguridad S.R.L. es una empresa tucumana especializada en seguridad y vigilancia privada, dedicada a proteger personas, instalaciones, bienes y establecimientos mediante soluciones de seguridad física confiables y adaptadas a cada necesidad.',

  pilares: [
    {
      titulo: 'Personalización del servicio',
      texto:
        'Uno de nuestros principales diferenciales es la personalización del servicio. Analizamos las características, riesgos y objetivos de cada cliente para diseñar una cobertura específica, con procedimientos y protocolos adecuados a su actividad, ubicación y nivel de exposición.',
    },
    {
      titulo: 'Experiencia en seguridad física',
      texto:
        'Contamos con experiencia en la prestación de servicios de seguridad física y trabajamos bajo criterios de prevención, responsabilidad, profesionalismo y compromiso. Nuestro equipo aplica metodologías orientadas a anticipar situaciones de riesgo, responder de manera eficiente y garantizar el cumplimiento de los procedimientos establecidos.',
    },
    {
      titulo: 'Supervisión permanente',
      texto:
        'La supervisión permanente constituye un componente fundamental de nuestro servicio. A través de controles y seguimiento operativo, verificamos el desempeño del personal, el cumplimiento de las consignas y la calidad de la cobertura, promoviendo una mejora continua y una respuesta confiable.',
    },
    {
      titulo: 'Conocimiento del contexto regional',
      texto:
        'Nuestro conocimiento del contexto regional nos permite comprender las particularidades de Tucumán y del norte argentino, adaptando nuestras estrategias a las características de cada zona, actividad y establecimiento. Esta experiencia local favorece una planificación más precisa y una gestión de la seguridad acorde con la realidad de nuestros clientes.',
    },
  ],

  cierre:
    'Nuestro objetivo es brindar un servicio serio, responsable y personalizado, basado en la cercanía, la comunicación constante y la construcción de relaciones de confianza. Acompañamos a cada cliente en la protección de sus actividades, instalaciones y patrimonio, con una visión de crecimiento y profesionalización permanente.',
});

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
    imagen: '/equipo-directivo.jpg',
    imagenAlt: 'José R. Carrizo (Socio Fundador) y José L. Carrizo (Socio Gerente)',
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
