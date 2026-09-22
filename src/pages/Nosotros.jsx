import { getNosotros } from '../services/contentService';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Página Nosotros. Todo el texto sale de `getNosotros()` en
 * `services/contentService.js`: acá solo se define cómo se acomoda.
 *
 *   1. Presentación — quiénes son
 *   2. Equipo directivo — una tarjeta por socio
 *   3. Trayectoria — los años de la empresa y hacia dónde van
 *
 * Mobile: todo en una columna.
 * Desktop: las tarjetas del equipo lado a lado, y la trayectoria con el
 * número grande a la izquierda y el texto a la derecha.
 */
export default function Nosotros() {
  const { empresa, lema, intro, equipo, trayectoria } = getNosotros();

  return (
    <>
      <PageHero eyebrow="Sobre nosotros" title={empresa} subtitle={lema} />

      {/* ── 1. Presentación ─────────────────────────────────────────── */}
      <Section className="relative">
        <div className="relative isolate overflow-hidden rounded-3xl border border-neutral-800 bg-[#101114] p-6 shadow-2xl sm:p-10 menu:p-12">
          <div className="grid grid-cols-1 items-center gap-8 menu:grid-cols-12 menu:gap-12">
            {/* Texto a la izquierda */}
            <div className="menu:col-span-6 menu:py-4">
              <p className="eyebrow text-neutral-400">Quiénes Somos</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl menu:text-4xl">
                Soluciones integrales de seguridad física
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-300 sm:text-lg">
                {intro.map((parrafo) => (
                  <p key={parrafo}>{parrafo}</p>
                ))}
              </div>
            </div>

            {/* Imagen a la derecha con degradado suave transparente en su borde izquierdo sin recorte abrupto */}
            <div className="relative menu:col-span-6 menu:h-full menu:min-h-[420px] flex items-center justify-center menu:justify-end">
              <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl menu:border-none menu:shadow-none menu:rounded-none">
                <img
                  src="/sobre-nosotros.png"
                  alt="Personal de Rural Seguridad Privada"
                  className="w-full h-auto max-h-[440px] object-cover object-center menu:h-full menu:max-h-none menu:w-full"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, black 45%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, black 45%)',
                  }}
                />
                {/* Degradado adicional de sombra de respaldo para integrarse perfectamente */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101114] via-transparent to-transparent menu:bg-gradient-to-r menu:from-[#101114] menu:via-transparent menu:to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 2. Equipo directivo ─────────────────────────────────────── */}
      <Section alt className="border-t border-line" title={equipo.titulo}>
        <div className="grid grid-cols-1 items-center gap-10 menu:grid-cols-2 menu:gap-14">
          {equipo.imagen && (
            <div className="overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl">
              <img
                src={equipo.imagen}
                alt={equipo.imagenAlt ?? equipo.titulo}
                decoding="async"
                className="aspect-[3/4] max-h-[520px] w-full object-cover object-top transition-transform duration-500 hover:scale-105 menu:max-h-[580px]"
              />
            </div>
          )}

          <ul className="flex flex-col gap-6">
            {equipo.miembros.map((miembro) => (
              <li
                key={miembro.nombre}
                className="group rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-900/80 hover:shadow-xl sm:p-8"
              >
                <p className="eyebrow">{miembro.cargo}</p>
                <h3 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-white menu:text-2xl">
                  {miembro.nombre}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-soft sm:text-base">{miembro.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── 3. Trayectoria ──────────────────────────────────────────── */}
      <Section className="border-t border-line">
        <div className="grid grid-cols-1 gap-8 menu:grid-cols-[auto_1fr] menu:gap-16">
          <div aria-hidden="true">
            {/* Decorativo: el mismo dato ya está dicho en el título de al
                lado, así que se oculta a los lectores de pantalla para que
                no lo lean dos veces. */}
            <p className="font-mono text-7xl leading-none font-bold menu:text-8xl">
              {trayectoria.anios}
            </p>
            <p className="eyebrow mt-3">años de trayectoria</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold menu:text-3xl">{trayectoria.titulo}</h2>
            <div className="mt-5 max-w-[62ch] space-y-4 text-fg-soft">
              {trayectoria.parrafos.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
