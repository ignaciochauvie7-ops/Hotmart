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

  useEffect(() => {
    track('ViewContent', { value: PRICE_MAIN, currency: CURRENCY, content_name: 'reparador_pro_main' });
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
    <>
      {/* 1 · Imagen con la promesa */}
      <header className="rp-hero">
        <div className="rp-wrap">
          <h1>{t.hero.h1}</h1>
          <Img file="hero-mockup.webp" w={1200} h={900} alt={t.hero.imageAlt} available={images} className="rp-hero__img" eager />
        </div>
      </header>

      {/* 2 · Esto es para ti si… */}
      <section className="rp-section">
        <div className="rp-wrap">
          <h2>{t.pains.title}</h2>
          <ul className="rp-list rp-list--pain">
            {t.pains.items.slice(0, 4).map((s) => (
              <li key={s}>
                <CrossIcon />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · Antes y después */}
      <section className="rp-section rp-section--alt">
        <div className="rp-wrap">
          <h2 className="rp-sr">{t.beforeAfter.title}</h2>
          <div className="rp-ba" role="table" aria-label={t.beforeAfter.title}>
            <div className="rp-ba__head" role="row">
              <span className="rp-ba__label rp-ba__label--before" role="columnheader">
                {t.beforeAfter.beforeLabel}
              </span>
              <span className="rp-ba__label rp-ba__label--after" role="columnheader">
                {t.beforeAfter.afterLabel}
              </span>
            </div>
            {t.beforeAfter.rows.slice(0, 4).map((r) => (
              <div className="rp-ba__row" role="row" key={r.before}>
                <div className="rp-ba__cell rp-ba__cell--before" role="cell">
                  <CrossIcon />
                  <span>
                    <b className="rp-ba__tag">{t.beforeAfter.beforeLabel}</b>
                    {r.before}
                  </span>
                </div>
                <div className="rp-ba__cell rp-ba__cell--after" role="cell">
                  <CheckIcon />
                  <span>
                    <b className="rp-ba__tag">{t.beforeAfter.afterLabel}</b>
                    {r.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Producto principal con sus bonos */}
      <section className="rp-section">
        <div className="rp-wrap">
          <Img file="oferta-pack.webp" w={1000} h={800} alt={t.product.imageAlt} available={images} />
          <h2 className="rp-product__name">{t.product.name}</h2>

          <h3 className="rp-group">{t.product.modulesTitle}</h3>
          <ol className="rp-modules">
            {t.product.modules.map((title, i) => (
              <li key={title}>
                <Img file={`modulo-${i + 1}.webp`} w={400} h={300} alt="" available={images} className="rp-modules__img" />
                <span>{title}</span>
              </li>
            ))}
          </ol>

          <h3 className="rp-group">{t.product.bonusTitle}</h3>
          <ul className="rp-bonus">
            {t.product.bonus.map((b, i) => (
              <li key={b.title}>
                <Img file={`bonus-${i + 1}.webp`} w={800} h={600} alt="" available={images} className="rp-bonus__img" />
                <div>
                  <span className="rp-bonus__name">{b.title}</span>
                  <span className="rp-bonus__value">
                    {t.product.bonusValueLabel} {eur(b.value)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Oferta  +  6 · Botón de compra */}
      <section className="rp-section rp-offer" id="oferta">
        <div className="rp-wrap">
          <div className="rp-card">
            <p className="rp-total">
              {t.offer.valueTotalLabel} <s>{eur(VALUE_TOTAL)}</s>
            </p>
            <p className="rp-launch">
              <span>{t.offer.launchLabel}</span>
              <strong>{eur(PRICE_MAIN)}</strong>
            </p>

            {left != null && (
              <div className="rp-countdown" role="timer">
                <span>{t.offer.countdownLabel}</span>
                <Clock ms={left} />
              </div>
            )}

            {(bumpAvailable || DEV) && (
              <label className={`rp-bump${withBump ? ' is-on' : ''}`}>
                <input
                  type="checkbox"
                  checked={withBump}
                  disabled={!bumpAvailable}
                  onChange={(e) => setBump(e.target.checked)}
                />
                <span>
                  {fill(t.offer.bump)}
                  {!bumpAvailable && <em className="rp-devnote"> (dev: falta DODO_PRODUCT_BUMP)</em>}
                </span>
              </label>
            )}

            <button className="rp-btn rp-btn--buy" onClick={buy} disabled={!canBuy || loading}>
              {loading ? <span className="rp-spin" aria-label="Cargando" /> : fill(t.offer.cta, total)}
            </button>
            {!canBuy && (
              <p className="rp-devnote" role="status">
                {DEV ? 'Checkout deshabilitado: falta DODO_PRODUCT_MAIN en src/config/electrodomesticos.ts' : t.offer.unavailable}
              </p>
            )}
            {error && (
              <p className="rp-error" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 7 · Compra 100% segura */}
      <section className="rp-section rp-center">
        <div className="rp-wrap">
          <h2>{t.secure.title}</h2>
          {paymentMethods.length > 0 && (
            <ul className="rp-pay">
              {paymentMethods.map((p) => (
                <li key={p.file}>
                  <img src={`${IMG_PATH}/pay/${p.file}`} alt={p.alt} height={34} loading="lazy" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 8 · Garantía de 30 días */}
      <section className="rp-section rp-section--alt rp-center">
        <div className="rp-wrap">
          <Img file="garantia-30.webp" w={300} h={300} alt={t.guarantee.sealAlt} available={images} className="rp-guarantee__seal" />
          <h2>{t.guarantee.title}</h2>
          <p className="rp-guarantee__text">{t.guarantee.text}</p>
        </div>
      </section>

      {/* 9 · Cómo lo vas a recibir */}
      <section className="rp-section">
        <div className="rp-wrap">
          <h2>{t.delivery.title}</h2>
          <ol className="rp-steps">
            {t.delivery.steps.map((s, i) => (
              <li key={s}>
                <span className="rp-steps__n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10 · Prueba social (solo si hay reseñas en la config) */}
      {testimonials.length > 0 && <Reviews images={images} />}

      {/* 11 · Preguntas frecuentes */}
      <section className="rp-section rp-section--alt">
        <div className="rp-wrap">
          <h2>{t.faq.title}</h2>
          <div className="rp-faq">
            {t.faq.items.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`rp-faq__item${open ? ' is-open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`rp-faq-a-${i}`}
                      id={`rp-faq-q-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <ChevronIcon />
                    </button>
                  </h3>
                  <div className="rp-faq__wrap" role="region" aria-labelledby={`rp-faq-q-${i}`} id={`rp-faq-a-${i}`}>
                    <div className="rp-faq__a">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer mínimo */}
      <footer className="rp-footer">
        <div className="rp-wrap">
          <nav>
            <a href={`${BASE_PATH}/privacidad`}>{t.footer.privacy}</a>
            <a href={`${BASE_PATH}/terminos`}>{t.footer.terms}</a>
          </nav>
          {SUPPORT_EMAIL ? (
            <p>
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
          ) : (
            DEV && <p className="rp-devnote">dev: falta SUPPORT_EMAIL en la config</p>
          )}
        </div>
      </footer>
    </>
  );
}

/* ── Piezas ─────────────────────────────────────────────────────────────── */

function Reviews({ images }: { images: string[] | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };
  return (
    <section className="rp-section">
      <div className="rp-wrap">
        <h2>{t.reviews.title}</h2>
      </div>
      <div className="rp-reviews" ref={ref}>
        {testimonials.map((r, i) => (
          <figure className="rp-review" key={`${r.name}-${i}`}>
            {r.photo && <Img file={r.photo} w={800} h={800} alt={r.name} available={images} />}
            <blockquote>{r.text}</blockquote>
            <figcaption>
              <strong>{r.name}</strong>
              {r.location && <span> · {r.location}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
      {testimonials.length > 1 && (
        <div className="rp-reviews__nav">
          <button type="button" onClick={() => go(-1)} aria-label="Reseña anterior">
            ‹
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Reseña siguiente">
            ›
          </button>
        </div>
      )}
    </section>
  );
}

function Clock({ ms }: { ms: number }) {
  const s = Math.floor(ms / 1000);
  const parts: [number, string][] = [
    [Math.floor(s / 86400), 'd'],
    [Math.floor((s % 86400) / 3600), 'h'],
    [Math.floor((s % 3600) / 60), 'min'],
    [s % 60, 's'],
  ];
  const shown = parts[0][0] > 0 ? parts : parts.slice(1);
  return (
    <strong className="rp-countdown__time">
      {shown.map(([v, u]) => (
        <span key={u}>
          {String(v).padStart(2, '0')}
          <small>{u}</small>
        </span>
      ))}
    </strong>
  );
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const CheckIcon = () => <Svg><path d="m5 12 5 5 9-10" /></Svg>;
const CrossIcon = () => <Svg><path d="M6 6l12 12M18 6 6 18" /></Svg>;
const ChevronIcon = () => <Svg><path d="m6 9 6 6 6-6" /></Svg>;
