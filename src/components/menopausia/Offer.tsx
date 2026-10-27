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

  const [bump, setBump] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [headline, setHeadline] = useState(o.genericHeadline);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  const total = pr.main + (bump ? pr.bump : 0);
  const mainPrice = money(pr.main, nl, pr.currency);
  const bumpPrice = money(pr.bump, nl, pr.currency);
  const totalPrice = money(total, nl, pr.currency);
  const perDay = o.perDay.replace('{price}', money(pr.main / 28, nl, pr.currency));
  const withDays = (s: string) => s.replace('{days}', String(GUARANTEE_DAYS));

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
        body: JSON.stringify({ locale, bump, fbp: getCookie('_fbp'), fbc: getCookie('_fbc') }),
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

        {/* ── 6 · FAQ ──────────────────────────────────────────────────── */}
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

        <footer className="m-footer">
          <a href={`/menopausia/${locale}/privacidad`}>{o.privacyLink}</a>
          {' · '}
          <a href={`/menopausia/${locale}/terminos`}>{o.termsLink}</a>
        </footer>
      </div>

      {/* Barra CTA fija en móvil — slide-in al pasar el primer CTA. */}
      <div className={`m-sticky-cta${showSticky ? ' is-visible' : ''}`}>
        <button className="m-btn" onClick={buy} disabled={loading}>
          {loading ? <span className="m-spin" /> : `${o.ctaMain} · ${totalPrice}`}
        </button>
      </div>
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

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
