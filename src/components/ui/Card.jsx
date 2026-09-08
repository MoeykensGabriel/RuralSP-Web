/**
 * Tarjeta de contenido. Se usa en las grillas de Sectores y Diferenciales.
 *
 * El cuadrado punteado es el lugar del ícono: cuando definamos cuáles van,
 * se reemplaza por el <Icon /> correspondiente.
 */
export default function Card({ title, text, className = '' }) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-xl border border-line bg-bg p-6 transition-colors hover:border-line-strong ${className}`.trim()}
    >
      <span
        aria-hidden="true"
        className="size-11 shrink-0 rounded-lg border border-dashed border-line-strong bg-bg-soft"
      />
      <h3 className="text-lg font-bold">{title}</h3>
      {text && <p className="text-sm text-fg-soft">{text}</p>}
    </article>
  );
}
