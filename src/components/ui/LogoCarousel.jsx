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
        /* El casillero define la medida y NO centra con place-items: si lo
           hiciera, el hijo se dimensionaría según su contenido y el
           `max-h-full` de la imagen no tendría contra qué resolverse. Con
           el casillero de alto fijo y el hijo en `size-full`, la imagen sí
           queda limitada por la altura. */
        <li key={`${item.id}-${i}`} className="h-28 w-48 shrink-0">
          {item.logo ? (
            /* Cada logo va sobre una plaqueta blanca.
               Los logos de clientes llegan como vengan: con fondo blanco,
               en colores, en negro. Sobre el fondo oscuro del sitio, los
               que son oscuros desaparecerían. La plaqueta los acepta a
               todos tal cual, sin pedirle al cliente versiones especiales,
               y de paso los deja todos del mismo tamaño y alineados. */
            <div className="flex size-full items-center justify-center rounded-lg bg-white p-3">
              <img
                src={item.logo}
                alt={item.name}
                loading="lazy"
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
