import { Link } from 'react-router-dom';

/**
 * Botón único de todo el sitio. Cambia de etiqueta según lo que reciba:
 *
 *   <Button to="/contacto">      -> <Link>   (navegación interna)
 *   <Button href="tel:...">      -> <a>      (link externo, teléfono, mail)
 *   <Button onClick={...}>       -> <button> (acción)
 *
 * Las clases viven acá y no en el markup de cada página: así todos los
 * botones del sitio se cambian desde un solo archivo.
 */
const BASE =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border ' +
  'font-semibold leading-tight whitespace-nowrap transition-colors active:translate-y-px';

const VARIANTS = {
  primary: 'border-inverse-bg bg-inverse-bg text-inverse-fg hover:bg-transparent hover:text-fg',
  secondary: 'border-line-strong bg-transparent text-fg hover:bg-inverse-bg hover:text-inverse-fg',
  ghost: 'border-line bg-transparent text-fg-soft hover:border-line-strong hover:text-fg',
  /**
   * Botón oscuro, al revés que `primary`. Va sobre superficies claras: hoy,
   * el panel del formulario de contacto.
   */
  inverse:
    'border-inverse-fg bg-inverse-fg text-inverse-bg hover:bg-transparent hover:text-inverse-fg',
  accent: 'border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700',
};

const SIZES = {
  md: 'px-5 py-3 text-sm',
  sm: 'px-3.5 py-2 text-xs',
};

export default function Button({
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  ...props
}) {
  const classes = [BASE, VARIANTS[variant], SIZES[size], block && 'w-full', className]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : null)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
