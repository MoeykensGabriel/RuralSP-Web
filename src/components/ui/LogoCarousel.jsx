/**
 * Carrusel de logos en movimiento continuo (marquee).
 *
 * Cómo funciona: la lista se renderiza DOS veces dentro de la misma pista.
 * La animación desplaza la pista exactamente un ancho de grupo (-50%) y
 * vuelve a empezar, así el loop no tiene salto visible. Todo el movimiento
 * es CSS: no hay JavaScript ni timers corriendo.
 *
 * @param {{id: string, name: string, logo: string|null}[]} items
 */
export default function LogoCarousel({ items }) {
  if (!items?.length) return null;

  // `clone` marca la copia visual, que se oculta a los lectores de pantalla
  // para que no lean la lista dos veces.
  const renderGroup = (clone) => (
    // El padding derecho es la separación entre el último logo de una vuelta
    // y el primero de la siguiente.
    <ul className="flex items-center gap-6 pr-6" aria-hidden={clone || undefined}>
      {items.map((item) => (
        <li key={item.id} className="grid h-28 w-48 shrink-0 place-items-center">
          {item.logo ? (
            <img
              src={item.logo}
              alt={item.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
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
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      {/* ▸ Carrusel PAUSADO. Para que se mueva: borrar `[animation-play-state:paused]`. */}
      <div className="flex w-max animate-marquee [animation-play-state:paused]">
        {renderGroup(false)}
        {renderGroup(true)}
      </div>
    </div>
  );
}
