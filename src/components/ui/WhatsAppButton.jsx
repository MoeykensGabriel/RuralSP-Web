import { MessageSquare } from 'lucide-react';
import { site } from '../../config/site';

/**
 * Acceso directo a WhatsApp con el celular confirmado de la empresa.
 */
export default function WhatsAppButton() {
  const phoneClean = site.contact.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(
    'Hola! Quisiera solicitar información sobre los servicios de Rural Seguridad Privada.',
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-neutral-700/80 bg-neutral-900/90 px-5 py-3 shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-neutral-500 hover:bg-neutral-900 sm:bottom-6 sm:right-6"
    >
      <span className="relative flex size-2.5 items-center justify-center">
        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
      </span>
      <MessageSquare size={18} aria-hidden="true" className="text-emerald-400" />
      <span className="text-sm font-semibold text-neutral-200 transition-colors group-hover:text-white">
        WhatsApp
      </span>
    </a>
  );
}
