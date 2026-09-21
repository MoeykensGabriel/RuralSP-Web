import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Tarjeta que lleva a una subpágina (un sector, un servicio de seguridad
 * física…). Es la misma en la home y en las páginas índice, así se ven
 * iguales en todos lados.
 *
 * La foto es opcional. Si el ítem no tiene, se muestra un recuadro del
 * mismo tamaño: así las tarjetas de una grilla quedan parejas aunque
 * algunas tengan foto y otras no, y se ve dónde falta material.
 *
 * El enlace envuelve la tarjeta entera, así toda ella es tocable y no solo
 * el texto, que en un celular es la diferencia entre acertar y no.
 */
export default function TarjetaItem({ to, title, text, imagen, imagenAlt }) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-600/40 hover:bg-neutral-900/80 hover:shadow-[0_12px_32px_rgba(220,38,38,0.12)]"
    >
      <div className="aspect-[2/1] w-full overflow-hidden border-b border-neutral-800 bg-bg-soft">
        {imagen ? (
          <img
            src={imagen}
            alt={imagenAlt ?? ''}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid size-full place-items-center font-mono text-[0.7rem] tracking-[0.2em] text-fg-mute"
          >
            FOTO
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold transition-colors group-hover:text-red-500">{title}</h3>
        {text && <p className="mt-3 text-sm text-fg-soft leading-relaxed line-clamp-3">{text}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-red-500 transition-colors group-hover:text-red-400">
          Ver más
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  );
}
