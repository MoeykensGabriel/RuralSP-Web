/**
 * Caja centrada con ancho máximo y padding lateral.
 * Es el único lugar donde se define el ancho del contenido: si el cliente
 * pide una página más ancha, se cambia `--container-page` en `index.css`.
 */
export default function Container({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag className={`mx-auto w-full max-w-page px-5 menu:px-8 ${className}`.trim()}>{children}</Tag>
  );
}
