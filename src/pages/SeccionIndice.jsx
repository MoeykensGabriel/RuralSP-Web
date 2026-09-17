import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { rutaItem } from '../routes/paths';
import { getSeccion } from '../services/contentService';
import NotFound from './NotFound';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Índice de una sección: lista sus subpáginas y lleva a cada una.
 *
 * Es genérico: la misma página sirve para Sectores, Seguridad física y
 * cualquier sección que se agregue después. El contenido lo trae el `slug`
 * que le pasa la ruta en `App.jsx`.
 */
export default function SeccionIndice({ slug }) {
  const seccion = getSeccion(slug);

  if (!seccion) return <NotFound />;

  return (
    <>
      <PageHero eyebrow={seccion.eyebrow} title={seccion.titulo} subtitle={seccion.bajada} />

      <Section>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 menu:grid-cols-3 menu:gap-6">
          {seccion.items.map((item) => (
            <li key={item.id}>
              {/* El enlace envuelve toda la tarjeta: así el área para tocar
                  es la tarjeta entera y no solo el texto, que en un celular
                  es la diferencia entre acertar y no. */}
              <Link
                to={rutaItem(seccion.slug, item.slug)}
                className="group flex h-full flex-col rounded-xl border border-line bg-bg p-6 transition-colors hover:border-line-strong"
              >
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-3 text-sm text-fg-soft">{item.text}</p>
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
