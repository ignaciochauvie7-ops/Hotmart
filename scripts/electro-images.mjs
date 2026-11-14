// Genera variantes ligeras de las imágenes de /public/electrodomesticos en
// /public/electrodomesticos/opt (no se versiona; se regenera en cada build):
//   · AVIF de las imágenes grandes (hero y pack)
//   · miniatura de 160 px de las portadas de bonus (se pintan a 40 px)
// Los originales no se tocan. Si algo falla, el build sigue y la landing usa
// los .webp originales (ver listImages + <Img>).
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.join(process.cwd(), 'public', 'electrodomesticos');
const OUT = path.join(SRC, 'opt');

/** [origen, destino, transformación] */
const jobs = (files) => [
  ...['hero-mockup.webp', 'oferta-pack.webp']
    .filter((f) => files.includes(f))
    .map((f) => [f, f.replace(/\.webp$/, '.avif'), (img) => img.avif({ quality: 62, effort: 6 })]),
  ...files
    .filter((f) => /^bonus-\d+\.webp$/.test(f))
    .map((f) => [f, f.replace(/\.webp$/, '-160.webp'), (img) => img.resize({ width: 160 }).webp({ quality: 80, effort: 6 })]),
];

try {
  const { default: sharp } = await import('sharp');
  const files = fs.readdirSync(SRC);
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  for (const [from, to, transform] of jobs(files)) {
    const src = path.join(SRC, from);
    const buf = await transform(sharp(src)).toBuffer();
    // Solo se guarda si de verdad pesa menos que el original.
    if (buf.length < fs.statSync(src).size) {
      fs.writeFileSync(path.join(OUT, to), buf);
      console.log(`[electro-images] ${to} ${(buf.length / 1024).toFixed(1)} kB`);
    }
  }
} catch (err) {
  console.warn('[electro-images] omitido:', err?.message ?? err);
}
