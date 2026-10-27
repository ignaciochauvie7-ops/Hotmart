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
  pl: {
    main: [
      '1 - Plaski Brzuch w 28 Dni.pdf',
      '2 - BONUS - 30 Przepisow Przeciwzapalnych.pdf',
      '3 - BONUS - Tracker na 28 Dni (do druku).pdf',
      '4 - BONUS - Jedz na Miescie bez Wzdec.pdf',
      '5 - BONUS - Plan Ratunkowy na 3 Dni.pdf',
    ],
    bump: ['EXTRA - Znow Dobrze Spij w 21 Dni.pdf'],
    upsell: ['EXTRA - Zegnaj Wzdecie w 14 Dni.pdf'],
  },
  cs: {
    main: [
      '1 - Ploche Bricho za 28 Dni.pdf',
      '2 - BONUS - 30 Protizanetlivych Receptu.pdf',
      '3 - BONUS - Tracker na 28 Dni (k tisku).pdf',
      '4 - BONUS - Jez Venku bez Nadymani.pdf',
      '5 - BONUS - Zachranny Plan na 3 Dny.pdf',
    ],
    bump: ['EXTRA - Zase Dobre Spi za 21 Dni.pdf'],
    upsell: ['EXTRA - Sbohem Nadymani za 14 Dni.pdf'],
  },
};

/**
 * Main reto PDFs that are ~29 MB — too large for Vercel's buffered function
 * response (4.5 MB cap). These are hosted on public Google Drive and served by
 * a 302 redirect from the signed download route (after the Dodo payment check),
 * so auth + payment gating are preserved while the bytes bypass the function.
 * `es` is intentionally absent (unchanged). Only the `main` bucket's first file
 * (the big reto) maps here; its 4 bonuses + the 2 extras stay local.
 */
const driveMain: Partial<Record<MenoLocale, { file: string; id: string }>> = {
  pl: { file: '1 - Plaski Brzuch w 28 Dni.pdf', id: '1BGd0HROAZGROGhLJs0GLgK0rxdxF-5kU' },
  cs: { file: '1 - Ploche Bricho za 28 Dni.pdf', id: '1SC6rdcyJMqzjAXEOMHxh56I022ae7yGH' },
};

/**
 * If `file` is a Drive-hosted main for `locale`, return its direct download URL
 * (`confirm=t` skips Google's large-file virus-scan interstitial). Else null →
 * the caller serves the file locally.
 */
export function driveDownloadUrl(locale: MenoLocale, file: string): string | null {
  const d = driveMain[locale];
  if (!d || d.file !== file) return null;
  return `https://drive.usercontent.google.com/download?id=${d.id}&export=download&confirm=t`;
}

export function filesFor(locale: MenoLocale, bucket: ProductBucket): string[] {
  return files[locale]?.[bucket] ?? [];
}

/** True if `file` legitimately belongs to the given locale+bucket. */
export function fileBelongs(locale: MenoLocale, bucket: ProductBucket, file: string): boolean {
  return filesFor(locale, bucket).includes(file);
}
