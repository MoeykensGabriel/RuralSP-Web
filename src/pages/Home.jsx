import { ArrowUpRight, Contact2Icon, Navigation } from 'lucide-react';
import { site } from '../config/site';
import { PATHS, rutaItem } from '../routes/paths';
import { getPartners, getSeccion } from '../services/contentService';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import LogoCarousel from '../components/ui/LogoCarousel';
import MapaTucuman from '../components/ui/MapaTucuman';
import Section from '../components/ui/Section';
import TarjetaItem from '../components/ui/TarjetaItem';

export default function Home() {
  const partners = getPartners();
  // La home muestra los sectores; el resto de la seccion vive en /sectores.
  const sectores = getSeccion('sectores');

  return (
    <>
      {/* ── 2. Hero ───────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#101114] text-white">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#101114] via-[#101114]/85 to-transparent" />
        </div>

        <Container className="py-24 animate-fade-in-up menu:py-36">
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

      {/* ── 3. Prueba social (Carrusel de empresas) ────────────────────── */}
      <section className="border-t border-line pt-12 pb-16 menu:pt-16 menu:pb-24">
        <Container>
          <p className="mb-12 text-center font-mono text-base font-medium tracking-[0.12em] text-fg uppercase menu:text-lg">
            Empresas que confían en nosotros
          </p>
        </Container>
        <LogoCarousel items={partners} />
      </section>

      {/* ── 4. Sectores ─────────────────────────────────────────────────
          1 columna en mobile · 2 desde 640px. */}
      <Section
        alt
        className="border-t border-line"
        eyebrow="Dónde trabajamos"
        title="Sectores"
        subtitle="Los rubros en los que la empresa tiene experiencia."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      {/* ── 5. Presencia y Operaciones en Acción (Video) ───────────────── */}
      <Section
        center
        className="border-t border-line"
        eyebrow="En acción"
        title="Presencia y Cobertura Operativa"
        subtitle="Supervisión permanente, despliegue físico y protección en terreno."
      >
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-2xl transition-all duration-300">
          <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
            <video
              src="/video-operaciones.mp4"
              controls
              autoPlay
              muted
              loop
              playsInline
              className="size-full object-contain"
            />
          </div>
          <div className="p-5 text-center sm:p-7">
            <h3 className="text-lg font-bold text-white sm:text-xl">Vigilancia y Protección Operativa</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-soft sm:text-base">
              Despliegue de seguridad física, control de accesos y presencia preventiva en eventos, sectores agrícolas,
              predios industriales y urbanizaciones en Tucumán y el norte argentino.
            </p>
          </div>
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
                <Contact2Icon size={18} aria-hidden="true" className="mt-1 shrink-0 text-fg-mute" />
                <div>
                  <dt className="eyebrow">Contacto</dt>
                  <dd className="mt-1">{site.contact.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b border-line py-4">
                <Navigation size={18} aria-hidden="true" className="mt-1 shrink-0 text-fg-mute" />
                <div>
                  <dt className="eyebrow">Zona de trabajo</dt>
                  <dd className="mt-1">Tucuman</dd>
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
