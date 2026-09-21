import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react';

import { PATHS, rutaSeccion } from '../routes/paths';
import { getItemDeSeccion, getSeccion } from '../services/contentService';
import { site } from '../config/site';
import NotFound from './NotFound';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

/**
 * Página de detalle de un sector o servicio.
 *
 * Muestra el diseño completo institucional:
 *   1. Encabezado principal con título rojo destacado y subtítulo.
 *   2. Imagen principal del sector.
 *   3. Columna izquierda con descripción detallada y lista de ventajas.
 *   4. Tarjeta lateral flotante con puntos clave en rojo y botón "Saber Más".
 */
export default function SeccionItem({ slug }) {
  const { item: slugItem } = useParams();
  const seccion = getSeccion(slug);
  const item = getItemDeSeccion(slug, slugItem);

  if (!seccion || !item) return <NotFound />;

  const isSector = slug === 'sectores';

  // Título rojo destacado idéntico al diseño de referencia
  const heroTitle = isSector
    ? `Servicio de seguridad para ${item.title.toLowerCase()}`
    : item.title;

  const heroSubtitle =
    item.bajada ||
    `En ${site.name} nos destacamos por contar con servicios de seguridad especializados para ${item.title.toLowerCase()}, con respeto a la privacidad y la protección de su patrimonio.`;

  return (
    <article className="min-h-screen bg-bg text-fg">
      {/* ── 1. Hero Header (Fondo oscuro con título rojo principal) ─────── */}
      <header className="relative border-b border-line bg-neutral-900 pt-16 pb-20 text-center">
        <Container className="flex flex-col items-center">
          {/* Botón Volver / Miga de pan */}
          <Link
            to={rutaSeccion(seccion.slug)}
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-neutral-400 uppercase transition-colors hover:text-white"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {seccion.titulo}
          </Link>

          {/* Título Principal en Rojo Destacado */}
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white-600 sm:text-4xl md:text-5xl">
            {heroTitle}
          </h1>

          {/* Subtítulo */}
          <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-neutral-300 sm:text-lg">
            {heroSubtitle}
          </p>

          {/* Imagen Principal */}
          {item.imagen ? (
            <div className="mt-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl">
              <img
                src={item.imagen}
                alt={item.imagenAlt ?? item.title}
                decoding="async"
                className="aspect-[2/1] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ) : (
            <div className="mt-10 flex aspect-[2.2/1] w-full max-w-4xl items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950/80 shadow-2xl">
              <div className="flex flex-col items-center gap-3 text-neutral-500">
                <ShieldCheck size={48} className="text-red-600/80" />
                <span className="font-mono text-sm tracking-wider uppercase">{item.title}</span>
              </div>
            </div>
          )}
        </Container>
      </header>

      {/* ── 2. Cuerpo de Contenido (Texto Principal + Tarjeta Lateral Flotante) ── */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-16">
            {/* ── Columna Izquierda (Contenido Principal) ─────────────── */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                {item.title}
              </h2>
              {/* Línea decorativa roja */}
              <div className="mt-3 mb-8 h-1 w-16 rounded-full bg-red-600" />

              <div className="space-y-6 text-base leading-relaxed text-fg-soft sm:text-lg">
                <p>{item.text}</p>
                <p>
                  Nuestro sistema de seguridad para {item.title.toLowerCase()} está diseñado para ofrecer una
                  protección integral sin comprometer la comodidad y privacidad de residentes, visitantes
                  o personal. Con un enfoque centrado en la prevención y el control, nos esforzamos por garantizar un
                  ambiente seguro y tranquilo.
                </p>
                <p>
                  Con estos elementos en su lugar, ofrecemos un proyecto integral de seguridad para{' '}
                  {item.title.toLowerCase()} que cumple con los más altos estándares de calidad y protección.
                </p>
              </div>

              {/* Ventajas de Nuestro Servicio */}
              <div className="mt-12 border-t border-line pt-10">
                <h3 className="mb-6 text-xl font-bold text-fg">Ventajas de Nuestro Servicio:</h3>

                <ul className="space-y-6">
                  <li className="flex flex-col gap-1">
                    <strong className="text-base font-semibold text-fg">• Personal Capacitado:</strong>
                    <p className="pl-4 text-sm leading-relaxed text-fg-soft sm:text-base">
                      Contamos con un equipo de profesionales altamente capacitados, dedicados a garantizar la
                      seguridad de su comunidad e instalaciones.
                    </p>
                  </li>

                  <li className="flex flex-col gap-1">
                    <strong className="text-base font-semibold text-fg">• Tecnología Avanzada:</strong>
                    <p className="pl-4 text-sm leading-relaxed text-fg-soft sm:text-base">
                      Utilizamos sistemas de videovigilancia, cerco eléctrico, alarmas perimetrales y control de accesos de
                      última generación.
                    </p>
                  </li>

                  <li className="flex flex-col gap-1">
                    <strong className="text-base font-semibold text-fg">• Supervisión Permanente:</strong>
                    <p className="pl-4 text-sm leading-relaxed text-fg-soft sm:text-base">
                      Supervisión constante y patrullaje operativo continuo para asegurar el cumplimiento de las consignas
                      y la prevención del riesgo.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* ── Columna Derecha (Tarjeta Flotante) ─────────────────── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-900 shadow-2xl sm:p-8">
                <ul className="space-y-5 border-b border-neutral-200 pb-6">
                  <li className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <span className="text-base font-semibold text-neutral-800">Tranquilidad</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <span className="text-base font-semibold text-neutral-800">Prevención del delito</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <span className="text-base font-semibold text-neutral-800">
                      Tecnología al servicio de la seguridad
                    </span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-col items-center">
                  <Button
                    to={PATHS.contacto}
                    variant="inverse"
                    size="md"
                    block
                    className="py-3.5 text-base font-bold shadow-md hover:bg-white hover:text-neutral-900 hover:border-neutral-900 transition-colors"
                  >
                    Saber Más
                    <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </article>
  );
}
