/**
 * Tarjeta de contenido. Se usa en las grillas de Sectores y Diferenciales.
 *
 * El cuadrado punteado es el lugar del ícono: cuando definamos cuáles van,
 * se reemplaza por el <Icon /> correspondiente.
 */
export default function Card({ title, text, className = '' }) {
  return (
    <article
      className={`group flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/40 hover:bg-neutral-900/80 hover:shadow-xl ${className}`.trim()}
    >
      <span
        aria-hidden="true"
        className="size-11 shrink-0 rounded-xl border border-dashed border-red-500/40 bg-neutral-950/80 transition-colors group-hover:border-red-500 group-hover:bg-red-500/10"
      />
      <h3 className="text-lg font-bold transition-colors group-hover:text-red-500">{title}</h3>
      {text && <p className="text-sm text-fg-soft leading-relaxed">{text}</p>}
    </article>
  );
}
