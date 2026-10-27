// Photo groups for the funnel carousels. Files live in /public/menopausia/fotos.
// No repeats across groups. The optimized WebPs are produced by a one-off script.
//
// META POLICY: the loader carousels must never show before/after transformations,
// scales, bare-abdomen close-ups, or negative self-image imagery. The a*/b* files
// currently on disk are all before/after shots, so the carousels stay EMPTY until
// compliant lifestyle photos (clothed, neutral, no body-shaming) are added. The
// Carousel renders nothing for an empty group, so the loaders show just the bar.

/** Group A — CARGA 1 loader ("Analizando tu perfil"). Empty until compliant photos. */
export const fotosA: string[] = [];

/** Group B — CARGA 2 loader ("Analizando tus respuestas"). Empty until compliant photos. */
export const fotosB: string[] = [];

/** Group C — results carousel on /oferta. Empty until confirmed real-client photos exist. */
export const fotosC: string[] = [];

/**
 * The /oferta results carousel stays hidden until the photos are confirmed to be
 * real clients. Flip to `true` only then.
 */
export const showResultsCarousel = false;
