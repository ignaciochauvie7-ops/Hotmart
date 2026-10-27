// Photo groups for the funnel carousels. Files live in /public/menopausia/fotos.
// No repeats across groups. Optimized WebPs (~280KB total for both groups).
//
// NOTE: these are before/after transformation photos — shown in the loader
// marquees so buyers see real change while the bar fills. If these pages run as
// Meta ads, swap them for clothed/neutral lifestyle photos: before/after and
// bare-abdomen imagery violates Meta's ad policy. Drop replacements in
// /public/menopausia/fotos and keep the filenames (or edit the lists below).

/** Group A — CARGA 1 loader ("Analizando tu perfil"). */
export const fotosA = ['a2', 'a3', 'a4', 'a5'].map((n) => `/menopausia/fotos/${n}.webp`);

/** Group B — CARGA 2 loader ("Analizando tus respuestas"). */
export const fotosB = ['b1', 'b2', 'b3', 'b4'].map((n) => `/menopausia/fotos/${n}.webp`);

/** Group C — results carousel on /oferta. Empty until confirmed real-client photos exist. */
export const fotosC: string[] = [];

/**
 * The /oferta results carousel stays hidden until the photos are confirmed to be
 * real clients. Flip to `true` only then.
 */
export const showResultsCarousel = false;
