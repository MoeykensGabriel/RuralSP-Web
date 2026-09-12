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
      <Section>
        <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed text-fg-soft">
          {intro.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </div>
      </Section>

      {/* ── 2. Equipo directivo ─────────────────────────────────────── */}
      <Section alt className="border-t border-line" title={equipo.titulo}>
        <ul className="grid grid-cols-1 gap-4 menu:grid-cols-2 menu:gap-6">
          {equipo.miembros.map((miembro) => (
            <li
              key={miembro.nombre}
              className="flex flex-col rounded-xl border border-line bg-bg p-6 menu:p-8"
            >
              <p className="eyebrow">{miembro.cargo}</p>
              <h3 className="mt-3 text-xl font-bold menu:text-2xl">{miembro.nombre}</h3>
              <p className="mt-4 text-fg-soft">{miembro.descripcion}</p>
            </li>
          ))}
        </ul>
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
