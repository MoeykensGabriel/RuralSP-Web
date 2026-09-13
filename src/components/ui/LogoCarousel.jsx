/**
 * Carrusel de logos en movimiento continuo (marquee).
 *
 * Cómo funciona: la lista se renderiza DOS veces dentro de la misma pista.
 * La animación desplaza la pista exactamente un ancho de grupo (-50%) y
 * vuelve a empezar, así el loop no tiene salto visible. Todo el movimiento
 * es CSS: no hay JavaScript ni timers corriendo.
 *
 * Se frena al pasar el mouse por encima o al llegar con el teclado, y queda
 * quieto si el sistema operativo pide menos movimiento.
 *
 * @param {{id: string, name: string, logo: string|null}[]} items
 */

/** Mínimo de logos por grupo para que la pista tape cualquier pantalla. */
const MIN_POR_GRUPO = 8;

/**
 * ═══ LA PERILLA DE LA VELOCIDAD ═══
 *
 * Segundos que tarda cada logo en cruzar. Más alto es más lento.
 *
 * Hay dos valores porque las tarjetas miden distinto en mobile y en desktop,
 * y con un solo número el carrusel iría al doble de rápido en la pantalla
 * grande. Cada valor es (ancho de tarjeta + separación) ÷ píxeles por
 * segundo, y los dos apuntan a los mismos 36 px/s:
 *
 *   mobile   (160 + 16) / 36 = 4.9
 *   desktop  (256 + 24) / 36 = 7.8
 *
 * Los dos valores están escritos como clases en el JSX de más abajo:
 *   [--seg:4.9s]  y  menu:[--seg:7.8s]
 *
 * OJO: si cambian las medidas del casillero o el `gap`, estos dos números
 * hay que recalcularlos, o la velocidad se corre.
 */

export default function LogoCarousel({ items }) {
  if (!items?.length) return null;

  // Con pocos logos, un grupo puede ser más angosto que la pantalla y al
  // completar la vuelta se vería un hueco. Repetimos la lista hasta llegar
  // al mínimo. Con 8 logos o más no repite nada.
  const repeticiones = Math.ceil(MIN_POR_GRUPO / items.length);
  const grupo = Array.from({ length: repeticiones }, () => items).flat();

  const renderGrupo = (clon) => (
    // El padding derecho es la separación entre el último logo de una vuelta
    // y el primero de la siguiente.
    <ul className="flex items-center gap-4 pr-4 menu:gap-6 menu:pr-6" aria-hidden={clon || undefined}>
      {grupo.map((item, i) => (
        /* Casillero de medida fija, igual para TODOS: es lo que hace que la
           fila se lea pareja aunque los logos tengan formas muy distintas.
           Cambia entre mobile y desktop, pero siempre parejo entre tarjetas.

           En desktop es ancho (16:8) a propósito: los logotipos largos, tipo
           CLAAS, topan contra el ancho antes que contra el alto, así que
           darles más ancho es lo único que los agranda. A los logos
           compactos no les cambia nada, porque a ellos los limita el alto. */
        <li key={`${item.id}-${i}`} className="h-24 w-40 shrink-0 menu:h-32 menu:w-64">
          {item.logo ? (
            /* TODAS las tarjetas miden lo mismo y el logo entra adentro con
               `object-contain`. Es lo que empareja marcas de formas muy
               distintas: una marca compacta toca el borde de arriba y abajo,
               y una palabra larga toca los costados. Las dos terminan
               pesando parecido.

               Dejar el ancho libre, en cambio, daba una tarjeta de 110px
               para una y de 326px para otra, y la larga se veía casi el
               doble de grande.

               El `fondo` es el color con el que viene el archivo: así el
               sobrante de la caja no se ve como franjas blancas alrededor
               de un logo que trae su propio color. */
            <div
              className="flex size-full items-center justify-center overflow-hidden rounded-lg"
              style={{ backgroundColor: item.fondo ?? '#ffffff' }}
            >
              {/* NO usar loading="lazy" acá, aunque parezca la opción obvia.
                  El navegador decide cuándo cargar una imagen lazy midiendo
                  si está cerca de la pantalla, pero recorta esa medición por
                  los contenedores con overflow oculto, como la ventana de
                  este carrusel. Un logo que todavía no entró en la franja
                  cuenta como "infinitamente lejos" y recién se carga cuando
                  ya es visible: se veía la tarjeta en blanco y después el
                  logo. Con carga normal están listos antes de aparecer.

                  `fetchPriority="low"` evita que compitan con el hero, que
                  es lo primero que ve el visitante. */}
              <img
                src={item.logo}
                alt={item.name}
                fetchPriority="low"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <span className="grid size-full place-items-center rounded-lg border border-dashed border-line-strong bg-bg p-2 text-center font-mono text-[0.7rem] tracking-[0.1em] text-fg-mute uppercase">
              {item.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      {/* La duración sale de una cuenta en CSS: cantidad de logos por los
          segundos que tarda cada uno. Los segundos viven en una variable que
          cambia sola en el breakpoint, así que la velocidad se mantiene en
          mobile y en desktop sin medir nada desde JavaScript. */}
      <div
        className={
          // Los valores van literales y no interpolados: Tailwind lee el
          // código como texto para generar el CSS, y una plantilla no la ve.
          'flex w-max animate-marquee [--seg:4.9s] menu:[--seg:7.8s] ' +
          'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]'
        }
        style={{ animationDuration: `calc(${grupo.length} * var(--seg))` }}
      >
        {renderGrupo(false)}
        {/* Copia solo visual: se oculta a los lectores de pantalla para que
            no lean la lista de empresas dos veces. */}
        {renderGrupo(true)}
      </div>
    </div>
  );
}
