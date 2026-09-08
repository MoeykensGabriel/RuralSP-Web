import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';

import { site } from '../../config/site';
import { PATHS } from '../../routes/paths';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import Button from '../ui/Button';
import Container from '../ui/Container';

/**
 * Header del sitio. Mobile first:
 *   - hasta 900px  -> logo a la izquierda + botón hamburguesa a la derecha
 *   - desde 900px  -> logo a la izquierda + navegación a la derecha
 *
 * El breakpoint `menu:` (900px) está definido en `index.css`.
 * Los ítems del menú salen de `config/site.js`.
 */

/** Subrayado animado del link activo / en hover. */
const NAV_LINK =
  'relative py-2 text-sm font-medium transition-colors ' +
  'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left ' +
  'after:scale-x-0 after:bg-fg after:transition-transform hover:after:scale-x-100';

const ICON_BTN =
  'inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border ' +
  'border-line transition-colors hover:border-line-strong hover:bg-bg-soft';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useLockBodyScroll(menuOpen);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Escape cierra el panel (accesibilidad de teclado).
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between gap-4 menu:min-h-19">
        <Link
          to={PATHS.home}
          className="inline-flex shrink-0 items-center gap-3"
          aria-label={`${site.fullName} — inicio`}
        >
          {/* alt vacío a propósito: el nombre ya está en el texto de al lado
              y el enlace tiene su aria-label. Repetirlo sería ruido. */}
          {/* El tamaño lo manda la clase `size-*`, no los atributos width/height:
              esos solo reservan el espacio para que no salte la página al cargar. */}
          <img
            src={site.logo}
            alt=""
            width="60"
            height="60"
            className="size-12 shrink-0 rounded-full object-cover menu:size-15"
          />
          <span className="flex flex-col">
            <span className="font-mono text-base font-bold tracking-wide">{site.name}</span>
            <span className="hidden text-xs leading-tight text-fg-mute sm:block">
              {site.tagline}
            </span>
          </span>
        </Link>

        {/* El `justify-between` del contenedor deja la marca a la izquierda
            y esto a la derecha. En mobile la nav se oculta y el lugar de la
            derecha lo ocupa el botón hamburguesa. */}
        <nav className="hidden items-center gap-8 menu:flex" aria-label="Navegación principal">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === PATHS.home}
              className={({ isActive }) =>
                `${NAV_LINK} ${
                  isActive ? 'font-semibold text-fg after:scale-x-100' : 'text-fg-soft hover:text-fg'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className={`${ICON_BTN} menu:hidden`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Panel mobile. Cada link cierra el panel al navegar. */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 z-40 flex animate-slide-down flex-col gap-4 border-b border-line bg-bg px-5 pt-6 pb-8 shadow-xl menu:hidden"
        >
          <nav className="flex flex-col" aria-label="Navegación mobile">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === PATHS.home}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-line py-4 text-lg ${
                    isActive ? 'font-bold text-fg' : 'font-medium text-fg-soft'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button href={site.contact.phoneHref} onClick={closeMenu} block>
            <Phone size={16} aria-hidden="true" />
            Llamar ahora
          </Button>
        </div>
      )}
    </header>
  );
}
