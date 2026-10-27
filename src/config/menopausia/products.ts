/**
 * Dodo Payments product IDs per locale.
 * These are NOT secrets — safe to keep in the repo.
 *
 *   main   → Reto Abdomen Plano en 28 Días — 16,97 €
 *   bump   → Vuelve a Descansar Bien en 21 Días (order bump) — 6,97 €
 *   upsell → Adiós Hinchazón en 14 Días (upsell en /gracias) — 7,47 €
 */
export type MenoLocale = 'es' | 'pt' | 'pl';

export interface LocaleProducts {
  main: string;
  bump: string;
  upsell: string;
}

export const products: Record<MenoLocale, LocaleProducts> = {
  es: {
    main: 'pdt_0NqaZVAHNfFSKAJLtDqcY',
    bump: 'pdt_0Nqaa0IvCrnb1f3nHXmbh',
    upsell: 'pdt_0Nqaa8qsvax3nojHzn1El',
  },
  pt: { main: '', bump: '', upsell: '' }, // TODO: IDs Dodo (pt)
  pl: {
    main: 'pdt_0Nqd1e1Vh0BBPV8WMDEY0',
    bump: 'pdt_0Nqd1ybe9kHJIWaQTiAri',
    upsell: 'pdt_0Nqd2Eo5sxihDoOzXGUxw',
  },
};

export interface LocalePricing {
  /** ISO 4217 — drives Intl display + Dodo billing_currency. */
  currency: string;
  /** Charged + displayed amounts. pl is fixed in PLN (never converted from EUR). */
  main: number;
  bump: number;
  upsell: number;
}

/**
 * Per-locale pricing. es/pt in EUR; pl in fixed PLN (69/29/31) — shown with
 * Intl pl-PL ("69 zł") and billed in PLN. No EUR conversion for pl.
 */
export const pricing: Record<MenoLocale, LocalePricing> = {
  es: { currency: 'EUR', main: 16.97, bump: 6.97, upsell: 7.47 },
  pt: { currency: 'EUR', main: 16.97, bump: 6.97, upsell: 7.47 },
  pl: { currency: 'PLN', main: 69, bump: 29, upsell: 31 },
};

export function getProducts(locale: MenoLocale): LocaleProducts {
  return products[locale];
}

export function getPricing(locale: MenoLocale): LocalePricing {
  return pricing[locale];
}

/** Reverse lookup: product_id → { locale, bucket }. Used by webhook/download. */
export type ProductBucket = 'main' | 'bump' | 'upsell';

export function findProduct(productId: string): { locale: MenoLocale; bucket: ProductBucket } | null {
  for (const locale of Object.keys(products) as MenoLocale[]) {
    const p = products[locale];
    if (p.main && p.main === productId) return { locale, bucket: 'main' };
    if (p.bump && p.bump === productId) return { locale, bucket: 'bump' };
    if (p.upsell && p.upsell === productId) return { locale, bucket: 'upsell' };
  }
  return null;
}
