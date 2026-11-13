import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  BASE_PATH,
  CURRENCY,
  DODO_PRODUCT_BUMP,
  DODO_PRODUCT_MAIN,
  IMG_PATH,
  OFFER_DEADLINE,
  PRICE_MAIN,
  PRICE_WITH_BUMP,
  SUPPORT_EMAIL,
  VALUE_TOTAL,
  eur,
  fill,
  paymentMethods,
  testimonials,
  texts as t,
} from '../../config/electrodomesticos';
import { getCookie, track } from '../../lib/menopausia/pixel';
import { Img } from './Img';

interface Props {
  /** Archivos presentes en /public/electrodomesticos (null = desconocido). */
  images: string[] | null;
}

const DEV = import.meta.env.DEV;

/** Milisegundos hasta OFFER_DEADLINE; null si no hay fecha, es inválida o ya pasó. */
function useCountdown(iso: string): number | null {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = Date.parse(iso);
    if (!iso || Number.isNaN(end)) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      const ms = end - Date.now();
      if (ms > 0) {
        setLeft(ms);
      } else {
        setLeft(null); // llegó a cero: se oculta, no se reinicia
        if (id) clearInterval(id);
      }
    };
    tick();
    if (end > Date.now()) id = setInterval(tick, 1000);
    return () => {
      if (id) clearInterval(id);
    };
  }, [iso]);
  return left;
}

