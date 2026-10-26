/**
 * Dodo Payments product IDs per locale.
 * These are NOT secrets — safe to keep in the repo.
 *
 * TODO: fill in the real Dodo product IDs once created in the dashboard.
 *   main   → Reto Menopausia Plana (28 días) — 16,97 €
 *   bump   → Duerme Fresca (order bump en la oferta) — 6,97 €
 *   upsell → Adiós Hinchazón (upsell en /gracias) — 7,47 €
 */
export type MenoLocale = 'es' | 'pt' | 'pl';

export interface LocaleProducts {
  main: string;
  bump: string;
  upsell: string;
}

export const products: Record<MenoLocale, LocaleProducts> = {
  es: { main: '', bump: '', upsell: '' }, // TODO: IDs Dodo (es)
  pt: { main: '', bump: '', upsell: '' }, // TODO: IDs Dodo (pt)
  pl: { main: '', bump: '', upsell: '' }, // TODO: IDs Dodo (pl)
};

/** Reference prices in EUR (used for Pixel/CAPI value + UI display). */
export const prices = {
  main: 16.97,
  bump: 6.97,
  upsell: 7.47,
} as const;

export function getProducts(locale: MenoLocale): LocaleProducts {
  return products[locale];
}
