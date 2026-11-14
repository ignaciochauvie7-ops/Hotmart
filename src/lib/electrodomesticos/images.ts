import fs from 'node:fs';
import path from 'node:path';

/**
 * Archivos presentes en /public/electrodomesticos (solo servidor / build).
 * Incluye las variantes ligeras generadas en el build (`opt/…`, ver
 * scripts/electro-images.mjs) siempre que no sean más viejas que su original.
 * Devuelve null cuando la carpeta no es legible (función serverless): en ese
 * caso el componente <Img> intenta cargar la imagen y cae al placeholder si falla.
 */
export function listImages(): string[] | null {
  try {
    const dir = path.join(process.cwd(), 'public', 'electrodomesticos');
    const files = fs.readdirSync(dir);
    let opt: string[] = [];
    try {
      opt = fs.readdirSync(path.join(dir, 'opt')).filter((f) => {
        const source = f.replace(/(-\d+)?\.(avif|webp)$/, '.webp');
        if (!files.includes(source)) return false;
        return fs.statSync(path.join(dir, 'opt', f)).mtimeMs >= fs.statSync(path.join(dir, source)).mtimeMs;
      });
    } catch {
      /* sin variantes: se usan los originales */
    }
    return [...files, ...opt.map((f) => `opt/${f}`)];
  } catch {
    return null;
  }
}
