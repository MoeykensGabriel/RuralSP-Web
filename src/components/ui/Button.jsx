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
   * Para superficies siempre oscuras, como el hero. No usa los tokens del
   * tema porque el fondo es oscuro en tema claro y en tema oscuro por igual.
   */
  light: 'border-white bg-white text-neutral-950 hover:bg-transparent hover:text-white',
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
