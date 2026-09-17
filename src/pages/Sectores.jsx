import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { rutaSector } from '../routes/paths';
import { getSectores } from '../services/contentService';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Índice de sectores: los lista a todos y lleva a la página de cada uno.
 * La lista sale de `getSectores()`, así que sumar un sector la actualiza
 * sin tocar este archivo.
 */
export default function Sectores() {
  const sectores = getSectores();

  return (
    <>
      <PageHero
        eyebrow="Dónde trabajamos"
        title="Sectores"
        subtitle="Cada actividad tiene sus riesgos y su forma de operar. Estos son los rubros en los que trabajamos."
      />

      <Section>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 menu:grid-cols-3 menu:gap-6">
          {sectores.map((sector) => (
            <li key={sector.id}>
              {/* El enlace envuelve toda la tarjeta: así el área para tocar
                  es la tarjeta entera y no solo el texto, que en un celular
                  es la diferencia entre acertar y no. */}
              <Link
                to={rutaSector(sector.slug)}
                className="group flex h-full flex-col rounded-xl border border-line bg-bg p-6 transition-colors hover:border-line-strong"
              >
                <h2 className="text-lg font-bold">{sector.title}</h2>
                <p className="mt-3 text-sm text-fg-soft">{sector.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-fg">
                  Ver más
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
