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
  name: 'GB SEGURIDAD',
  tagline: 'Seguridad privada integral',
  slogan: 'Protegemos personas, bienes y operaciones.',
  description:
    'Empresa de seguridad privada. Vigilancia física, monitoreo y control de accesos.',

  contact: {
    phone: '+54 11 4000-0000',
    phoneHref: 'tel:+541140000000',
    email: 'contacto@gbseguridad.com.ar',
    address: 'Av. Siempre Viva 1234, CABA, Argentina',
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
