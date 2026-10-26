import type { MenoLocale } from '../../config/menopausia/i18n';

/**
 * Testimonials are HIDDEN by default. No invented reviews, names or counters.
 * When you have REAL testimonials:
 *   1. set SHOW_TESTIMONIALS = true
 *   2. fill TESTIMONIALS[locale] with the real quotes.
 */
export const SHOW_TESTIMONIALS = false;

type Testimonial = { quote: string; author: string };

const TESTIMONIALS: Record<MenoLocale, Testimonial[]> = {
  es: [],
  pt: [],
  pl: [],
};

export function Testimonials({ locale }: { locale: MenoLocale }) {
  const items = TESTIMONIALS[locale];
  if (!SHOW_TESTIMONIALS || items.length === 0) return null;
  return (
    <section className="m-section">
      {items.map((t, i) => (
        <blockquote key={i} className="m-card" style={{ marginBottom: '0.75rem' }}>
          <p>“{t.quote}”</p>
          <footer className="m-muted" style={{ marginTop: '0.5rem', fontWeight: 600 }}>{t.author}</footer>
        </blockquote>
      ))}
    </section>
  );
}
