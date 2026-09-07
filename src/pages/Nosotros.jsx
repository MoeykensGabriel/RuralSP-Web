import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Pendiente: cargar la historia, el equipo y las habilitaciones reales
 * cuando el cliente los confirme.
 */
export default function Nosotros() {
  return (
    <>
      <PageHero title="Nosotros" />
      <Section>
        <p className="font-mono text-sm text-fg-mute">Contenido a definir con el cliente.</p>
      </Section>
    </>
  );
}
