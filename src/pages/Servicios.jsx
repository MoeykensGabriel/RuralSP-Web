import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Pendiente: cargar los servicios reales cuando el cliente los confirme.
 * Los datos van en `services/contentService.js`, no acá.
 */
export default function Servicios() {
  return (
    <>
      <PageHero title="Servicios" />
      <Section>
        <p className="font-mono text-sm text-fg-mute">Contenido a definir con el cliente.</p>
      </Section>
    </>
  );
}
