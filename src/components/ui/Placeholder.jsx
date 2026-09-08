/**
 * Recuadro punteado que reserva el lugar de una imagen o un mapa.
 * Se borra cuando llega el material real.
 *
 * @param {string} label     Qué va a ir acá (ej. "IMAGEN", "MAPA").
 * @param {string} [ratio]   Clase de aspect-ratio de Tailwind.
 */
export default function Placeholder({ label, ratio = 'aspect-[4/3]', className = '' }) {
  return (
    <div
      role="img"
      aria-label={`Espacio reservado para ${label.toLowerCase()}`}
      className={`grid ${ratio} w-full place-items-center rounded-xl border border-dashed border-line-strong bg-bg-soft font-mono text-xs tracking-[0.2em] text-fg-mute ${className}`.trim()}
    >
      {label}
    </div>
  );
}
