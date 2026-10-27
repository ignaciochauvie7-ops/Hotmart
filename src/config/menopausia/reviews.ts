// Reseñas de clientas reales. VACÍO a propósito: no inventamos testimonios,
// nombres, cifras ni logos. El bloque de reseñas no renderiza nada mientras
// `showTestimonials` sea false o no haya reseñas reales por idioma.
//
// Para activarlo cuando existan reseñas verificadas:
//   1. pon `showTestimonials = true`
//   2. rellena REVIEWS[locale] con las citas reales (con permiso).
import type { MenoLocale } from './i18n';

export const showTestimonials = false;

export interface Review {
  quote: string;
  author: string;
}

export const REVIEWS: Record<MenoLocale, Review[]> = {
  es: [],
  pt: [],
  pl: [],
  cs: [],
};
