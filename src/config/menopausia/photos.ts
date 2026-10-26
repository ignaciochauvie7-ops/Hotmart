// Photo groups for the funnel carousels. Files live in /public/menopausia/fotos.
// No repeats across groups. The optimized WebPs are produced by a one-off script.

/** Group A — shown under the CARGA 1 loader ("Analizando tu perfil"). */
export const fotosA = ['a1', 'a2', 'a3', 'a4', 'a5'].map((n) => `/menopausia/fotos/${n}.webp`);

/** Group B — shown under the CARGA 2 loader ("Analizando tus respuestas"). */
export const fotosB = ['b1', 'b2', 'b3', 'b4'].map((n) => `/menopausia/fotos/${n}.webp`);

/** Group C — results carousel on /oferta. Empty until confirmed real-client photos exist. */
export const fotosC: string[] = [];

/**
 * The /oferta results carousel stays hidden until the photos are confirmed to be
 * real clients. Flip to `true` only then.
 */
export const showResultsCarousel = false;
