import { site } from '../config/site';
import { PATHS } from '../routes/paths';
import { getPartners, getSectors, getValues } from '../services/contentService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import LogoCarousel from '../components/ui/LogoCarousel';
import Placeholder from '../components/ui/Placeholder';
import Section from '../components/ui/Section';

/**
 * Home — esqueleto de landing corporativa.
 *
 * Los bloques van uno debajo del otro, en el orden habitual del rubro:
 *
 *   1. Header .................. en `components/layout/Header.jsx`
 *   2. Hero .................... acá
 *   3. Presentación ............ acá
 *   4. Prueba social (logos) ... acá
 *   5. Sectores ................ acá
 *   6. Propuesta de valor ...... acá
 *   7. Cierre / CTA ............ acá
 *   8. Footer .................. en `components/layout/Footer.jsx`
 *
 * Todo el texto es de relleno: sale de `services/contentService.js` y de
 * `config/site.js`. Este archivo define la ESTRUCTURA, no el contenido.
 *
 * Comportamiento responsive: mobile arranca en una columna y las grillas
 * se abren en `sm:` (640px) y en `menu:` (900px).
 */
export default function Home() {
  const partners = getPartners();
  const sectors = getSectors();
  const values = getValues();

  return (
    <>
      {/* ── 2. Hero ─────────────────────────────────────────────────────
          Mobile: texto arriba, imagen abajo.
          Desktop: dos columnas, texto a la izquierda. */}
      <section className="py-12 menu:py-20">
        <Container className="grid grid-cols-1 items-center gap-10 menu:grid-cols-[1.1fr_0.9fr] menu:gap-14">
          <div>
            <h1 className="max-w-[18ch] text-[clamp(2rem,6vw,3.5rem)] font-bold tracking-tight">
              {site.slogan}
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg text-fg-soft">{site.description}</p>
            <Button to={PATHS.contacto} className="mt-8">
              Más información
            </Button>
          </div>

          <Placeholder label="IMAGEN PRINCIPAL" ratio="aspect-[4/3]" />
        </Container>
      </section>

      {/* ── 3. Presentación de la empresa ───────────────────────────────
          Imagen y texto lado a lado en desktop, apilados en mobile. */}
      <Section alt className="border-t border-line">
        <div className="grid grid-cols-1 items-center gap-10 menu:grid-cols-2 menu:gap-14">
          <Placeholder label="IMAGEN" ratio="aspect-[3/2]" className="menu:order-last" />

          <div>
            <p className="eyebrow">La empresa</p>
            <h2 className="mt-2 text-2xl font-bold menu:text-4xl">Presentación</h2>
            <div className="mt-4 space-y-3 text-fg-soft">
              <p>
                Primer párrafo de presentación. Acá va quiénes son, desde cuándo trabajan y qué los
                distingue.
              </p>
              <p>
                Segundo párrafo. Suele explicar cómo combinan personal capacitado con tecnología, y
                qué tipo de cobertura ofrecen.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 4. Prueba social ────────────────────────────────────────────
          El carrusel se desplaza solo; no cambia entre mobile y desktop. */}
      <section className="border-t border-line py-10 menu:py-14">
        <Container>
          <p className="eyebrow mb-6">Empresas que confían en nosotros</p>
        </Container>
        <LogoCarousel items={partners} />
      </section>

      {/* ── 5. Sectores ─────────────────────────────────────────────────
          1 columna en mobile · 2 desde 640px · 3 desde 900px. */}
      <Section
        alt
        className="border-t border-line"
        eyebrow="Dónde trabajamos"
        title="Sectores"
        subtitle="Los rubros en los que la empresa tiene experiencia."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 menu:grid-cols-3 menu:gap-6">
          {sectors.map((sector) => (
            <Card key={sector.id} title={sector.title} text={sector.text} />
          ))}
        </div>
      </Section>

      {/* ── 6. Propuesta de valor ───────────────────────────────────────
          1 columna en mobile · 2 desde 640px · 4 desde 900px. */}
      <Section
        className="border-t border-line"
        eyebrow="Por qué elegirnos"
        title="Propuesta de valor"
        subtitle="Los diferenciales que la empresa quiere destacar."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 menu:grid-cols-4 menu:gap-6">
          {values.map((value) => (
            <Card key={value.id} title={value.title} text={value.text} />
          ))}
        </div>
      </Section>

      {/* ── 7. Cierre / CTA ─────────────────────────────────────────────
          Apilado en mobile, texto y botones enfrentados en desktop. */}
      <section className="border-t border-line bg-bg-soft py-12 menu:py-16">
        <Container className="flex flex-col gap-6 menu:flex-row menu:items-center menu:justify-between menu:gap-12">
          <div>
            <h2 className="max-w-[24ch] text-2xl font-bold menu:text-3xl">
              Título del cierre
            </h2>
            <p className="mt-3 max-w-[52ch] text-fg-soft">
              Bajada del bloque de cierre, orientada a que el visitante pida información.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button to={PATHS.contacto}>Contactanos</Button>
            <Button href={site.contact.phoneHref} variant="secondary">
              {site.contact.phone}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
