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
 * @param {number} [speed] ◀ LA PERILLA DE LA VELOCIDAD.
 *   Son los segundos que tarda cada logo en cruzar. Subilo para ir más
 *   lento, bajalo para ir más rápido. La velocidad se mantiene igual sin
 *   importar cuántos logos haya.
 *     4.5 → 48 px/s   (ágil)
 *     6   → 36 px/s   (actual)
 *     8   → 27 px/s   (bien pausado)
 */

/** Mínimo de logos por grupo para que la pista tape cualquier pantalla. */
const MIN_POR_GRUPO = 8;

export default function LogoCarousel({ items, speed = 6 }) {
  if (!items?.length) return null;

  // Con pocos logos, un grupo puede ser más angosto que la pantalla y al
  // completar la vuelta se vería un hueco. Repetimos la lista hasta llegar
  // al mínimo. Con 6 logos o más no repite nada.
  const repeticiones = Math.ceil(MIN_POR_GRUPO / items.length);
  const grupo = Array.from({ length: repeticiones }, () => items).flat();

  // Duración proporcional a la cantidad: agregar logos alarga la vuelta en
  // vez de acelerarla, así el movimiento se ve siempre igual de calmo.
  const duracion = grupo.length * speed;

  const renderGrupo = (clon) => (
    // El padding derecho es la separación entre el último logo de una vuelta
    // y el primero de la siguiente.
    <ul className="flex items-center gap-6 pr-6" aria-hidden={clon || undefined}>
      {grupo.map((item, i) => (
        /* Alto fijo y ANCHO LIBRE. Los logos vienen con proporciones muy
           distintas: unos son casi cuadrados y otros son palabras largas y
           chatas. Con un ancho fijo, a los cuadrados les sobra blanco a los
           costados y a los alargados les falta. Normalizando por altura,
           cada plaqueta se ajusta a su logo y todos se ven del mismo
           tamaño óptico. Los casilleros vacíos sí llevan ancho fijo, para
           que la fila de reemplazo quede pareja. */
        <li key={`${item.id}-${i}`} className="h-32 shrink-0">
          {item.logo ? (
            /* La imagen ES la plaqueta: ocupa la tarjeta de borde a borde y
               las esquinas redondeadas la recortan. Con esto un mismo
               componente se banca las tres formas en que llegan los logos:

                 · con fondo blanco  -> se ve como una tarjeta blanca
                 · con fondo propio  -> la tarjeta toma ese color
                 · con transparencia -> el blanco de atrás asoma

               El blanco de fondo es la red de contención del tercer caso:
               sin él, un logo transparente y oscuro se perdería contra el
               fondo del sitio. */
            <div className="h-full min-w-36 overflow-hidden rounded-lg bg-white">
              <img
                src={item.logo}
                alt={item.name}
                loading="lazy"
                className="mx-auto h-full w-auto origin-center object-contain"
                /* `escala` empareja el tamaño ÓPTICO. Igualar la altura de
                   la tarjeta no alcanza: cada archivo trae su propio margen
                   alrededor de la marca, así que a igual altura de tarjeta
                   una marca puede verse el doble que otra. Al agrandar, lo
                   que se sale se recorta contra el borde de la tarjeta, que
                   en estos archivos es fondo liso. */
                style={item.escala ? { transform: `scale(${item.escala})` } : undefined}
              />
            </div>
          ) : (
            <span className="grid h-full w-48 place-items-center rounded-lg border border-dashed border-line-strong bg-bg p-2 text-center font-mono text-[0.7rem] tracking-[0.1em] text-fg-mute uppercase">
              {item.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ animationDuration: `${duracion}s` }}
      >
        {renderGrupo(false)}
        {/* Copia solo visual: se oculta a los lectores de pantalla para que
            no lean la lista de empresas dos veces. */}
        {renderGrupo(true)}
      </div>
    </div>
  );
}
