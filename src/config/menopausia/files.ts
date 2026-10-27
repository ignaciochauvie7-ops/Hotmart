import type { MenoLocale, ProductBucket } from './products';

/**
 * Exact PDF filenames delivered per locale + product bucket.
 * Files live OUTSIDE /public, in /private/menopausia/[locale]/ and are served
 * only through the signed download route (never by direct URL).
 *
 * TODO (pt / pl): add the translated filenames once the products exist.
 */
export const files: Record<MenoLocale, Record<ProductBucket, string[]>> = {
  es: {
    main: [
      '1 - Abdomen Plano en 28 dias.pdf',
      '2 - BONUS - 30 Recetas Antiinflamatorias.pdf',
      '3 - BONUS - Tracker de 28 dias (imprimible).pdf',
      '4 - BONUS - Come fuera sin hincharte.pdf',
      '5 - BONUS - Plan Rescate de 3 dias.pdf',
    ],
    bump: ['EXTRA - Descansa Sin Sofocos - Plan de 21 noches.pdf'],
    upsell: ['EXTRA - Adios Hinchazon - Plan de 14 dias.pdf'],
  },
  pt: { main: [], bump: [], upsell: [] }, // TODO: nombres de archivos (pt)
  pl: { main: [], bump: [], upsell: [] }, // TODO: nombres de archivos (pl)
  cs: { main: [], bump: [], upsell: [] }, // TODO: nombres de archivos (cs)
};

export function filesFor(locale: MenoLocale, bucket: ProductBucket): string[] {
  return files[locale]?.[bucket] ?? [];
}

/** True if `file` legitimately belongs to the given locale+bucket. */
export function fileBelongs(locale: MenoLocale, bucket: ProductBucket, file: string): boolean {
  return filesFor(locale, bucket).includes(file);
}
