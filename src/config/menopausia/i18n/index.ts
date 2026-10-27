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
