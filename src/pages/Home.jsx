import { ArrowUpRight, MapPin, Navigation } from 'lucide-react';
import { site } from '../config/site';
import { PATHS, rutaItem } from '../routes/paths';
import { getPartners, getPresentacion, getSeccion, getValues } from '../services/contentService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import LogoCarousel from '../components/ui/LogoCarousel';
import MapaTucuman from '../components/ui/MapaTucuman';
import Placeholder from '../components/ui/Placeholder';
import Section from '../components/ui/Section';
import TarjetaItem from '../components/ui/TarjetaItem';

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
 *   7. Dónde estamos (mapa) .... acá
 *   8. Cierre / CTA ............ en el Footer
 *   9. Footer .................. en `components/layout/Footer.jsx`
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
  // La home muestra los sectores; el resto de la seccion vive en /sectores.
  const sectores = getSeccion('sectores');
  const values = getValues();

  return (
    <>
      {/* ── 2. Hero ───────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        {/* ── Fondo en capas ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* Mancha radial plateada/neutra animada */}
          <div className="absolute -top-32 -right-32 size-[36rem] rounded-full bg-neutral-400/15 blur-[140px] animate-pulse-glow" />
          <div className="absolute -bottom-48 left-0 size-[30rem] rounded-full bg-neutral-500/10 blur-[130px]" />

          {/* Sello como marca de agua */}
          <img
            src={site.logo}
            alt=""
            className="absolute top-1/2 -right-24 w-[26rem] -translate-y-1/2 opacity-20 mix-blend-screen menu:-right-28 menu:w-[44rem] menu:opacity-30"
          />

          {/* Velo oscuro */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent" />
        </div>

        <Container className="py-24 animate-fade-in-up menu:py-36">
          {/* Badge 24/7 en tono neutro/esmeralda */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-neutral-700 bg-neutral-900/80 px-3.5 py-1 text-xs font-mono font-medium text-neutral-300 backdrop-blur-md">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            SEGURIDAD PRIVADA &amp; VIGILANCIA 24/7
          </div>

          <p className="font-mono text-xs font-medium tracking-[0.16em] text-neutral-400 uppercase">
            {site.tagline}
          </p>
          <h1 className="mt-4 max-w-[15ch] text-[clamp(2.25rem,7vw,4.5rem)] font-bold tracking-tight leading-[1.1]">
            {site.slogan}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-neutral-300 leading-relaxed">{site.description}</p>
          <Button
            to={PATHS.contacto}
            variant="primary"
            className="mt-10 px-7 py-3.5 text-base font-bold shadow-xl transition-all duration-300 hover:scale-105"
          >
            Más información
            <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
        </Container>
      </section>

      {/* ── 3. Presentación de la empresa ─────────────────────────────── */}
      <Section alt className="border-t border-line">
        <div className="grid grid-cols-1 items-center gap-10 menu:grid-cols-2 menu:gap-14">
          <Placeholder label="IMAGEN" ratio="aspect-[3/2]" className="menu:order-last" />

          <div>
            <p className="eyebrow">La empresa</p>
            <h2 className="mt-2 text-2xl font-bold menu:text-4xl">Presentación</h2>
            <p className="mt-5 text-lg leading-relaxed text-fg">{presentacion.intro}</p>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 menu:mt-20 menu:grid-cols-2">
          {presentacion.pilares.map((pilar, index) => (
            <li
              key={pilar.titulo}
              className="group rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-900/80 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-neutral-400">0{index + 1}</span>
                <div className="h-px flex-1 bg-neutral-800 transition-colors group-hover:bg-neutral-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-white transition-colors group-hover:text-white">
                {pilar.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-soft sm:text-base">{pilar.texto}</p>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-[75ch] rounded-r-2xl border-l-4 border-white bg-neutral-900/50 p-6 text-lg leading-relaxed text-fg shadow-lg sm:p-8 menu:mt-20">
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
        {/* Misma tarjeta que en /sectores: cada una lleva a su página. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 menu:grid-cols-3 menu:gap-6">
          {sectores.items.map((sector) => (
            <TarjetaItem
              key={sector.id}
              to={rutaItem(sectores.slug, sector.slug)}
              title={sector.title}
              text={sector.text}
              imagen={sector.imagen}
              imagenAlt={sector.imagenAlt}
            />
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

      {/* ── 7. Dónde estamos ────────────────────────────────────────────
          Va justo antes del formulario del footer: primero "dónde estamos",
          después "escribinos".
          Mobile: texto arriba y mapa abajo. Desktop: lado a lado.
          El mapa de la provincia es vertical, así que se limita el ancho:
          si ocupara toda la columna mediría más de 800px de alto. */}
      <Section className="border-t border-line">
        <div className="grid grid-cols-1 items-center gap-12 menu:grid-cols-2 menu:gap-16">
          <div>
            <p className="eyebrow">Dónde estamos</p>
            <h2 className="mt-2 text-2xl font-bold menu:text-4xl">{site.ubicacion.zona}</h2>

            <dl className="mt-8 flex flex-col border-t border-line">
              <div className="flex items-start gap-4 border-b border-line py-4">
                <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0 text-fg-mute" />
                <div>
                  <dt className="eyebrow">Oficina</dt>
                  <dd className="mt-1">{site.contact.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b border-line py-4">
                <Navigation size={18} aria-hidden="true" className="mt-1 shrink-0 text-fg-mute" />
                <div>
                  <dt className="eyebrow">Zona de trabajo</dt>
                  <dd className="mt-1">{site.ubicacion.zona}</dd>
                </div>
              </div>
            </dl>

            {/* Abre la misma búsqueda en Google Maps; en el celular abre la
                app de Mapas directamente. */}
            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                site.ubicacion.busqueda,
              )}`}
              variant="secondary"
              className="mt-8"
            >
              Abrir en Google Maps
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <MapaTucuman className="mx-auto w-full max-w-72 menu:max-w-sm" />
        </div>
      </Section>

      {/* ── 8. Cierre / CTA ─────────────────────────────────────────────
          Ya no vive acá: el formulario de contacto está en el Footer, así
          que cierra ésta y todas las demás páginas. Ver
          `components/layout/ContactForm.jsx`. */}
    </>
  );
}
