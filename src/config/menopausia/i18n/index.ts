import type { MenoLocale } from '../products';
import type { MenoDict } from './types';
import { es } from './es';
import { pt } from './pt';
import { pl } from './pl';

export type { MenoDict } from './types';
export type { MenoLocale } from '../products';

export const LOCALES: MenoLocale[] = ['es', 'pt', 'pl'];
export const DEFAULT_LOCALE: MenoLocale = 'es';

const dicts: Record<MenoLocale, MenoDict> = { es, pt, pl };

export function isLocale(value: string | undefined): value is MenoLocale {
  return value === 'es' || value === 'pt' || value === 'pl';
}

export function getDict(locale: MenoLocale): MenoDict {
  return dicts[locale];
}

/** EUR formatter per locale: "16,97 €", integers drop decimals ("67 €"). */
export function money(value: number, numberLocale: string): string {
  return new Intl.NumberFormat(numberLocale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
