import Container from './Container';

/**
 * Bloque vertical de una página, con encabezado opcional.
 *
 * @param {string}  [eyebrow]  Texto chico sobre el título.
 * @param {string}  [title]    Título de la sección.
 * @param {string}  [subtitle] Bajada.
 * @param {boolean} [alt]      Usa el fondo secundario (para alternar bloques).
 * @param {boolean} [center]   Centra el encabezado también en desktop.
 */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  alt = false,
  center = false,
  className = '',
  children,
}) {
  const hasHead = Boolean(eyebrow || title || subtitle);

  return (
    <section
      id={id}
      className={`py-12 menu:py-16 ${alt ? 'bg-bg-soft' : ''} ${className}`.trim()}
    >
      <Container>
        {hasHead && (
          <header className={`mb-8 max-w-[62ch] ${center ? 'mx-auto text-center' : ''}`.trim()}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="mt-2 text-2xl font-bold menu:text-4xl">{title}</h2>}
            {subtitle && <p className="mt-3 text-fg-soft">{subtitle}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
