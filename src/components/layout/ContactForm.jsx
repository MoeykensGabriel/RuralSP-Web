import { useState } from 'react';
import { ArrowUpRight, Check, Clock, Mail, MapPin, Phone } from 'lucide-react';

import { site } from '../../config/site';
import { getContactReasons } from '../../services/contentService';
import Button from '../ui/Button';
import Container from '../ui/Container';

/**
 * Formulario de contacto del pie. Se monta dentro del Footer, así que
 * aparece al final de TODAS las páginas.
 *
 * Mobile: formulario arriba, datos de contacto abajo.
 * Desktop: dos columnas, formulario a la izquierda.
 *
 * BOCETO: todavía no envía a ningún lado. Ver `handleSubmit`.
 */

const VACIO = {
  nombre: '',
  empresa: '',
  telefono: '',
  email: '',
  localidad: '',
  servicio: '',
  mensaje: '',
  privacidad: false,
  comerciales: false,
};

/**
 * El panel del formulario es la ÚNICA superficie clara del sitio. Por eso
 * de acá para abajo los colores son fijos (neutral-*) y no los tokens del
 * tema, que están pensados para fondo oscuro y acá se verían invisibles.
 */
const CAMPO =
  'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 ' +
  'transition-colors placeholder:text-neutral-400 hover:border-neutral-400 ' +
  'focus:border-neutral-900 focus:outline-none';

const ETIQUETA =
  'mb-2 block font-mono text-[0.68rem] tracking-[0.12em] text-neutral-500 uppercase';

