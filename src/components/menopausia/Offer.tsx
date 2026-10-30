import { useEffect, useRef, useState } from 'react';
import { getDict, money, usesVisualOffer, type MenoLocale } from '../../config/menopausia/i18n';
import { getPricing, getExtrasDiscount } from '../../config/menopausia/products';
import { getCovers, type Cover, type CoverSlot } from '../../config/menopausia/covers';
import { loadAnswers } from '../../lib/menopausia/state';
import { getCookie, track } from '../../lib/menopausia/pixel';

interface Props {
  locale: MenoLocale;
}

/** Días de garantía — variable única usada en copy. */
const GUARANTEE_DAYS = 30;

/** Fotos de las reseñas (una por testimonio, orden = social.items). */
const TESTI_PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/menopausia/testimonios/t${n}.webp`);

/** Caras para la fila de prueba social del hero (distintas de las reseñas). */
const PROFILE_PHOTOS = [1, 2, 3, 4, 5].map((n) => `/menopausia/fotos/perfil${n}.jpg`);

/** Fotos antes/después que abren el bloque "¿Te suena?". */
const TRANSFORM_SHOTS = [
  { src: '/menopausia/mujeres/antes-despues-1.jpg', w: 820, h: 725 },
  { src: '/menopausia/mujeres/antes-despues-2.jpg', w: 820, h: 1166 },
];

/**
 * Logos de pago — SVG oficiales locales (sets MIT: gilbarbara/logos +
 * glifo oficial de Klarna). Solo métodos que Dodo acepta para EUR en Europa
 * (PayPal está deshabilitado temporalmente; iDEAL/Bancontact son NL/BE).
 */
const PAY_LOGOS = [
  { src: '/menopausia/pay/visa.svg', alt: 'Visa' },
  { src: '/menopausia/pay/mastercard.svg', alt: 'Mastercard' },
  { src: '/menopausia/pay/amex.svg', alt: 'American Express' },
  { src: '/menopausia/pay/apple-pay.svg', alt: 'Apple Pay' },
  { src: '/menopausia/pay/google-pay.svg', alt: 'Google Pay' },
  { src: '/menopausia/pay/klarna.svg', alt: 'Klarna' },
];

/** Cuenta regresiva de la oferta `es`: arranca en un punto aleatorio entre 2 y
 *  4 horas (al segundo, nunca en número redondo, para que parezca real),
 *  persiste en localStorage para no cambiar al recargar y se reinicia al 0. */
const COUNTDOWN_KEY = 'meno_es_offer_deadline_v2';
const COUNTDOWN_MIN_S = 2 * 3600; // 2 h
const COUNTDOWN_MAX_S = 4 * 3600; // 4 h
const randCountdownMs = () =>
  (COUNTDOWN_MIN_S + Math.floor(Math.random() * (COUNTDOWN_MAX_S - COUNTDOWN_MIN_S + 1))) * 1000;
function readCountdownDeadline(): number {
  const now = Date.now();
  try {
    const raw = localStorage.getItem(COUNTDOWN_KEY);
    const v = raw ? parseInt(raw, 10) : NaN;
    if (Number.isFinite(v) && v > now) return v;
  } catch {
    /* localStorage no disponible → cuenta en memoria, sin persistir */
  }
  const d = now + randCountdownMs();
  try {
    localStorage.setItem(COUNTDOWN_KEY, String(d));
  } catch {
    /* ignore */
  }
  return d;
}
function fmtClock(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const p = (n: number) => String(n).padStart(2, '0');
  return hh > 0 ? `${p(hh)}:${p(mm)}:${p(ss)}` : `${p(mm)}:${p(ss)}`;
}

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

export function Offer({ locale }: Props) {
  const dict = getDict(locale);
  const o = dict.offer;
  const q = dict.quiz;
  const pr = getPricing(locale);
  const nl = dict.numberLocale;
  const covers = getCovers(locale);
  const isEs = locale === 'es';
  // es/pl/cs comparten la landing visual; pt usa el layout original.
  const useVisual = usesVisualOffer(locale);

  // Extras arrancan sin marcar: se eligen dentro del carrito.
  const [bump, setBump] = useState(false);
  const [upsell, setUpsell] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [headline, setHeadline] = useState(o.genericHeadline);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  // Carrito (solo `es`) y cuenta regresiva.
  const [cartOpen, setCartOpen] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  // Al marcar los 2 extras se descuenta un monto fijo en moneda local vía el
  // código Dodo del locale (es 2 €, pl 9 zł, cs 49 Kč). Debe cuadrar con Dodo.
  const bothExtras = bump && upsell;
  const extrasDiscountCfg = getExtrasDiscount(locale);
  const extrasDiscount = bothExtras && extrasDiscountCfg ? extrasDiscountCfg.amount : 0;
  const total = pr.main + (bump ? pr.bump : 0) + (upsell ? pr.upsell : 0) - extrasDiscount;
  const mainPrice = money(pr.main, nl, pr.currency);
  const bumpPrice = money(pr.bump, nl, pr.currency);
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

  // Cuenta regresiva (landing visual): tick cada segundo; al llegar a 0, nuevo valor.
  useEffect(() => {
    if (!useVisual) return;
    let deadline = readCountdownDeadline();
    const tick = () => {
      let left = deadline - Date.now();
      if (left <= 0) {
        try {
          localStorage.removeItem(COUNTDOWN_KEY);
        } catch {
          /* ignore */
        }
        deadline = readCountdownDeadline();
        left = deadline - Date.now();
      }
      setRemaining(left);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [useVisual]);

  // Bloquea el scroll del fondo mientras el carrito está abierto.
  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [cartOpen]);

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

  // `es` aún no tiene portadas propias: reutiliza temporalmente el arte de `pl`
  // con textos alternativos en español (ver covers.ts para el arte definitivo).
  const esCover = (slot: CoverSlot, alt: string): Cover => ({
    src480: `/menopausia/pl/covers/${slot}-480.webp`,
    src960: `/menopausia/pl/covers/${slot}-960.webp`,
    width: 480,
    height: 720,
    alt,
  });

  // Todos los CTA de `es` abren el carrito; el pago real sale desde el carrito.
  const openCart = () => {
    track('AddToCart', { value: total, currency: pr.currency, content_name: 'menopausia_main' });
    setCartOpen(true);
  };
  const upsellPrice = money(pr.upsell, nl, pr.currency);
  const countdown = remaining == null ? '--:--' : fmtClock(remaining);

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

  // ── Landing visual (es/pl/cs) — orientada a imágenes ────────────────────────
  if (useVisual) {
    // es reutiliza el arte `pl` con alt en español; pl/cs usan sus propias
    // portadas (cs aún sin portadas en checo → sin imagen, nunca arte polaco).
    const coverFor = (slot: CoverSlot, alt: string): Cover | undefined =>
      isEs ? esCover(slot, alt) : covers[slot];
    const mainCover = coverFor('main', o.mainName ?? 'Reto Abdomen Plano en 28 Días');
    const bumpCover = coverFor('bump', o.bumpName);
    const upsellCover = coverFor('upsell', o.upsellName ?? '');
    const title = o.heroTitle ?? headline;
    // pl/cs: imagen de promesa (titular dentro) como primer visual del hero.
    const promiseImg =
      locale === 'pl' || locale === 'cs' ? `/menopausia/${locale}/portada.webp` : null;
    // pl/cs: imagen UGC antes/después (una sola) en vez de las 2 fotos de es.
    const ugcTransform =
      locale === 'pl' || locale === 'cs' ? `/menopausia/${locale}/antes-despues.jpg` : null;

    // Pago seguro: candado + línea + logos en una sola fila (reutilizado).
    // `withGuarantee` añade, bajo los métodos de pago, la línea de garantía.
    const securePay = (withGuarantee = false) => (
      <div className="m-securepay">
        {withGuarantee && o.guaranteeTitle && (
          <p className="m-securepay__guarantee">
            <ShieldCheckIcon /> {withDays(o.guaranteeTitle)}
          </p>
        )}
        <p className="m-securepay__line">
          <LockIcon /> {o.securePay}
        </p>
        <div className="m-paylogos">
          {PAY_LOGOS.map((l) => (
            <img key={l.src} className="m-paylogo" src={l.src} alt={l.alt}
              height={18} loading="lazy" decoding="async" />
          ))}
        </div>
      </div>
    );

    // Barra fina de cuenta regresiva (se repite arriba y en el cuadro de compra).
    const countdownBar = (
      <div className="m-countbar" role="status">
        <ClockIcon />
        <span className="m-countbar__label">{o.countdownLabel}</span>
        <strong className="m-countbar__time">{countdown}</strong>
      </div>
    );

    // Carrito (drawer): plan + 2 extras con casilla, total en vivo, pago seguro.
    const cart = (
      <div
        className={`m-cart${cartOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={o.cartTitle ?? 'Tu pedido'}
        aria-hidden={!cartOpen}
      >
        <div className="m-cart__backdrop" onClick={() => setCartOpen(false)} />
        <div className="m-cart__panel">
          <div className="m-cart__head">
            <h2 className="m-cart__title">{o.cartTitle ?? 'Tu pedido'}</h2>
            <button className="m-cart__close" aria-label={o.cartClose ?? 'Cerrar'} onClick={() => setCartOpen(false)}>
              <XIcon />
            </button>
          </div>

          <div className="m-cart__body">
            {/* Plan principal — fijo */}
            <div className="m-cart__line">
              <CoverImg cover={mainCover} className="m-cart__cover" sizes="56px" />
              <div className="m-cart__text">
                <p className="m-cart__name">{o.mainName}</p>
                {o.cartPlanNote && <p className="m-cart__note">{o.cartPlanNote}</p>}
              </div>
              <span className="m-cart__price">{mainPrice}</span>
            </div>

            {o.cartExtrasTitle && <p className="m-cart__extras-title">{o.cartExtrasTitle}</p>}

            {/* Extra 1 · Descanso (bump) */}
            <label className="m-cart__extra">
              <input type="checkbox" checked={bump} onChange={() => setBump((b) => !b)} />
              <CoverImg cover={bumpCover} className="m-cart__cover" sizes="56px" />
              <div className="m-cart__text">
                <p className="m-cart__name">{o.bumpName}</p>
                {o.bumpCartDesc && <p className="m-cart__note">{o.bumpCartDesc}</p>}
                <span className="m-cart__add">
                  {o.bumpStruck && <s className="m-cart__struck">{o.bumpStruck}</s>}
                  <span className="m-cart__now">{bumpPrice}</span>
                  {o.onlyNow && <em className="m-cart__only">{o.onlyNow}</em>}
                </span>
              </div>
            </label>

            {/* Extra 2 · Hinchazón (upsell) */}
            {o.upsellName && (
              <label className="m-cart__extra">
                <input type="checkbox" checked={upsell} onChange={() => setUpsell((u) => !u)} />
                <CoverImg cover={upsellCover} className="m-cart__cover" sizes="56px" />
                <div className="m-cart__text">
                  <p className="m-cart__name">{o.upsellName}</p>
                  {o.upsellCartDesc && <p className="m-cart__note">{o.upsellCartDesc}</p>}
                  <span className="m-cart__add">
                    {o.upsellStruck && <s className="m-cart__struck">{o.upsellStruck}</s>}
                    <span className="m-cart__now">{upsellPrice}</span>
                    {o.onlyNow && <em className="m-cart__only">{o.onlyNow}</em>}
                  </span>
                </div>
              </label>
            )}

            {bothExtras && o.bothExtrasSave && (
              <p className="m-cart__save">
                <CheckIcon className="m-cart__save-icon" /> {o.bothExtrasSave}
              </p>
            )}
          </div>

          <div className="m-cart__foot">
            <div className="m-cart__total">
              <span>{o.totalLabel}</span>
              <strong>{totalPrice}</strong>
            </div>
            <button className="m-btn m-btn--glow m-cart__cta" onClick={buy} disabled={loading}>
              {loading ? <span className="m-spin" /> : (o.cartCta ?? o.ctaOffer)}
            </button>
            {error && <p className="m-field-error" style={{ marginTop: '0.5rem' }}>{error}</p>}
            <p className="m-securepay__line m-cart__secure">
              <LockIcon /> {o.securePay}
            </p>
            <div className="m-paylogos m-cart__logos">
              {PAY_LOGOS.map((l) => (
                <img key={l.src} className="m-paylogo" src={l.src} alt={l.alt}
                  height={18} loading="lazy" decoding="async" />
              ))}
            </div>
            {o.guaranteeTitle && (
              <p className="m-cart__guarantee">{withDays(o.guaranteeTitle)}</p>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <>
        {/* Barra fina con cuenta regresiva, fija arriba */}
        <div className="m-countbar-top">{countdownBar}</div>

        <div className="m-shell m-shell--offer m-offer-es" ref={shellRef}>
          {/* 1 · Hero: estrellas, etiqueta, titular, abanico, chips, 1 CTA, pago seguro */}
          <header className="m-hero m-hero--es">
            {/* Credibilidad arriba del todo: prueba social, plan listo y valoración */}
            <div className="m-herocred m-hero-in">
              <p className="m-herocred__trust">
                <span className="m-herocred__avatars" aria-hidden="true">
                  {PROFILE_PHOTOS.slice(0, 4).map((src) => (
                    <img key={src} className="m-herocred__avatar" src={src} alt=""
                      width={28} height={28} decoding="async" />
                  ))}
                </span>
                <span className="m-herocred__trust-text">{o.social.trusted}</span>
                <span className="m-herocred__rating">
                  <Stars size={13} label={o.social.ratingAria} />
                  <strong>{o.social.rating}</strong>
                </span>
              </p>

              {!promiseImg && o.heroLabel && (
                <p className="m-herocred__ready">
                  <CheckIcon className="m-herocred__ready-icon" /> {o.heroLabel}
                </p>
              )}
            </div>

            {promiseImg && (
              <img
                className="m-hero__promise-img m-hero-in"
                src={promiseImg}
                alt={title}
                width={900}
                height={1125}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            )}

            {/* pl/cs mueven titular+abanico a la sección "Qué incluye" (abajo). */}
            {!promiseImg && (
              <>
                <h1 className="m-hero__title m-hero-in">{title}</h1>

                {/* Abanico: portada principal al frente + 4 bonus asomando detrás */}
                <div className="m-fan m-hero-in">
                  {bonusSlots.map((slot, i) => (
                    <CoverImg key={slot} cover={coverFor(slot, o.bonusNames[i])}
                      className={`m-fan__bonus m-fan__bonus--${i + 1}`} sizes="126px" />
                  ))}
                  <CoverImg cover={mainCover} className="m-fan__main" sizes="220px" priority />
                </div>
              </>
            )}

            {promiseImg && o.pains && o.pains.length > 0 ? (
              /* pl/cs: sección de dolores (sustituye los chips bajo la promesa). */
              <section className="m-dolores m-hero-in">
                {o.painsTitle && <h2 className="m-dolores__title">{o.painsTitle}</h2>}
                <ul className="m-dolores__list">
                  {o.pains.map((p, i) => (
                    <li key={i} className="m-dolores__card">
                      <span className="m-dolores__ic">{PAIN_ICONS[i] ?? <CheckIcon />}</span>
                      <span className="m-dolores__text">{p}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              o.heroChips && o.heroChips.length > 0 && (
                <ul className="m-chips m-hero-in">
                  {o.heroChips.map((b, i) => (
                    <li key={i} className="m-chip">
                      <CheckIcon className="m-chip__icon" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )
            )}

          </header>

          <div ref={sentinelRef} aria-hidden="true" className="m-sentinel" />

          {/* 3 · ¿Te suena? — prueba antes/después + dos tarjetas (dolor vs reto) */}
          {o.soundsPains && o.soundsPains.length > 0 && (
            <section className="m-section m-reveal">
              {/* pl/cs: imagen UGC compuesta arriba + 2 fotos de cuerpo (más pequeñas) debajo */}
              {ugcTransform ? (
                <>
                  <div className="m-transform m-transform--single">
                    <figure className="m-transform__single">
                      <img src={ugcTransform} alt={o.soundsTitle ?? 'Antes y después'}
                        width={900} height={1124} loading="lazy" decoding="async" />
                    </figure>
                  </div>
                  <div className="m-transform m-transform--mini">
                    {TRANSFORM_SHOTS.map((s, i) => (
                      <figure key={s.src} className={`m-transform__shot m-transform__shot--${i + 1}`}>
                        <img src={s.src} alt={o.soundsTitle ?? 'Antes y después'}
                          width={s.w} height={s.h} loading="lazy" decoding="async" />
                      </figure>
                    ))}
                  </div>
                </>
              ) : (
                <>
                {/* Banda antes/después: 2 fotos a lo ancho, superpuestas con profundidad */}
                <div className="m-transform">
                  {TRANSFORM_SHOTS.map((s, i) => (
                    <figure key={s.src} className={`m-transform__shot m-transform__shot--${i + 1}`}>
                      <img src={s.src} alt={o.soundsTitle ?? 'Antes y después'}
                        width={s.w} height={s.h} loading="lazy" decoding="async" />
                    </figure>
                  ))}
                </div>

                {/* Dolor (antes) vs Con el reto (después): dos tarjetas con relieve */}
                <div className="m-compare2">
                  <div className="m-compare2__card m-compare2__card--pain">
                    {o.soundsTitle && <p className="m-compare2__title">{o.soundsTitle}</p>}
                    <ul className="m-compare2__list">
                      {o.soundsPains.map((t, i) => (
                        <li key={i}><XIcon className="m-compare2__x" /><span>{t}</span></li>
                      ))}
                    </ul>
                  </div>

                  {o.soundsResults && o.soundsResults.length > 0 && (
                    <div className="m-compare2__card m-compare2__card--win">
                      {o.soundsResultsTitle && <p className="m-compare2__title">{o.soundsResultsTitle}</p>}
                      <ul className="m-compare2__list">
                        {o.soundsResults.map((t, i) => (
                          <li key={i}><CheckIcon className="m-compare2__check" /><span>{t}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                </>
              )}
            </section>
          )}

          {/* 4 · Qué incluye — UN cuadro: filas con valor tachado + GRATIS, total y CTA */}
          <section className="m-section m-reveal" id="comprar">
            <h2>{o.includesTitle ?? o.bonusesTitle}</h2>
            {/* pl/cs: titular + abanico de libros reubicados aquí, sobre el cuadro. */}
            {promiseImg && (
              <>
                <h3 className="m-hero__title m-includes-head">{title}</h3>
                <div className="m-fan">
                  {bonusSlots.map((slot, i) => (
                    <CoverImg key={slot} cover={coverFor(slot, o.bonusNames[i])}
                      className={`m-fan__bonus m-fan__bonus--${i + 1}`} sizes="126px" />
                  ))}
                  <CoverImg cover={mainCover} className="m-fan__main" sizes="220px" priority />
                </div>
              </>
            )}
            <div className="m-valuebox">
              <ul className="m-valuelist">
                <li className="m-valuerow">
                  <CoverImg cover={mainCover} className="m-valuerow__cover" sizes="48px" />
                  <span className="m-valuerow__name">
                    {o.mainName}
                    {o.mainSub && <span className="m-valuerow__sub">{o.mainSub}</span>}
                  </span>
                  {o.mainValue && (
                    <span className="m-valuerow__value m-valuerow__value--main">
                      <s className="m-valuerow__was">{o.mainValue}</s>
                      <strong className="m-valuerow__now">{mainPrice}</strong>
                    </span>
                  )}
                </li>
                {bonusSlots.map((slot, i) => (
                  <li key={slot} className="m-valuerow">
                    <CoverImg cover={coverFor(slot, o.bonusNames[i])} className="m-valuerow__cover" sizes="48px" />
                    <span className="m-valuerow__name">
                      {o.bonusNames[i]}
                      {o.bonusSubs?.[i] && <span className="m-valuerow__sub">{o.bonusSubs[i]}</span>}
                    </span>
                    {o.bonusValues && o.bonusValues[i] && (
                      <span className="m-valuerow__value">
                        <s>{o.bonusValues[i]}</s> <span className="m-valuerow__free">{o.freeTag}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="m-valuebox__totals">
                {o.totalStruck && (
                  <p className="m-valuebox__struck">
                    {o.totalLabel} <s>{o.totalStruck}</s>
                  </p>
                )}
                <p className="m-valuebox__today">
                  {o.todayLabel} <strong>{mainPrice}</strong>
                </p>
              </div>

              {countdownBar}

              <button className="m-btn m-btn--glow m-valuebox__cta" onClick={openCart}>{o.ctaMain}</button>

              {securePay(false)}
            </div>
          </section>

          {/* 5 · Garantía — sello estampilla, justo tras los métodos de pago */}
          {o.guaranteeTitle && (
            <section className="m-section m-section--tight m-reveal">
              <div className="m-guarantee m-guarantee--big m-guarantee--stamp">
                <GuaranteeSeal days={GUARANTEE_DAYS} unit={o.guaranteeUnit} stamp />
                <p className="m-guarantee__title">{withDays(o.guaranteeTitle)}</p>
                {o.guaranteeBody && <p className="m-guarantee__body">{withDays(o.guaranteeBody)}</p>}
              </div>
            </section>
          )}

          {/* 6 · Cómo funciona — 3 pasos con icono */}
          {o.howSteps && o.howSteps.length > 0 && (
            <section className="m-section m-reveal">
              {o.howTitle && <h2>{o.howTitle}</h2>}
              {locale === 'pl' && (
                <HowVideo src="/menopausia/pl/como-funciona-hyperframes.mp4" />
              )}
              <ol className="m-howto">
                {o.howSteps.map((s, i) => (
                  <li key={i} className="m-howto__step">
                    <span className="m-howto__icon">{HOW_ICONS[i] ?? <CheckIcon />}</span>
                    <span className="m-howto__text">{s}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* 7 · Reseñas */}
          {socialSection}

          {/* FAQ */}
          {faqSection}

          <footer className="m-footer">
            <a href={`/menopausia/${locale}/privacidad`}>{o.privacyLink}</a>
            {' · '}
            <a href={`/menopausia/${locale}/terminos`}>{o.termsLink}</a>
            {o.medicalDisclaimer && <span className="m-footer__disclaimer">{o.medicalDisclaimer}</span>}
          </footer>
        </div>

        {/* Botón fijo en móvil (tras el hero) — abre el carrito */}
        <div className={`m-sticky-cta${showSticky ? ' is-visible' : ''}`}>
          <button className="m-btn" onClick={openCart}>{o.ctaMain} · {mainPrice}</button>
        </div>

        {cart}
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function GuaranteeSeal({ days, unit = 'DÍAS', stamp = false }: { days: number; unit?: string; stamp?: boolean }) {
  if (stamp) {
    // Estampilla: círculo relleno (color via CSS), número blanco grande, borde dentado.
    return (
      <svg className="m-guarantee__seal m-guarantee__seal--stamp" viewBox="0 0 80 80" width="96" height="96" aria-hidden="true">
        <circle cx="40" cy="40" r="38" fill="currentColor" />
        <circle cx="40" cy="40" r="33" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" />
        <text x="40" y="39" textAnchor="middle" fontSize="27" fontWeight="800" fill="#fff">{days}</text>
        <text x="40" y="55" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="#fff">{unit}</text>
      </svg>
    );
  }
  return (
    <svg className="m-guarantee__seal" viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
      <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="40" cy="40" r="30" fill="currentColor" opacity="0.08" />
      <text x="40" y="35" textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor">{days}</text>
      <text x="40" y="51" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1" fill="currentColor">{unit}</text>
    </svg>
  );
}

/** Video de "cómo funciona": carga diferida — solo pide el archivo y se
 *  reproduce cuando está a punto de entrar en pantalla (preload="none"). */
function HowVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (load) ref.current?.play().catch(() => {});
  }, [load]);
  return (
    <video
      ref={ref}
      className="m-howvideo"
      src={load ? src : undefined}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden="true"
    />
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5z" />
      <path d="m9 12 2 2 4-4" />
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

function BagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </svg>
  );
}

/** Iconos de los 3 pasos de "Cómo funciona" (orden = howSteps). */
const HOW_ICONS = [<BagIcon />, <MailIcon />, <BoltIcon />];

// ── Iconos de línea para la sección de dolores (pl/cs), orden = pains ────────
function PainScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v16" />
      <path d="M7 20h10" />
      <path d="M5 6h14" />
      <path d="M12 4.5 6 6l3 5a3 3 0 0 1-6 0z" />
      <path d="M12 4.5 18 6l-3 5a3 3 0 0 0 6 0z" />
    </svg>
  );
}

function PainTiredIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="17" height="10" rx="2.5" />
      <path d="M22 10.5v3" />
      <path d="M6 12h4" />
    </svg>
  );
}

function PainBloatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M7 13c1.4 1.5 3.3 1.5 5 0s3.6-1.5 5 0" />
    </svg>
  );
}

function PainSleepIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function PainDietIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3v6a2 2 0 0 0 4 0V3" />
      <path d="M8 11v10" />
      <path d="M17 3c-1.6 0-2.5 2.2-2.5 4.5S15.4 11 17 11v10" />
    </svg>
  );
}

function PainClothesIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3 3 7l3 3v10h12V10l3-3-6-4-3 2z" />
    </svg>
  );
}

/** Iconos de los 6 dolores (orden = pains de pl/cs). */
const PAIN_ICONS = [
  <PainScaleIcon />,
  <PainTiredIcon />,
  <PainBloatIcon />,
  <PainSleepIcon />,
  <PainDietIcon />,
  <PainClothesIcon />,
];
