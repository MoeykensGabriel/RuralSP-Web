import { PATHS } from '../routes/paths';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-3 py-16">
      <p className="eyebrow">Error 404</p>
      <h1 className="text-[clamp(1.8rem,5vw,2.75rem)] font-bold">No encontramos esta página</h1>
      <p className="mb-3 text-fg-soft">
        Puede que el enlace esté viejo o que la dirección tenga un error de tipeo.
      </p>
      <Button to={PATHS.home}>Volver al inicio</Button>
    </Container>
  );
}
