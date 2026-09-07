import Container from './Container';

/**
 * Encabezado de las páginas internas (Servicios, Nosotros, Contacto).
 * La home tiene su propio hero, más grande, dentro de `pages/Home.jsx`.
 */
export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <div className="border-b border-line bg-bg-soft py-12">
      <Container>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 text-[clamp(1.9rem,5vw,3rem)] font-bold">{title}</h1>
        {subtitle && <p className="mt-4 max-w-[62ch] text-lg text-fg-soft">{subtitle}</p>}
      </Container>
    </div>
  );
}
