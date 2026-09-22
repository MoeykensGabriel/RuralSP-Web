import { rutaItem } from '../routes/paths';
import { getSeccion } from '../services/contentService';
import NotFound from './NotFound';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import TarjetaItem from '../components/ui/TarjetaItem';

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
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {seccion.items.map((item) => (
            <li key={item.id}>
              <TarjetaItem
                to={rutaItem(seccion.slug, item.slug)}
                title={item.title}
                text={item.text}
                imagen={item.imagen}
                imagenAlt={item.imagenAlt}
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
