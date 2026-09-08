# GB Seguridad — sitio institucional

Boceto de sitio web corporativo para una empresa de seguridad privada.
Página de presentación, sin funcionalidad compleja: mostrar la empresa,
sus servicios y facilitar el contacto.

> **Estado: boceto.** Todo el contenido es texto de ejemplo, a la espera de
> los datos reales del cliente. Ver [Pendientes](#pendientes).

## Stack

| | |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 (configurado desde el CSS, sin `tailwind.config.js`) |
| Ruteo | React Router 7 |
| Íconos | lucide-react |

## Arrancar

En Windows, doble clic en **`run.bat`**: instala las dependencias si hace falta,
levanta el servidor y abre el navegador solo.

Desde la terminal, en cualquier sistema:

```bash
npm install
npm run dev
```

Queda en http://localhost:5173

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve lo compilado, para probar el build |
| `npm run lint` | ESLint sobre todo el proyecto |

## Estructura

```
src/
├── config/site.js          Datos del cliente y menú de navegación
├── routes/paths.js         URLs centralizadas
├── services/               Contenido de las páginas (hoy, datos mock)
├── context/                Tema claro / oscuro
├── hooks/                  Hooks reutilizables
├── components/
│   ├── layout/             Layout, Header, Footer
│   └── ui/                 Button, Container, Section, PageHero, LogoCarousel
├── pages/                  Una página por ruta
└── index.css               Tokens de diseño y configuración de Tailwind
```

El criterio: **los componentes no definen contenido**. Los textos salen de
`services/`, los datos de la empresa de `config/site.js`, y los colores y
medidas de `index.css`.

## Dónde tocar cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, teléfono, mail, dirección, ítems del menú | `src/config/site.js` |
| Logos del carrusel de clientes | `src/services/contentService.js` |
| Colores, tipografías, breakpoints | `src/index.css` (bloque `@theme`) |
| Agregar una página | `src/pages/` + `src/routes/paths.js` + `src/App.jsx` |

### Cambiar la paleta

Todo el sitio sale de las variables de `@theme` en `src/index.css`. Cambiar
esos valores re-tiñe la página entera sin tocar ningún componente. El tema
oscuro solo las redefine bajo `[data-theme='dark']`.

### Cargar los logos de clientes

1. Guardar los archivos en `public/logos/` (SVG o PNG con fondo transparente)
2. En `src/services/contentService.js`, reemplazar `logo: null` por
   `logo: '/logos/nombre-del-archivo.svg'`
3. Poner el nombre real de la empresa en `name` (se usa como texto alternativo)

Mientras `logo` sea `null`, el carrusel muestra un recuadro punteado con el
nombre, para ver el espacio que va a ocupar.

## Decisiones tomadas

- **Mobile first.** Los estilos base son los del celular; las `@media
  (min-width: …)` van agrandando.
- **Multipágina**, no one-page con anclas.
- **Paleta blanco y negro**, pendiente de confirmar con el cliente.
- **Breakpoint propio `menu:` (900px)**: ahí el menú pasa de hamburguesa a
  navegación horizontal.
- El carrusel de logos está **pausado**. Para que se mueva, sacar
  `[animation-play-state:paused]` en `src/components/ui/LogoCarousel.jsx`.

## Pendientes

Falta definir con el cliente:

- [ ] Logo y colores institucionales
- [ ] Lista real de servicios
- [ ] Sectores en los que trabaja
- [ ] Logos de clientes **y autorización para publicarlos**
- [ ] Datos de contacto reales y número de habilitación
- [ ] Destino del formulario de contacto (mail, WhatsApp o backend)
- [ ] Secciones que faltan: sectores, servicios, valores y CTA final
