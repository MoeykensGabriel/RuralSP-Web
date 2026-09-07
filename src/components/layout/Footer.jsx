import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, Shield } from 'lucide-react';

import { site } from '../../config/site';
import { PATHS } from '../../routes/paths';
import Container from '../ui/Container';

/**
 * Footer del sitio. Una columna en mobile, dos desde 640px y tres en desktop.
 * Igual que el header, los links salen de `config/site.js`.
 */
const COL_TITLE = 'mb-4 text-xs font-bold tracking-[0.12em] uppercase';
const LIST = 'flex flex-col gap-3 text-sm text-fg-soft';
const LINK = 'hover:text-fg hover:underline hover:underline-offset-4';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft pt-12 pb-6">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 menu:grid-cols-[1.6fr_1fr_1.2fr] menu:gap-12">
          <div className="flex flex-col gap-3">
            <Link to={PATHS.home} className="inline-flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-inverse-bg text-inverse-fg">
                <Shield size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="font-mono text-base font-bold tracking-wide">{site.name}</span>
            </Link>
            <p className="max-w-[46ch] text-sm text-fg-soft">{site.description}</p>
            <p className="font-mono text-[0.72rem] tracking-[0.08em] text-fg-mute">
              {site.legal.licence}
            </p>
          </div>

          <nav aria-label="Navegación del pie">
            <h2 className={COL_TITLE}>Navegación</h2>
            <ul className={LIST}>
              {site.nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={COL_TITLE}>Contacto</h2>
            <ul className={`${LIST} [&>li]:flex [&>li]:items-start [&>li]:gap-3 [&_svg]:mt-1 [&_svg]:shrink-0 [&_svg]:text-fg-mute`}>
              <li>
                <Phone size={15} aria-hidden="true" />
                <a href={site.contact.phoneHref} className={LINK}>
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <Mail size={15} aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className={LINK}>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <MapPin size={15} aria-hidden="true" />
                <span>{site.contact.address}</span>
              </li>
              <li>
                <Clock size={15} aria-hidden="true" />
                <span>{site.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-fg-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.legal.year} {site.name}. Todos los derechos reservados.
          </p>
          <p className="font-mono tracking-[0.06em]">Boceto de muestra · contenido de ejemplo</p>
        </div>
      </Container>
    </footer>
  );
}
