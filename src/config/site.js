import { PATHS } from '../routes/paths';

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
  tagline: 'Seguridad Privada',
  /** Nombre completo: título de la pestaña, footer y textos legales. */
  fullName: 'Rural Seguridad Privada',

  /**
   * Sello de la empresa. Vive en `public/`, así que la ruta arranca en `/`.
   * Se muestra recortado en círculo: el archivo es cuadrado y el sello está
   * centrado, así que el recorte se come solo las esquinas del fondo.
   *
   * TODO reemplazar por el SVG cuando el diseñador lo entregue. Hoy es un
   * JPEG de 1254px y 144 KB, pesado para mostrarlo a 40px en el header.
   */
  logo: '/logo-rural.jpg',

  slogan: 'Protegemos personas, bienes y operaciones.',
  description:
    'Empresa de seguridad privada. Vigilancia física, monitoreo y control de accesos.',

  // TODO datos de contacto: siguen siendo de ejemplo, faltan los reales.
  contact: {
    phone: '+54 11 4000-0000',
    phoneHref: 'tel:+541140000000',
    email: 'contacto@ejemplo.com.ar',
    address: 'Dirección a confirmar',
    hours: 'Lunes a viernes de 9 a 18 h',
  },

  /** Ítems del header y del footer. Agregar o quitar acá actualiza los dos. */
  nav: [
    { label: 'Inicio', to: PATHS.home },
    { label: 'Servicios', to: PATHS.servicios },
    { label: 'Nosotros', to: PATHS.nosotros },
    { label: 'Contacto', to: PATHS.contacto },
  ],

  legal: {
    licence: 'Habilitación DGSPr N.º 0000/24',
    year: new Date().getFullYear(),
  },
};

export default site;
