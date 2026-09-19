import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { rutaSeccion } from '../routes/paths';
import { getItemDeSeccion, getSeccion } from '../services/contentService';
import NotFound from './NotFound';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Subpágina de una sección: /sectores/eventos, /seguridad-fisica/vigilancia...
 *
 * Un mismo componente sirve a todas. La sección la fija la ruta en
 * `App.jsx` y el ítem sale del slug de la URL. Si el slug no existe,
 * muestra la página de error en vez de romperse: es una URL que alguien
 * puede escribir mal o compartir vieja.
 */
export default function SeccionItem({ slug }) {
  const { item: slugItem } = useParams();
  const seccion = getSeccion(slug);
  const item = getItemDeSeccion(slug, slugItem);

  if (!seccion || !item) return <NotFound />;

  return (
    <>
      <PageHero eyebrow={seccion.titulo} title={item.title} subtitle={item.text} />

      <Section>
        {/* La foto nunca se muestra más grande que el archivo: estirarla
            la vuelve borrosa. `max-w-[600px]` es el ancho de la foto que
            hay hoy; si llega una más grande, se sube acá. */}
        {item.imagen && (
          <img
            src={item.imagen}
            alt={item.imagenAlt ?? ''}
            decoding="async"
            className="mb-10 aspect-[2/1] w-full max-w-[600px] rounded-xl border border-line object-cover"
          />
        )}

        <p className="font-mono text-sm text-fg-mute">Contenido a definir con el cliente.</p>

        <Link
          to={rutaSeccion(seccion.slug)}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg-soft transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Ver todo: {seccion.titulo}
        </Link>
      </Section>
    </>
  );
}
