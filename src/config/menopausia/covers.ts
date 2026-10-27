import type { MenoLocale } from './products';

/**
 * Ebook cover art per locale + slot. Covers currently exist only for `pl`
 * (public/menopausia/pl/covers/*.webp, 2:3, served at 480w + 960w).
 * Locales without covers return `undefined` for a slot → the UI renders no
 * placeholder (no empty gaps). Alt text is authored in the locale's language.
 */
export type CoverSlot = 'main' | 'bonus1' | 'bonus2' | 'bonus3' | 'bonus4' | 'bump' | 'upsell';

export interface Cover {
  /** srcset entries (480w + 960w). */
  src480: string;
  src960: string;
  /** Intrinsic ratio for width/height attrs → zero layout shift (2:3). */
  width: number;
  height: number;
  alt: string;
}

function plCover(slot: CoverSlot, alt: string): Cover {
  const base = `/menopausia/pl/covers/${slot}`;
  return { src480: `${base}-480.webp`, src960: `${base}-960.webp`, width: 480, height: 720, alt };
}

const pl: Partial<Record<CoverSlot, Cover>> = {
  main: plCover('main', 'Wyzwanie Płaski Brzuch w 28 Dni — okładka'),
  bonus1: plCover('bonus1', '30 przepisów przeciwzapalnych — okładka'),
  bonus2: plCover('bonus2', 'Tracker na 28 dni — okładka'),
  bonus3: plCover('bonus3', 'Jedz na mieście bez wzdęć — okładka'),
  bonus4: plCover('bonus4', 'Plan Ratunkowy na 3 dni — okładka'),
  bump: plCover('bump', 'Znów Dobrze Śpij w 21 Dni — okładka'),
  upsell: plCover('upsell', 'Żegnaj Wzdęcie w 14 Dni — okładka'),
};

const covers: Record<MenoLocale, Partial<Record<CoverSlot, Cover>>> = {
  es: {},
  pt: {},
  pl,
  cs: {}, // TODO: portadas con texto checo. Vacío → sin imágenes (no se cuela texto polaco).
};

export function getCovers(locale: MenoLocale): Partial<Record<CoverSlot, Cover>> {
  return covers[locale];
}
