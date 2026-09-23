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
        <div className="relative isolate overflow-hidden rounded-3xl border border-neutral-800 bg-[#101114] p-5 shadow-2xl sm:p-8 menu:p-14">
          {/* Imagen de fondo (activa en Desktop) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden menu:block">
            <img
              src="/sobre-nosotros.png"
              alt="Personal de Rural Seguridad Privada"
              className="h-full w-full object-cover object-center"
            />
            {/* Degradado continuo en Desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#101114] via-[#101114]/85 to-transparent" />
          </div>

          <div className="max-w-full menu:max-w-2xl">
            <p className="eyebrow text-neutral-400">Quiénes Somos</p>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-3xl menu:text-4xl">
              Soluciones integrales de seguridad física
            </h2>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-300 sm:mt-6 sm:space-y-4 sm:text-base menu:text-lg">
              {intro.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>

            {/* En Mobile (< menu): Imagen destacada clara debajo del texto sin taparla ni estirar la pantalla */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-800/90 shadow-xl menu:hidden">
              <img
                src="/sobre-nosotros.png"
                alt="Personal de Rural Seguridad Privada"
                className="aspect-video w-full object-cover object-center"
              />
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
