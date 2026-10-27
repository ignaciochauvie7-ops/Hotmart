import type { MenoLocale } from '../../config/menopausia/i18n';
import { REVIEWS, showTestimonials } from '../../config/menopausia/reviews';

/**
 * Reseñas de clientas reales. No renderiza nada hasta que `showTestimonials`
 * sea true y existan reseñas verificadas para el idioma. Sin testimonios,
 * cifras ni logos inventados.
 */
export function Reviews({ locale }: { locale: MenoLocale }) {
  const items = REVIEWS[locale];
  if (!showTestimonials || items.length === 0) return null;
  return (
    <div className="m-reviews">
      {items.map((r, i) => (
        <blockquote key={i} className="m-review">
          <p>“{r.quote}”</p>
          <footer>{r.author}</footer>
        </blockquote>
      ))}
    </div>
  );
}
