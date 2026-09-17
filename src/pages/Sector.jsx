import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PATHS } from '../routes/paths';
import { getSector } from '../services/contentService';
import NotFound from './NotFound';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Página de un sector: /sectores/eventos, /sectores/fabricas, etc.
 *
 * Un mismo componente sirve a todos los sectores; el contenido lo trae el
 * slug de la URL. Si el slug no existe, muestra la página de error en vez
 * de romperse: es una URL que alguien puede escribir mal o compartir vieja.
 */
export default function Sector() {
  const { slug } = useParams();
  const sector = getSector(slug);

  if (!sector) return <NotFound />;

  return (
    <>
      <PageHero eyebrow="Sectores" title={sector.title} subtitle={sector.text} />

      <Section>
        <p className="font-mono text-sm text-fg-mute">Contenido a definir con el cliente.</p>

        <Link
          to={PATHS.sectores}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg-soft transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Ver todos los sectores
        </Link>
      </Section>
    </>
  );
}
