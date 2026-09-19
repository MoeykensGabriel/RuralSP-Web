/**
 * Genera los trazados SVG de los 17 departamentos de Tucumán a partir del
 * GeoJSON de geoBoundaries (fuente: Instituto Geográfico Nacional).
 *
 *   1. bajar los limites de todo el pais (5 MB, no se versiona):
 *      https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/ARG/ADM2/geoBoundaries-ARG-ADM2_simplified.geojson
 *   2. node scripts/generar-mapa-tucuman.cjs <ese archivo> src/components/ui/mapaTucuman.data.js
 */
const fs = require('fs');
const [entrada, salida] = process.argv.slice(2);

/* Los 17 departamentos. La clave es el nombre en el archivo de origen y el
   valor es el nombre oficial: el origen trae "Famallá" (con un error) y
   abrevia Juan Bautista Alberdi. */
const DEPARTAMENTOS = {
  Burruyacú: 'Burruyacú',
  Capital: 'Capital',
  Chicligasta: 'Chicligasta',
  'Cruz Alta': 'Cruz Alta',
  Famallá: 'Famaillá',
  Graneros: 'Graneros',
  'Juan B. Alberdi': 'Juan Bautista Alberdi',
  'La Cocha': 'La Cocha',
  Leales: 'Leales',
  Lules: 'Lules',
  Monteros: 'Monteros',
  'Río Chico': 'Río Chico',
  Simoca: 'Simoca',
  'Tafí del Valle': 'Tafí del Valle',
  'Tafí Viejo': 'Tafí Viejo',
  Trancas: 'Trancas',
  'Yerba Buena': 'Yerba Buena',
};

const geo = JSON.parse(fs.readFileSync(entrada, 'utf8'));

// El nombre "Capital" se repite en muchas provincias: se filtra también
// por el recuadro de Tucumán.
const dentro = (geom) => {
  let x = 0, y = 0, n = 0;
  const rec = (a) => (typeof a[0] === 'number' ? ((x += a[0]), (y += a[1]), n++) : a.forEach(rec));
  rec(geom.coordinates);
  const lon = x / n, lat = y / n;
  return lon > -66.3 && lon < -64.4 && lat > -28.1 && lat < -26.0;
};

const feats = geo.features.filter((f) => DEPARTAMENTOS[f.properties.shapeName] && dentro(f.geometry));
if (feats.length !== 17) throw new Error(`se esperaban 17 departamentos y hay ${feats.length}`);

/* Proyección equirectangular corregida por la latitud media: a esta escala
   (una provincia) la deformación es imperceptible. */
const LAT0 = (-26.9 * Math.PI) / 180;
const proyectar = ([lon, lat]) => [lon * Math.cos(LAT0), -lat];

// anillos de cada departamento, ya proyectados
const anillosDe = (geom) =>
  (geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates).flatMap((poly) =>
    poly.map((anillo) => anillo.map(proyectar)),
  );

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
const deptos = feats.map((f) => {
  const anillos = anillosDe(f.geometry);
  anillos.flat().forEach(([x, y]) => {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  });
  return { nombre: DEPARTAMENTOS[f.properties.shapeName], anillos };
});

// escala a un lienzo de 600 de ancho, conservando la proporción
const ANCHO = 600;
const PAD = 6;
const k = (ANCHO - 2 * PAD) / (maxX - minX);
const ALTO = Math.round((maxY - minY) * k + 2 * PAD);
const aLienzo = ([x, y]) => [(x - minX) * k + PAD, (y - minY) * k + PAD];

/* Douglas-Peucker: saca los vértices que no cambian la forma más de
   `tol` píxeles. Mantiene el SVG liviano sin que se note. */
function simplificar(pts, tol) {
  if (pts.length < 4) return pts;
  const dist = ([px, py], [ax, ay], [bx, by]) => {
    const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    if (!l2) return Math.hypot(px - ax, py - ay);
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  };
  const marcar = new Uint8Array(pts.length);
  marcar[0] = marcar[pts.length - 1] = 1;
  const pila = [[0, pts.length - 1]];
  while (pila.length) {
    const [i, j] = pila.pop();
    let max = 0, idx = -1;
    for (let m = i + 1; m < j; m++) {
      const d = dist(pts[m], pts[i], pts[j]);
      if (d > max) (max = d), (idx = m);
    }
    if (max > tol) { marcar[idx] = 1; pila.push([i, idx], [idx, j]); }
  }
  return pts.filter((_, i) => marcar[i]);
}

const r = (v) => Math.round(v * 10) / 10;
let vertOrig = 0, vertFinal = 0;
const salidaDeptos = deptos
  .map(({ nombre, anillos }) => {
    const d = anillos
      .map((anillo) => {
        const pts = anillo.map(aLienzo);
        vertOrig += pts.length;
        const s = simplificar(pts, 0.9);
        vertFinal += s.length;
        return 'M' + s.map(([x, y]) => `${r(x)} ${r(y)}`).join('L') + 'Z';
      })
      .join('');
    return { nombre, d };
  })
  .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

const js = `/**
 * Trazados SVG de los 17 departamentos de la provincia de Tucumán.
 *
 * ARCHIVO GENERADO: no editar a mano. Sale de scripts/generar-mapa-tucuman.cjs,
 * que proyecta y simplifica los límites oficiales.
 *
 * Fuente: Instituto Geográfico Nacional (IGN), vía geoBoundaries
 *   https://www.geoboundaries.org  —  ARG ADM2, año 2020
 * Licencia: Creative Commons Attribution 3.0 IGO (CC BY 3.0 IGO).
 *   Permite uso comercial con la condición de citar la fuente, que es lo
 *   que hace la leyenda debajo del mapa. No sacarla.
 *
 * Lienzo: ${ANCHO} x ${ALTO}. Vértices: ${vertOrig} en el origen, ${vertFinal} acá.
 */
export const VIEWBOX = '0 0 ${ANCHO} ${ALTO}';

export const DEPARTAMENTOS = ${JSON.stringify(salidaDeptos, null, 2)};
`;

fs.writeFileSync(salida, js);
console.log(`17 departamentos -> ${salida}`);
console.log(`lienzo ${ANCHO}x${ALTO}, vertices ${vertOrig} -> ${vertFinal}, ${(js.length / 1024).toFixed(1)} KB`);
