import { Mail, MapPin, Phone } from 'lucide-react';

import { site } from '../config/site';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

/**
 * Solo los datos de contacto, que salen de `config/site.js`.
 * El formulario se agrega cuando definamos a dónde tienen que llegar
 * las consultas (mail, WhatsApp o un backend).
 */
const ITEM = 'flex items-start gap-4 border-t border-line py-4 last:border-b';
const LABEL = 'font-mono text-[0.7rem] tracking-[0.12em] text-fg-mute uppercase';
const LINK = 'hover:underline hover:underline-offset-4';

export default function Contacto() {
  return (
    <>
      <PageHero title="Contacto" />
      <Section>
        <ul className="flex max-w-[520px] flex-col">
          <li className={ITEM}>
            <Phone size={18} aria-hidden="true" className="mt-1 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className={LABEL}>Teléfono</span>
              <a href={site.contact.phoneHref} className={LINK}>
                {site.contact.phone}
              </a>
            </div>
          </li>
          <li className={ITEM}>
            <Mail size={18} aria-hidden="true" className="mt-1 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className={LABEL}>Email</span>
              <a href={`mailto:${site.contact.email}`} className={LINK}>
                {site.contact.email}
              </a>
            </div>
          </li>
          <li className={ITEM}>
            <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className={LABEL}>Dirección</span>
              <span>{site.contact.address}</span>
            </div>
          </li>
        </ul>
      </Section>
    </>
  );
}
