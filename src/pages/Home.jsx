import { site } from '../config/site';
import { PATHS } from '../routes/paths';
import { getPartners, getPresentacion, getSectors, getValues } from '../services/contentService';
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
 * El texto sale de `services/contentService.js` y de `config/site.js`:
 * este archivo define la ESTRUCTURA, no el contenido. La Presentación y los
 * logos ya son reales; Sectores y Propuesta de valor siguen de relleno.
 *
 * Comportamiento responsive: mobile arranca en una columna y las grillas
 * se abren en `sm:` (640px) y en `menu:` (900px).
 */
export default function Home() {
  const presentacion = getPresentacion();
  const partners = getPartners();
  const sectors = getSectors();
  const values = getValues();

  return (
    <>
      {/* ── 2. Hero ─────────────────────────────────────────────────────
          Usa un negro un punto más profundo que el del resto del sitio
          (neutral-950 contra --color-bg) para separarse apenas del cuerpo
          de la página, sin cortarlo con una línea. */}
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        {/* ── Fondo, en tres capas. Todo decorativo: nada de esto se lee. ──
            El orden importa, se apilan de atrás hacia adelante. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* 1. Manchas radiales desenfocadas: rompen el negro plano. */}
          <div className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-neutral-400/20 blur-[120px]" />
          <div className="absolute -bottom-48 left-0 size-[28rem] rounded-full bg-neutral-500/15 blur-[130px]" />

          {/* 2. El sello como marca de agua, saliéndose por la derecha.
                 `mix-blend-screen` hace desaparecer el fondo negro del
                 archivo —en modo screen el negro es transparente— así que
                 queda solo el plateado, sin el recuadro. */}
          <img
            src={site.logo}
            alt=""
            className="absolute top-1/2 -right-24 w-[26rem] -translate-y-1/2 opacity-20 mix-blend-screen menu:-right-28 menu:w-[44rem] menu:opacity-30"
          />

          {/* 3. Velo oscuro de izquierda a derecha: garantiza que el texto
                 se lea siempre, sin importar qué quede detrás. */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent" />
        </div>

        <Container className="py-24 menu:py-36">
          <p className="font-mono text-xs font-medium tracking-[0.16em] text-neutral-400 uppercase">
            {site.tagline}
          </p>
          <h1 className="mt-5 max-w-[15ch] text-[clamp(2.25rem,7vw,4.5rem)] font-bold tracking-tight">
            {site.slogan}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-neutral-300">{site.description}</p>
          <Button to={PATHS.contacto} className="mt-10">
            Más información
          </Button>
        </Container>
      </section>

      {/* ── 3. Presentación de la empresa ───────────────────────────────
          Tres partes, de arriba abajo:
            · intro + imagen — lado a lado en desktop; en mobile la imagen
              va primero para no cortar el hilo de lectura del texto
            · los cuatro pilares — 1 columna en mobile, 2 desde 900px
            · el cierre, con el objetivo de la empresa */}
      <Section alt className="border-t border-line">
        <div className="grid grid-cols-1 items-center gap-10 menu:grid-cols-2 menu:gap-14">
          <Placeholder label="IMAGEN" ratio="aspect-[3/2]" className="menu:order-last" />

          <div>
            <p className="eyebrow">La empresa</p>
            <h2 className="mt-2 text-2xl font-bold menu:text-4xl">Presentación</h2>
            <p className="mt-5 text-lg leading-relaxed text-fg">{presentacion.intro}</p>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-14 gap-y-10 menu:mt-20 menu:grid-cols-2">
          {presentacion.pilares.map((pilar) => (
            <li key={pilar.titulo} className="border-t border-line pt-6">
              <h3 className="text-lg font-bold">{pilar.titulo}</h3>
              <p className="mt-3 leading-relaxed text-fg-soft">{pilar.texto}</p>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-[70ch] border-l-2 border-line-strong pl-5 text-lg leading-relaxed text-fg menu:mt-20 menu:pl-6">
          {presentacion.cierre}
        </p>
      </Section>

      {/* ── 4. Prueba social ────────────────────────────────────────────
          El carrusel se desplaza solo; no cambia entre mobile y desktop. */}
      {/* Padding de arriba menor que el de abajo: sube el título dentro del
          bloque sin achicar la sección. Centrado porque el carrusel es de
          ancho completo y se desvanece parejo en los dos bordes. */}
      <section className="border-t border-line pt-12 pb-16 menu:pt-16 menu:pb-24">
        <Container>
          <p className="mb-12 text-center font-mono text-base font-medium tracking-[0.12em] text-fg uppercase menu:text-lg">
            Empresas que confían en nosotros
          </p>
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
          Ya no vive acá: el formulario de contacto está en el Footer, así
          que cierra ésta y todas las demás páginas. Ver
          `components/layout/ContactForm.jsx`. */}
    </>
  );
}
