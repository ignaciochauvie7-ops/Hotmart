import type { MenoLocale } from './products';

/**
 * Ebook cover art per locale + slot. Covers exist for `pl` and `cs`
 * (public/menopausia/<locale>/covers/*.webp, 2:3, served at 480w + 960w).
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

function localeCover(locale: MenoLocale, slot: CoverSlot, alt: string): Cover {
  const base = `/menopausia/${locale}/covers/${slot}`;
  return { src480: `${base}-480.webp`, src960: `${base}-960.webp`, width: 480, height: 720, alt };
}

const pl: Partial<Record<CoverSlot, Cover>> = {
  main: localeCover('pl', 'main', 'Wyzwanie Płaski Brzuch w 28 Dni — okładka'),
  bonus1: localeCover('pl', 'bonus1', '30 przepisów przeciwzapalnych — okładka'),
  bonus2: localeCover('pl', 'bonus2', 'Tracker na 28 dni — okładka'),
  bonus3: localeCover('pl', 'bonus3', 'Jedz na mieście bez wzdęć — okładka'),
  bonus4: localeCover('pl', 'bonus4', 'Plan Ratunkowy na 3 dni — okładka'),
  bump: localeCover('pl', 'bump', 'Znów Dobrze Śpij w 21 Dni — okładka'),
  upsell: localeCover('pl', 'upsell', 'Żegnaj Wzdęcie w 14 Dni — okładka'),
};

const cs: Partial<Record<CoverSlot, Cover>> = {
  main: localeCover('cs', 'main', 'Výzva Ploché Břicho za 28 Dní — obálka'),
  bonus1: localeCover('cs', 'bonus1', '30 protizánětlivých receptů — obálka'),
  bonus2: localeCover('cs', 'bonus2', 'Tracker na 28 dní — obálka'),
  bonus3: localeCover('cs', 'bonus3', 'Jez venku bez nadýmání — obálka'),
  bonus4: localeCover('cs', 'bonus4', 'Záchranný plán na 3 dny — obálka'),
  bump: localeCover('cs', 'bump', 'Zase dobře spi za 21 dní — obálka'),
  upsell: localeCover('cs', 'upsell', 'Sbohem nadýmání za 14 dní — obálka'),
};

const covers: Record<MenoLocale, Partial<Record<CoverSlot, Cover>>> = {
  es: {},
  pt: {},
  pl,
  cs,
};

export function getCovers(locale: MenoLocale): Partial<Record<CoverSlot, Cover>> {
  return covers[locale];
}
