import { PATHS, rutaSeccion, rutaItem } from '../routes/paths';
import { getSecciones } from '../services/contentService';

/**
 * ============================================================
 *  PUNTO ÚNICO DE EDICIÓN
 * ============================================================
 * Todo lo que identifica al cliente vive acá: nombre, contacto
 * y los ítems del menú. Para re-brandear el sitio completo NO
 * hace falta tocar ningún componente, solo este archivo.
 *
 * Los valores de abajo son PLACEHOLDERS: reemplazar por los datos
 * reales cuando el cliente los confirme.
 */
export const site = {
  /** Marca corta, la que se ve en el header. */
  name: 'RURAL',
  /** Bajada de la marca, debajo del nombre. */
  tagline: 'Empresa de Seguridad e Investigación',
  /** Nombre completo: título de la pestaña, footer y textos legales. */
  fullName: 'Rural Seguridad S.R.L.',

  /**
   * Sello de la empresa. Vive en `public/`, así que la ruta arranca en `/`.
   * Se muestra recortado en círculo: el archivo es cuadrado y el sello está
   * centrado, así que el recorte se come solo las esquinas del fondo.
   *
   * TODO reemplazar por el SVG cuando el diseñador lo entregue. Hoy es un
   * JPEG de 1254px y 144 KB, pesado para mostrarlo a 40px en el header.
   */
  logo: '/logo-rural.jpg',

  slogan: 'Empresa de Seguridad e Investigación',
  description:
    'Empresa de Seguridad e Investigación especializada en soluciones confiables y adaptadas a cada necesidad.',
  // TODO datos de contacto: siguen siendo de ejemplo, faltan los reales.
  contact: {
    phone: '+54 11 4000-0000',
    phoneHref: 'tel:+541140000000',
    email: 'Ruralseguridad.ok@gmail.com',
    address: 'Dirección a confirmar',
    hours: 'Lunes a viernes de 9 a 18 h',
  },

  /**
   * Ubicación, para la sección "Dónde estamos" de la home.
   *
   * `busqueda` es lo que abre el botón "Abrir en Google Maps". Mientras no
   * tengamos la dirección exacta apunta a la provincia, sin inventar un
   * punto en el mapa.
   *
   * TODO cuando llegue la dirección real: poner acá la dirección completa
   * (calle, número, ciudad, provincia), así el botón lleva hasta la oficina.
   */
  ubicacion: {
    busqueda: 'Tucumán, Argentina',
    
    zona: 'Provincia de Tucumán, Argentina',
  },

  /**
   * Ítems del header y del footer. Agregar o quitar acá actualiza los dos.
   *
   * No hay "Inicio" a propósito: el logo ya lleva a la home, en el header y
   * en el footer. Es una convención que la gente tiene incorporada, y
   * repetirla ocupa lugar sin agregar nada.
   */
  nav: [
    { label: 'Servicios', to: PATHS.servicios },

    // `hijos` convierte un ítem en desplegable. Las secciones no se escriben
    // acá: salen de `getSecciones()`, así el menú, las rutas y las páginas
    // nunca quedan desfasados entre sí. Agregar una sección allá la hace
    // aparecer acá sola.
    ...getSecciones().map((seccion) => ({
      label: seccion.titulo,
      to: rutaSeccion(seccion.slug),
      hijos: seccion.items.map((item) => ({
        label: item.title,
        to: rutaItem(seccion.slug, item.slug),
      })),
    })),

    { label: 'Nosotros', to: PATHS.nosotros },
    { label: 'Contacto', to: PATHS.contacto },
  ],

  legal: {
    licence: 'Habilitación DGSPr N.º 0000/24',
    year: new Date().getFullYear(),
  },
};

export default site;
