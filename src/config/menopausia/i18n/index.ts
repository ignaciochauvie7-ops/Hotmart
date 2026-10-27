import type { MenoLocale } from '../products';
import type { MenoDict } from './types';
import { es } from './es';
import { pt } from './pt';
import { pl } from './pl';
import { cs } from './cs';

export type { MenoDict } from './types';
export type { MenoLocale } from '../products';

export const LOCALES: MenoLocale[] = ['es', 'pt', 'pl', 'cs'];
export const DEFAULT_LOCALE: MenoLocale = 'es';

/**
 * Locales que usan la landing /oferta visual (hero abanico, "¿Te suena?",
 * cuadro de valor, carrito con extras). El resto (pt) usa el layout original.
 * También implica que el upsell se ofrece en el carrito y NO en /gracias.
 */
export const VISUAL_OFFER_LOCALES: MenoLocale[] = ['es', 'pl', 'cs'];
export function usesVisualOffer(locale: MenoLocale): boolean {
  return VISUAL_OFFER_LOCALES.includes(locale);
}

const dicts: Record<MenoLocale, MenoDict> = { es, pt, pl, cs };

export function isLocale(value: string | undefined): value is MenoLocale {
  return value === 'es' || value === 'pt' || value === 'pl' || value === 'cs';
}

export function getDict(locale: MenoLocale): MenoDict {
  return dicts[locale];
}

/** Currency formatter per locale: "16,97 €" (EUR), "69 zł" (PLN). Integers drop decimals. */
export function money(value: number, numberLocale: string, currency = 'EUR'): string {
  return new Intl.NumberFormat(numberLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
