import { MessageSquare } from 'lucide-react';
import { site } from '../../config/site';

/**
 * Botón flotante de WhatsApp de alta conversión.
 * Se ubica en la esquina inferior derecha con un indicador verde pulsante
 * ("En línea / Consultar ahora") e interactúa suavemente al pasar el mouse.
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
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-neutral-700/80 bg-neutral-900/90 p-3 px-4.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:bg-neutral-900 active:scale-95"
    >
      <span className="relative flex size-2.5 items-center justify-center">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
      </span>
      <MessageSquare size={18} className="text-emerald-400 transition-transform group-hover:scale-110" />
      <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 transition-colors group-hover:text-white">
        Consultar ahora
      </span>
    </a>
  );
}
