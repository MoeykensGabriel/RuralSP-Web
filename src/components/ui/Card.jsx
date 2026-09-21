/**
 * Tarjeta de contenido. Se usa en las grillas de Sectores y Diferenciales.
 *
 * El cuadrado punteado es el lugar del ícono: cuando definamos cuáles van,
 * se reemplaza por el <Icon /> correspondiente.
 */
export default function Card({ title, text, className = '' }) {
  return (
    <article
      className={`group flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-500 hover:bg-neutral-900/80 hover:shadow-xl ${className}`.trim()}
    >
      <span
        aria-hidden="true"
        className="size-11 shrink-0 rounded-xl border border-dashed border-neutral-700 bg-neutral-950/80 transition-colors group-hover:border-neutral-400 group-hover:bg-neutral-800/50"
      />
      <h3 className="text-lg font-bold transition-colors group-hover:text-white">{title}</h3>
      {text && <p className="text-sm text-fg-soft leading-relaxed">{text}</p>}
    </article>
  );
}
