/**
 * Mapa de Google Maps embebido, adaptado al tema oscuro del sitio.
 *
 * Usa el embed público de Google, que no necesita clave de API.
 *
 * Google no deja cambiar los colores de este mapa, y el suyo es claro:
 * sobre el fondo oscuro quedaba como un agujero blanco. El filtro lo pasa
 * a blanco y negro y lo invierte, así los terrenos quedan oscuros y las
 * rutas claras, como un mapa en modo noche. Es solo un filtro visual: el
 * mapa se sigue usando igual.
 *
 * `loading="lazy"` acá SÍ va, a diferencia de los logos del carrusel: el
 * mapa está al final de la página y no dentro de un contenedor recortado,
 * así que se carga recién cuando el visitante se acerca. Es el elemento más
 * pesado de la página, y la mayoría de las visitas nunca llega hasta acá.
 *
 * @param {string} busqueda  Lo que se busca en Google Maps.
 * @param {number} [zoom]    15 para una dirección, 8 para una provincia.
 * @param {string} titulo    Descripción del mapa para lectores de pantalla.
 */
export default function Mapa({ busqueda, zoom = 15, titulo, className = '' }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(busqueda)}&z=${zoom}&output=embed`;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-bg-soft ${className}`.trim()}
    >
      <iframe
        src={src}
        title={titulo}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
      />
    </div>
  );
}
