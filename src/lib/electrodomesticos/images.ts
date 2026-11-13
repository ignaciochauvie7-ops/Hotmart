import fs from 'node:fs';
import path from 'node:path';

/**
 * Archivos presentes en /public/electrodomesticos (solo servidor / build).
 * Devuelve null cuando la carpeta no es legible (función serverless): en ese
 * caso el componente <Img> intenta cargar la imagen y cae al placeholder si falla.
 */
export function listImages(): string[] | null {
  try {
    return fs.readdirSync(path.join(process.cwd(), 'public', 'electrodomesticos'));
  } catch {
    return null;
  }
}
