import { site } from '../config/site';
import { PATHS } from '../routes/paths';
import { getPartners } from '../services/contentService';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import LogoCarousel from '../components/ui/LogoCarousel';

/**
 * Home del boceto: solo lo indispensable hasta definir el contenido
 * real con el cliente.
 *   1. Hero — título, bajada y un único botón.
 *   2. Carrusel de empresas con las que trabaja.
 */
export default function Home() {
  const partners = getPartners();

  return (
    <>
      <section className="py-12 menu:pt-16 menu:pb-24">
        <Container>
          <h1 className="max-w-[18ch] text-[clamp(2rem,6vw,3.5rem)] font-bold tracking-tight">
            {site.slogan}
          </h1>
          <p className="mt-4 max-w-[56ch] text-lg text-fg-soft">{site.description}</p>
          <Button to={PATHS.contacto} className="mt-8">
            Contactanos
          </Button>
        </Container>
      </section>

      <section className="border-t border-line bg-bg-soft py-8 menu:py-12">
        <Container>
          <p className="eyebrow mb-6">Trabajamos con</p>
        </Container>
        <LogoCarousel items={partners} />
      </section>
    </>
  );
}
