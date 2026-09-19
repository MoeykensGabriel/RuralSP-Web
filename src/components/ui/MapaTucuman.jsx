import { DEPARTAMENTOS, VIEWBOX } from './mapaTucuman.data';

/**
 * Mapa de la provincia de Tucumán con sus 17 departamentos, dibujado en SVG.
 *
 * Los trazados salen de los límites oficiales del Instituto Geográfico
 * Nacional (ver `mapaTucuman.data.js`), así que la forma es la real y no un
 * dibujo aproximado. Al ser SVG toma los colores del sitio, se ve nítido en
 * cualquier pantalla y pesa 8 KB comprimido, contra el megabyte largo que
 * baja un mapa de Google embebido.
 *
 * Cada departamento es un trazado propio: los bordes se dibujan con el
 * color del fondo, así quedan como separaciones entre piezas. Al pasar el
 * mouse, el departamento se aclara y muestra su nombre.
 */
export default function MapaTucuman({ className = '' }) {
  return (
    <figure className={`flex flex-col items-center ${className}`.trim()}>
      <svg
        viewBox={VIEWBOX}
        role="img"
        aria-labelledby="mapa-tucuman-titulo"
        className="h-auto w-full"
      >
        <title id="mapa-tucuman-titulo">
          Mapa de la provincia de Tucumán con sus 17 departamentos
        </title>

        {DEPARTAMENTOS.map((depto) => (
          <path
            key={depto.nombre}
            d={depto.d}
            /* `non-scaling-stroke` deja el borde en 1.5px reales sin importar
               a qué tamaño se muestre el mapa. Sin eso, en mobile el borde se
               achica junto con el dibujo y las separaciones desaparecen. */
            className="fill-neutral-600 stroke-bg stroke-[1.5] transition-colors [stroke-linejoin:round] [vector-effect:non-scaling-stroke] hover:fill-neutral-400"
          >
            <title>{depto.nombre}</title>
          </path>
        ))}
      </svg>

      <figcaption className="mt-5 text-center">
        <p className="eyebrow">Provincia de Tucumán</p>
        {/* La licencia de los límites (CC BY 3.0 IGO) exige citar la fuente.
            No sacar esta línea. */}
        <p className="mt-2 text-xs text-fg-mute">
          Límites: Instituto Geográfico Nacional, vía geoBoundaries (CC BY 3.0 IGO).
        </p>
      </figcaption>
    </figure>
  );
}