export function Landing({ images }: Props) {
  const [bump, setBump] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const left = useCountdown(OFFER_DEADLINE);

  const bumpAvailable = !!DODO_PRODUCT_BUMP;
  const withBump = bump && bumpAvailable;
  const total = withBump ? PRICE_WITH_BUMP : PRICE_MAIN;
  const canBuy = !!DODO_PRODUCT_MAIN;

  // Fotos de personas: solo se pintan si el archivo existe (sin placeholder).
  const exists = (file: string) => !images || images.includes(file);
  const heroAvatars = Array.from({ length: t.hero.avatars }, (_, i) => `perfil-${i + 1}.webp`).filter(exists);
  const reviewAvatars = testimonials.flatMap((r) => (r.photo && exists(r.photo) ? [r.photo] : [])).slice(0, 5);

  useEffect(() => {
    track('ViewContent', { value: PRICE_MAIN, currency: CURRENCY, content_name: 'reparador_pro_main' });
  }, []);

  // Aparición suave al scroll (igual que la landing de menopausia), una sola vez.
  const shellRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = shellRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.m-reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
    if (!canBuy || loading) return;
    setError('');
    setLoading(true);
    track('InitiateCheckout', { value: total, currency: CURRENCY, content_name: 'reparador_pro_main' });
    try {
      const res = await fetch('/api/electrodomesticos/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'main', bump: withBump, fbp: getCookie('_fbp'), fbc: getCookie('_fbc') }),
      });
      const data = await res.json();
      if (res.ok && data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      setError(t.offer.error);
    } catch {
      setError(t.offer.error);
    }
    setLoading(false);
  }

  return (
    <div className="m-shell m-shell--offer m-offer-es" ref={shellRef}>
      <header className="m-hero m-hero--es">
        {/* 1 · Promesa: imagen principal */}
        {/* Prueba social arriba del todo: fotos + conteo + valoración */}
        <div className="m-herocred m-hero-in">
          <p className="m-herocred__trust">
            {heroAvatars.length > 0 && (
              <span className="m-herocred__avatars" aria-hidden="true">
                {heroAvatars.map((file) => (
                  <Img key={file} file={file} w={96} h={96} alt="" available={images} className="m-herocred__avatar" label="" eager />
                ))}
              </span>
            )}
            <span className="m-herocred__trust-text">{t.hero.trust}</span>
            <span className="m-herocred__rating">
              <Stars label={t.hero.ratingAria} />
              <strong>{t.hero.rating}</strong>
            </span>
          </p>
        </div>

        {/* El titular va dentro de la imagen; el h1 queda solo para lectores de pantalla. */}
        <h1 className="m-sr">{t.hero.h1}</h1>
        <Img
          file="hero-mockup.webp"
          w={952}
          h={1256}
          alt={t.hero.imageAlt}
          available={images}
          className="m-hero__promise-img m-hero-in"
          eager
        />

        {/* 2 · Esto es para ti si… */}
        <section className="m-dolores m-hero-in">
          <h2 className="m-dolores__title">{t.pains.title}</h2>
          <ul className="m-dolores__list">
            {t.pains.items.map((p, i) => (
              <li key={p} className="m-dolores__card">
                <span className="m-dolores__ic">{PAIN_ICONS[i] ?? <CheckIcon />}</span>
                <span className="m-dolores__text">{p}</span>
              </li>
            ))}
          </ul>
        </section>
      </header>

      {/* 3 · Antes y después */}
      <section className="m-section m-reveal">
        <h2>{t.beforeAfter.title}</h2>
        <ul className="m-dolores__list">
          {t.beforeAfter.rows.map((r) => (
            <li key={r.before} className="m-dolores__card">
              <span className="m-howto__icon">
                <CheckIcon />
              </span>
              <span className="m-bump__text">
                <span className="m-bump__benefit">
                  {t.beforeAfter.beforeLabel}: {r.before}
                </span>
                <span className="m-dolores__text">
                  {t.beforeAfter.afterLabel}: {r.after}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 · Producto + bonus · 5 · Oferta · 6 · Botón + medios de pago (un solo cuadro) */}
      <section className="m-section m-reveal" id="comprar">
        <h2>{t.product.name}</h2>
        <div className="m-valuebox">
          <Img file="oferta-pack.webp" w={1000} h={800} alt={t.product.imageAlt} available={images} className="m-hero__promise-img" />

          <ul className="m-valuelist">
            <li className="m-valuerow">
              <span className="m-valuerow__name">{t.product.rowName}</span>
              <span className="m-valuerow__value m-valuerow__value--main">
                <s className="m-valuerow__was">{eur(t.product.courseValue)}</s>
                <strong className="m-valuerow__now">{eur(PRICE_MAIN)}</strong>
              </span>
            </li>
            {t.product.bonus.map((b, i) => (
              <li key={b.title} className="m-valuerow">
                <Img
                  file={`bonus-${i + 1}.webp`}
                  w={480}
                  h={720}
                  alt=""
                  available={images}
                  className="m-valuerow__cover"
                  label={`B${i + 1}`}
                />
                <span className="m-valuerow__name">{b.title}</span>
                <span className="m-valuerow__value">
                  <s>{eur(b.value)}</s> <span className="m-valuerow__free">{t.product.freeTag}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="m-valuebox__totals">
            <p className="m-valuebox__struck">
              {t.offer.valueTotalLabel} <s>{eur(VALUE_TOTAL)}</s>
            </p>
            <p className="m-valuebox__today">
              {t.offer.launchLabel} <strong>{eur(PRICE_MAIN)}</strong>
            </p>
          </div>

          {left != null && (
            <div className="m-countbar" role="timer">
              <ClockIcon />
              <span className="m-countbar__label">{t.offer.countdownLabel}</span>
              <strong className="m-countbar__time">{fmtClock(left)}</strong>
            </div>
          )}

          {(bumpAvailable || DEV) && (
            <label className="m-bump">
              <input
                type="checkbox"
                checked={withBump}
                disabled={!bumpAvailable}
                onChange={(e) => setBump(e.target.checked)}
              />
              <span className="m-bump__text">
                <span className="m-bump__name">{fill(t.offer.bump)}</span>
                {!bumpAvailable && <span className="m-bump__benefit">dev: falta DODO_PRODUCT_BUMP</span>}
              </span>
            </label>
          )}

          <button className="m-btn m-btn--glow m-valuebox__cta" onClick={buy} disabled={!canBuy || loading}>
            {loading ? <span className="m-spin" aria-label="Cargando" /> : fill(t.offer.cta, total)}
          </button>
          {!canBuy && (
            <p className="m-field-error" role="status" style={{ margin: '0.6rem 0 0' }}>
              {DEV ? 'dev: falta DODO_PRODUCT_MAIN en src/config/electrodomesticos.ts' : t.offer.unavailable}
            </p>
          )}
          {error && (
            <p className="m-field-error" role="alert" style={{ margin: '0.6rem 0 0' }}>
              {error}
            </p>
          )}

          <div className="m-securepay">
            {paymentMethods.length > 0 && (
              <div className="m-paylogos">
                {paymentMethods.map((p) => (
                  <img key={p.file} className="m-paylogo" src={`${IMG_PATH}/pay/${p.file}`} alt={p.alt} height={15} loading="lazy" decoding="async" />
                ))}
              </div>
            )}
            <p className="m-securepay__line">
              <LockIcon /> {t.offer.secure}
            </p>
          </div>
        </div>
      </section>

      {/* 7 · Garantía de 30 días — sello estampilla */}
      <section className="m-section m-section--tight m-reveal">
        <div className="m-guarantee m-guarantee--big m-guarantee--stamp">
          <GuaranteeSeal />
          <p className="m-guarantee__title">{t.guarantee.title}</p>
          <p className="m-guarantee__body">{t.guarantee.text}</p>
        </div>
      </section>

      {/* 8 · Cómo lo vas a recibir */}
      <section className="m-section m-reveal">
        <h2>{t.delivery.title}</h2>
        <ol className="m-howto">
          {t.delivery.steps.map((s, i) => (
            <li key={s} className="m-howto__step">
              <span className="m-howto__icon">{HOW_ICONS[i] ?? <CheckIcon />}</span>
              <span className="m-howto__text">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 9 · Prueba social (solo si hay reseñas en la config) */}
      {testimonials.length > 0 && (
        <section className="m-section m-reveal">
          <h2>{t.reviews.title}</h2>
          <div className="m-testi-rating">
            {reviewAvatars.length > 0 && (
              <div className="m-avatars" aria-hidden="true">
                {reviewAvatars.map((file) => (
                  <Img key={file} file={file} w={96} h={96} alt="" available={images} className="m-avatars__img" label="" />
                ))}
              </div>
            )}
            <div className="m-testi-rating__meta">
              <div className="m-testi-rating__stars">
                <Stars size={16} label={t.hero.ratingAria} />
                <strong>{t.hero.rating}</strong>
              </div>
              <p className="m-testi-rating__count">{t.hero.trust}</p>
            </div>
          </div>
          <ul className="m-testi-grid">
            {testimonials.map((r, i) => (
              <li key={i} className="m-testi">
                <div className="m-testi__head">
                  {r.photo && exists(r.photo) && (
                    <Img file={r.photo} w={96} h={96} alt={r.name ?? ''} available={images} className="m-testi__photo" label="" />
                  )}
                  <div className="m-testi__who">
                    <Stars size={14} />
                    {r.name && (
                      <p className="m-testi__author">
                        {r.name}
                        {r.location && ` · ${r.location}`}
                      </p>
                    )}
                  </div>
                </div>
                <p className="m-testi__quote">{r.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 10 · Preguntas frecuentes */}
      <section className="m-section m-reveal">
        <h2>{t.faq.title}</h2>
        <div className="m-faq">
          {t.faq.items.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className={`m-faq-item${open ? ' is-open' : ''}`}>
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
                  <div className="m-faq-a">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer mínimo */}
      <footer className="m-footer">
        <a href={`${BASE_PATH}/privacidad`}>{t.footer.privacy}</a>
        {' · '}
        <a href={`${BASE_PATH}/terminos`}>{t.footer.terms}</a>
        {SUPPORT_EMAIL && (
          <>
            {' · '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </>
        )}
        {!SUPPORT_EMAIL && DEV && <span className="m-footer__disclaimer">dev: falta SUPPORT_EMAIL en la config</span>}
      </footer>
    </div>
  );
}

/* ── Piezas (mismos iconos de línea que la landing de menopausia) ────────── */

function fmtClock(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const d = Math.floor(s / 86400);
  const p = (n: number) => String(n).padStart(2, '0');
  const clock = `${p(Math.floor((s % 86400) / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
  return d > 0 ? `${d} d ${clock}` : clock;
}

/** Sello circular "GARANTÍA 30 DÍAS" (estampilla de menopausia, color vía CSS). */
function GuaranteeSeal() {
  const g = t.guarantee;
  return (
    <svg
      className="m-guarantee__seal m-guarantee__seal--stamp"
      viewBox="0 0 80 80"
      width="96"
      height="96"
      role="img"
      aria-label={`${g.sealTop} ${g.days} ${g.sealUnit}`}
    >
      <circle cx="40" cy="40" r="38" fill="currentColor" />
      <circle className="rp-seal-ring" cx="40" cy="40" r="33" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" />
      <text x="40" y="24" textAnchor="middle" fontSize="7.5" fontWeight="800" letterSpacing="1" fill="#fff">{g.sealTop}</text>
      <text x="40" y="47" textAnchor="middle" fontSize="25" fontWeight="800" fill="#fff">{g.days}</text>
      <text x="40" y="60" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#fff">{g.sealUnit}</text>
    </svg>
  );
}

function Stars({ size = 13, label }: { size?: number; label?: string }) {
  return (
    <span className="m-stars" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#FFB43A" stroke="#FFB43A" strokeWidth="1.5" strokeLinejoin="round">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </span>
  );
}

function Icon({ children, size = 22, sw = 2, className }: { children: ReactNode; size?: number; sw?: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const CheckIcon = ({ className }: { className?: string }) => (
  <Icon className={className} sw={2.4}><path d="M20 6 9 17l-5-5" /></Icon>
);
const ChevronIcon = ({ className }: { className?: string }) => (
  <Icon className={className} size={20}><path d="m6 9 6 6 6-6" /></Icon>
);
const LockIcon = () => (
  <Icon size={15}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>
);
const ClockIcon = () => (
  <Icon size={16} sw={2.2}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
);

/** Iconos de los 3 pasos de "Cómo lo vas a recibir" (orden = delivery.steps). */
const HOW_ICONS = [
  <Icon><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></Icon>,
  <Icon><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Icon>,
  <Icon><path d="M13 2 3 14h7l-1 8 10-12h-7z" /></Icon>,
];

/** Iconos de los 3 dolores (orden = pains.items): euro, papelera, duda. */
const PAIN_ICONS = [
  <Icon size={24} sw={1.9}><circle cx="12" cy="12" r="9" /><path d="M15 8.5a4 4 0 1 0 0 7M7.5 11h5M7.5 13.5h5" /></Icon>,
  <Icon size={24} sw={1.9}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></Icon>,
  <Icon size={24} sw={1.9}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" /></Icon>,
];
