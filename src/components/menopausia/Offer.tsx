import { useEffect, useRef, useState } from 'react';
import { getDict, money, type MenoLocale } from '../../config/menopausia/i18n';
import { getPricing } from '../../config/menopausia/products';
import { getCovers, type Cover, type CoverSlot } from '../../config/menopausia/covers';
import { loadAnswers } from '../../lib/menopausia/state';
import { getCookie, track } from '../../lib/menopausia/pixel';

interface Props {
  locale: MenoLocale;
}

/** Días de garantía — variable única usada en copy. */
const GUARANTEE_DAYS = 14;

/** Fotos de las reseñas (una por testimonio, orden = social.items). */
const TESTI_PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/menopausia/testimonios/t${n}.webp`);

/** Logos de pago (SVG locales, sin peticiones externas). */
const PAY_LOGOS = [
  { src: '/menopausia/pay/visa.svg', alt: 'Visa' },
  { src: '/menopausia/pay/mastercard.svg', alt: 'Mastercard' },
  { src: '/menopausia/pay/apple-pay.svg', alt: 'Apple Pay' },
  { src: '/menopausia/pay/google-pay.svg', alt: 'Google Pay' },
];

/** Portada responsive (480w/960w). No se renderiza si el locale no la tiene. */
function CoverImg({
  cover,
  className,
  sizes,
  priority = false,
}: {
  cover?: Cover;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  if (!cover) return null;
  return (
    <img
      className={className}
      src={cover.src480}
      srcSet={`${cover.src480} 480w, ${cover.src960} 960w`}
      sizes={sizes}
      width={cover.width}
      height={cover.height}
      alt={cover.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

/**
 * Portada para `es`, que aún no tiene imágenes de cubierta: usa la imagen si
 * existe; si no, una cubierta tipográfica (sin huecos vacíos ni texto polaco).
 */
function BookCover({ cover, name, className }: { cover?: Cover; name: string; className: string }) {
  if (cover) return <CoverImg cover={cover} className={className} sizes="150px" />;
  return (
    <span className={`${className} m-bookcover`} aria-hidden="true">
      <span className="m-bookcover__title">{name}</span>
    </span>
  );
}

export function Offer({ locale }: Props) {
  const dict = getDict(locale);
  const o = dict.offer;
  const q = dict.quiz;
  const pr = getPricing(locale);
  const nl = dict.numberLocale;
  const covers = getCovers(locale);
  const isEs = locale === 'es';

  const [bump, setBump] = useState(false);
  const [upsell, setUpsell] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [headline, setHeadline] = useState(o.genericHeadline);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  const total = pr.main + (bump ? pr.bump : 0) + (upsell ? pr.upsell : 0);
  const mainPrice = money(pr.main, nl, pr.currency);
  const bumpPrice = money(pr.bump, nl, pr.currency);
  const upsellPrice = money(pr.upsell, nl, pr.currency);
  const totalPrice = money(total, nl, pr.currency);
  const perDay = o.perDay.replace('{price}', money(pr.main / 28, nl, pr.currency));
  const withDays = (s: string) => s.replace(/\{days\}/g, String(GUARANTEE_DAYS));

  // Personaliza solo el titular con la franja de edad del quiz (genérico si entró directo).
  useEffect(() => {
    const a = loadAnswers();
    if (a.age != null && q.age.options[a.age]) {
      setHeadline(o.headline.replace('{age}', q.age.options[a.age]));
    }
  }, [dict]);

  // La barra fija aparece al pasar el primer CTA (sentinela bajo el hero).
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Aparición suave al scroll (opacity + translateY), una sola vez.
  const shellRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = shellRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.m-reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  async function buy() {
    setError('');
    setLoading(true);
    track('InitiateCheckout', { value: total, currency: pr.currency, content_name: 'menopausia_main' });
    try {
      const res = await fetch('/api/menopausia/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, bump, upsell, fbp: getCookie('_fbp'), fbc: getCookie('_fbc') }),
      });
      const data = await res.json();
      if (res.ok && data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      setError(o.checkoutError);
    } catch {
      setError(o.checkoutError);
    } finally {
      setLoading(false);
    }
  }

  const bonusSlots: CoverSlot[] = ['bonus1', 'bonus2', 'bonus3', 'bonus4'];

  const buyButton = (extraClass = '') => (
    <button className={`m-btn m-btn--glow m-cta-total ${extraClass}`} onClick={buy} disabled={loading}>
      {loading ? <span className="m-spin" /> : `${o.ctaOffer} · ${totalPrice}`}
    </button>
  );

  // Reseñas — bloque compartido, idéntico en todos los locales.
  const socialSection = (
    <section className="m-section m-reveal">
      <h2>{o.social.title}</h2>
      <div className="m-testi-rating">
        <div className="m-avatars" aria-hidden="true">
          {TESTI_PHOTOS.slice(0, 5).map((src) => (
            <img key={src} className="m-avatars__img" src={src} alt="" width={40} height={40}
              loading="lazy" decoding="async" />
          ))}
        </div>
        <div className="m-testi-rating__meta">
          <div className="m-testi-rating__stars">
            <Stars label={o.social.ratingAria} />
            <strong>{o.social.rating}</strong>
          </div>
          <p className="m-testi-rating__count">{o.social.trusted}</p>
        </div>
      </div>
      <ul className="m-testi-grid">
        {o.social.items.map((t, i) => (
          <li key={i} className="m-testi">
            <div className="m-testi__head">
              <img className="m-testi__photo" src={TESTI_PHOTOS[i % TESTI_PHOTOS.length]}
                alt={t.author} width={48} height={48} loading="lazy" decoding="async" />
              <div className="m-testi__who">
                <Stars size={14} />
                <p className="m-testi__author">{t.author}</p>
              </div>
            </div>
            <p className="m-testi__quote">{t.quote}</p>
          </li>
        ))}
      </ul>
    </section>
  );

  // FAQ — bloque compartido, idéntico en todos los locales.
  const faqSection = (
    <section className="m-section m-reveal">
      <h2>{o.faqTitle}</h2>
      <div className="m-faq">
        {o.faq.map((f, i) => {
          const open = openFaq === i;
          return (
            <div key={i} className={`m-faq-item${open ? ' is-open' : ''}`}>
              <h3>
                <button
                  className="m-faq-q"
                  aria-expanded={open}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  <span>{f.q}</span>
                  <ChevronIcon className="m-faq-chevron" />
                </button>
              </h3>
              <div className="m-faq-a-wrap" role="region" aria-labelledby={`faq-q-${i}`} id={`faq-a-${i}`}>
                <div className="m-faq-a">{withDays(f.a)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  const footer = (
    <footer className="m-footer">
      <a href={`/menopausia/${locale}/privacidad`}>{o.privacyLink}</a>
      {' · '}
      <a href={`/menopausia/${locale}/terminos`}>{o.termsLink}</a>
    </footer>
  );

  const stickyBar = (
    <div className={`m-sticky-cta${showSticky ? ' is-visible' : ''}`}>
      <button className="m-btn" onClick={buy} disabled={loading}>
        {loading ? <span className="m-spin" /> : `${o.ctaMain} · ${totalPrice}`}
      </button>
    </div>
  );

  // ── Landing `es` reordenada ────────────────────────────────────────────────
  if (isEs) {
    return (
      <>
        <div className="m-shell m-shell--offer" ref={shellRef}>
          {/* 1 · Promesa fuerte + beneficios del principal + 4 bonus (sin precio) */}
          <header className="m-hero">
            <h1 className="m-hero__title m-hero-in">{headline}</h1>
            {o.promise && <p className="m-hero__promise m-hero-in">{o.promise}</p>}
            <div className="m-hero-in">
              <button className="m-btn m-btn--glow" onClick={buy} disabled={loading}>
                {loading ? <span className="m-spin" /> : o.ctaMain}
              </button>
            </div>
          </header>

          <div ref={sentinelRef} aria-hidden="true" className="m-sentinel" />

          {o.mainBenefits && o.mainBenefits.length > 0 && (
            <section className="m-section m-reveal">
              {o.mainBenefitsTitle && <h2>{o.mainBenefitsTitle}</h2>}
              <ul className="m-benefits">
                {o.mainBenefits.map((b, i) => (
                  <li key={i} className="m-benefit">
                    <CheckIcon className="m-benefit__icon" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="m-section m-reveal">
            <h2>{o.bonusesTitle}</h2>
            <ul className="m-bonus-grid">
              {bonusSlots.map((slot, i) => (
                <li key={slot} className="m-bonus">
                  <BookCover cover={covers[slot]} name={o.bonusNames[i]} className="m-bonus__cover" />
                  <p className="m-bonus__name">{o.bonusNames[i]}</p>
                  <span className="m-bonus__tag">{o.freeTag}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2 · Dolores que resuelve */}
          {o.pains && o.pains.length > 0 && (
            <section className="m-section m-reveal">
              {o.painsTitle && <h2>{o.painsTitle}</h2>}
              <ul className="m-pains">
                {o.pains.map((p, i) => (
                  <li key={i} className="m-pain">
                    <CheckIcon className="m-pain__icon" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 3 · Reseñas */}
          {socialSection}

          {/* 4 · Bloque de compra: precio + 2 extras + botón */}
          <section className="m-section m-reveal" id="comprar">
            {o.buyTitle && <h2>{o.buyTitle}</h2>}
            <div className="m-pricebox">
              <span className="m-pricebox__now">{mainPrice}</span>
              <p className="m-pricebox__note">{o.priceNote}</p>
              <p className="m-pricebox__perday">{perDay}</p>
            </div>

            <label className="m-bump">
              <input type="checkbox" checked={bump} onChange={() => setBump((b) => !b)} />
              <BookCover cover={covers.bump} name={o.bumpName} className="m-bump__cover" />
              <span className="m-bump__text">
                <span className="m-bump__name">{o.bumpName}</span>
                <span className="m-bump__benefit">{o.bumpBenefit}</span>
                <span className="m-bump__add">{o.bumpAdd.replace('{price}', bumpPrice)}</span>
              </span>
            </label>

            {o.upsellName && (
              <label className="m-bump">
                <input type="checkbox" checked={upsell} onChange={() => setUpsell((u) => !u)} />
                <BookCover cover={covers.upsell} name={o.upsellName} className="m-bump__cover" />
                <span className="m-bump__text">
                  <span className="m-bump__name">{o.upsellName}</span>
                  {o.upsellBenefit && <span className="m-bump__benefit">{o.upsellBenefit}</span>}
                  {o.upsellAdd && <span className="m-bump__add">{o.upsellAdd.replace('{price}', upsellPrice)}</span>}
                </span>
              </label>
            )}

            {buyButton()}
            {error && <p className="m-field-error" style={{ marginTop: '0.6rem' }}>{error}</p>}

            {/* 5 · Pago seguro + logos */}
            <div className="m-securepay">
              <p className="m-securepay__line">
                <LockIcon /> {o.securePay}
              </p>
              <div className="m-paylogos">
                {PAY_LOGOS.map((l) => (
                  <img key={l.src} className="m-paylogo" src={l.src} alt={l.alt}
                    width={48} height={30} loading="lazy" decoding="async" />
                ))}
              </div>
            </div>

            {/* 6 · Garantía de 14 días */}
            {o.guaranteeTitle && (
              <div className="m-guarantee">
                <GuaranteeSeal days={GUARANTEE_DAYS} />
                <div className="m-guarantee__text">
                  <p className="m-guarantee__title">{withDays(o.guaranteeTitle)}</p>
                  {o.guaranteeBody && <p className="m-guarantee__body">{withDays(o.guaranteeBody)}</p>}
                </div>
              </div>
            )}
          </section>

          {/* 7 · FAQ */}
          {faqSection}

          {footer}
        </div>

        {stickyBar}
      </>
    );
  }

  // ── Resto de locales (pl/cs/pt) — estructura original intacta ───────────────
  return (
    <>
      <div className="m-shell m-shell--offer" ref={shellRef}>
        {/* ── 1 · Titular + portada principal + CTA ────────────────────── */}
        <header className="m-hero">
          <h1 className="m-hero__title m-hero-in">{headline}</h1>

          <CoverImg
            cover={covers.main}
            className="m-cover-main"
            sizes="(min-width: 600px) 320px, 220px"
            priority
          />

          <div className="m-hero-in">
            <button className="m-btn m-btn--glow" onClick={buy} disabled={loading}>
              {loading ? <span className="m-spin" /> : o.ctaMain}
            </button>
            <p className="m-cta-trust">
              <LockIcon /> {withDays(o.trust)}
            </p>
          </div>
        </header>

        <div ref={sentinelRef} aria-hidden="true" className="m-sentinel" />

        {/* ── 2 · Cuadrícula de bonus ──────────────────────────────────── */}
        <section className="m-section m-reveal">
          <h2>{o.bonusesTitle}</h2>
          <ul className="m-bonus-grid">
            {bonusSlots.map((slot, i) => (
              <li key={slot} className="m-bonus">
                <CoverImg
                  cover={covers[slot]}
                  className="m-bonus__cover"
                  sizes="(min-width: 600px) 150px, 100px"
                />
                <p className="m-bonus__name">{o.bonusNames[i]}</p>
                <span className="m-bonus__tag">{o.freeTag}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 3 · Caja de precio ───────────────────────────────────────── */}
        <section className="m-section m-reveal">
          <div className="m-pricebox">
            <span className="m-pricebox__now">{mainPrice}</span>
            <p className="m-pricebox__note">{o.priceNote}</p>
            <p className="m-pricebox__perday">{perDay}</p>
          </div>

          {/* ── 4 · Bump ───────────────────────────────────────────────── */}
          <label className="m-bump">
            <input type="checkbox" checked={bump} onChange={() => setBump((b) => !b)} />
            <CoverImg cover={covers.bump} className="m-bump__cover" sizes="72px" />
            <span className="m-bump__text">
              <span className="m-bump__name">{o.bumpName}</span>
              <span className="m-bump__benefit">{o.bumpBenefit}</span>
              <span className="m-bump__add">{o.bumpAdd.replace('{price}', bumpPrice)}</span>
            </span>
          </label>

          {/* ── 5 · CTA + confianza ────────────────────────────────────── */}
          <button className="m-btn m-btn--glow m-cta-total" onClick={buy} disabled={loading}>
            {loading ? <span className="m-spin" /> : `${o.ctaOffer} · ${totalPrice}`}
          </button>
          {error && <p className="m-field-error" style={{ marginTop: '0.6rem' }}>{error}</p>}
          <p className="m-cta-trust">
            <LockIcon /> {withDays(o.trust)}
          </p>
        </section>

        {/* ── Prueba social · reseñas con foto ─────────────────────────── */}
        {socialSection}

        {/* ── 6 · FAQ ──────────────────────────────────────────────────── */}
        {faqSection}

        {footer}
      </div>

      {stickyBar}
    </>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function GuaranteeSeal({ days }: { days: number }) {
  return (
    <svg className="m-guarantee__seal" viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
      <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="40" cy="40" r="30" fill="currentColor" opacity="0.08" />
      <text x="40" y="35" textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor">{days}</text>
      <text x="40" y="51" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1" fill="currentColor">DÍAS</text>
    </svg>
  );
}

function Stars({ size = 16, label }: { size?: number; label?: string }) {
  return (
    <span className="m-stars" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#FFB43A" stroke="#FFB43A"
          strokeWidth="1.5" strokeLinejoin="round">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </span>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