export default function ContactForm() {
  const servicios = getContactReasons();
  const [form, setForm] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((actual) => ({ ...actual, [name]: type === 'checkbox' ? checked : value }));
    setErrores((actual) => ({ ...actual, [name]: undefined }));
  };

  const validar = () => {
    const found = {};
    if (!form.nombre.trim()) found.nombre = 'Ingresá tu nombre.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Ingresá un email válido.';
    if (form.mensaje.trim().length < 10) found.mensaje = 'Contanos un poco más.';
    if (!form.privacidad) found.privacidad = 'Necesitamos tu conformidad para poder responderte.';
    return found;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const encontrados = validar();
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    // BOCETO: acá va la llamada real cuando definamos a dónde llegan las
    // consultas — un mail, un webhook de WhatsApp o un backend propio.
    setEnviado(true);
    setForm(VACIO);
  };

  return (
    <div className="border-b border-line py-16 menu:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 menu:grid-cols-[1.15fr_0.85fr] menu:gap-20">
          {/* ── Formulario ───────────────────────────────────────────
              Panel claro sobre el fondo oscuro: es el punto de conversión
              de la página y el contraste lo vuelve lo primero que se mira.
              El `[&_:focus-visible]` redefine el anillo de foco, que por
              defecto es claro y acá sería invisible. */}
          <div className="rounded-2xl bg-inverse-bg p-6 text-inverse-fg [&_:focus-visible]:outline-neutral-900 menu:p-10">
            <h2 className="text-2xl font-bold menu:text-3xl">Más información</h2>
            <p className="mt-3 text-sm text-neutral-600">
              Completá el formulario y nos ponemos en contacto a la brevedad.
            </p>

            {enviado && (
              <p
                role="status"
                className="mt-6 flex items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-100 px-4 py-3 text-sm font-medium"
              >
                <Check size={16} aria-hidden="true" />
                Recibimos tu consulta. Te respondemos a la brevedad.
              </p>
            )}

            <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={ETIQUETA} htmlFor="cf-nombre">
                    Nombre y apellido *
                  </label>
                  <input
                    id="cf-nombre"
                    name="nombre"
                    className={CAMPO}
                    value={form.nombre}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errores.nombre && <TextoError>{errores.nombre}</TextoError>}
                </div>

                <div>
                  <label className={ETIQUETA} htmlFor="cf-empresa">
                    Empresa
                  </label>
                  <input
                    id="cf-empresa"
                    name="empresa"
                    className={CAMPO}
                    value={form.empresa}
                    onChange={handleChange}
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label className={ETIQUETA} htmlFor="cf-email">
                    Email *
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className={CAMPO}
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errores.email && <TextoError>{errores.email}</TextoError>}
                </div>

                <div>
                  <label className={ETIQUETA} htmlFor="cf-telefono">
                    Teléfono
                  </label>
                  <input
                    id="cf-telefono"
                    name="telefono"
                    type="tel"
                    className={CAMPO}
                    value={form.telefono}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label className={ETIQUETA} htmlFor="cf-localidad">
                    Localidad
                  </label>
                  <input
                    id="cf-localidad"
                    name="localidad"
                    className={CAMPO}
                    value={form.localidad}
                    onChange={handleChange}
                    autoComplete="address-level2"
                  />
                </div>

                <div>
                  <label className={ETIQUETA} htmlFor="cf-servicio">
                    Servicio de interés
                  </label>
                  <select
                    id="cf-servicio"
                    name="servicio"
                    className={CAMPO}
                    value={form.servicio}
                    onChange={handleChange}
                  >
                    <option value="">Seleccioná una opción</option>
                    {servicios.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={ETIQUETA} htmlFor="cf-mensaje">
                  Mensaje *
                </label>
                <textarea
                  id="cf-mensaje"
                  name="mensaje"
                  rows={5}
                  className={`${CAMPO} resize-y`}
                  value={form.mensaje}
                  onChange={handleChange}
                />
                {errores.mensaje && <TextoError>{errores.mensaje}</TextoError>}
              </div>

              <div className="flex flex-col gap-3">
                <Casilla
                  id="cf-privacidad"
                  name="privacidad"
                  checked={form.privacidad}
                  onChange={handleChange}
                >
                  Acepto la política de privacidad y el tratamiento de mis datos para recibir una
                  respuesta. *
                </Casilla>
                {errores.privacidad && <TextoError>{errores.privacidad}</TextoError>}

                <Casilla
                  id="cf-comerciales"
                  name="comerciales"
                  checked={form.comerciales}
                  onChange={handleChange}
                >
                  Quiero recibir novedades y comunicaciones comerciales.
                </Casilla>
              </div>

              <Button type="submit" variant="inverse" className="mt-2 self-start">
                Enviar consulta
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>

              <p className="text-xs text-neutral-500">
                Formulario de demostración: todavía no envía datos a ningún servidor.
              </p>
            </form>
          </div>

          {/* ── Texto y datos ──────────────────────────────────────── */}
          <div className="menu:pt-6">
            <h2 className="text-xl font-bold">
              ¿Tenés alguna consulta? ¿Querés contratar nuestros servicios?
            </h2>

            <div className="mt-5 space-y-4 text-sm text-fg-soft">
              <p>
                Contratar una empresa de seguridad plantea preguntas que conviene resolver antes de
                firmar. No dudes en escribirnos.
              </p>
              <p>
                Completá el formulario con tus datos y tu consulta, y nos llega directamente.
                Respondemos consultas comerciales dentro de las 24 horas hábiles.
              </p>
            </div>

            <ul className="mt-8 flex flex-col border-t border-line">
              <Dato icono={Phone} etiqueta="Teléfono">
                <a href={site.contact.phoneHref} className="hover:underline hover:underline-offset-4">
                  {site.contact.phone}
                </a>
              </Dato>
              <Dato icono={Mail} etiqueta="Email">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:underline hover:underline-offset-4"
                >
                  {site.contact.email}
                </a>
              </Dato>
              <Dato icono={MapPin} etiqueta="Dirección">
                {site.contact.address}
              </Dato>
              <Dato icono={Clock} etiqueta="Horarios">
                {site.contact.hours}
              </Dato>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ── Piezas internas, solo para este archivo ─────────────────────────── */

function TextoError({ children }) {
  return <span className="mt-2 block text-xs font-semibold text-neutral-900">{children}</span>;
}

function Casilla({ id, name, checked, onChange, children }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-xs text-neutral-600">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 size-4 shrink-0 accent-neutral-900"
      />
      <span>{children}</span>
    </label>
  );
}

function Dato({ icono: Icono, etiqueta, children }) {
  return (
    <li className="flex items-start gap-4 border-b border-line py-4">
      <Icono size={16} aria-hidden="true" className="mt-1 shrink-0 text-fg-mute" />
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[0.65rem] tracking-[0.12em] text-fg-mute uppercase">
          {etiqueta}
        </span>
        <span className="text-sm">{children}</span>
      </div>
    </li>
  );
}
