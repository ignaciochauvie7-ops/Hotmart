import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getDict, money, type MenoDict, type MenoLocale } from '../../config/menopausia/i18n';
import { prices } from '../../config/menopausia/products';
import { fotosC, showResultsCarousel } from '../../config/menopausia/photos';
import { loadAnswers } from '../../lib/menopausia/state';
import { getCookie, track } from '../../lib/menopausia/pixel';
import { Check } from './quiz/icons';

interface Props {
  locale: MenoLocale;
}

const DEADLINE_KEY = 'meno_offer_deadline';
const COUNTDOWN_MS = 15 * 60 * 1000;

export function Offer({ locale }: Props) {
  const dict = getDict(locale);
  const o = dict.offer;
  const [bump, setBump] = useState(false);
  const [remaining, setRemaining] = useState(COUNTDOWN_MS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [headline, setHeadline] = useState(o.genericHeadline);

  // Personalize the headline from the quiz answers (generic if entered directly).
  useEffect(() => {
    const a = loadAnswers();
    const q = dict.quiz;
    if (a.age != null) {
      setHeadline(o.headline.replace('{age}', q.age.options[a.age]));
    }
  }, [dict, o]);

  // Countdown persisted in sessionStorage so a reload doesn't reset it.
  useEffect(() => {
    let deadline = Number(window.sessionStorage.getItem(DEADLINE_KEY));
    if (!deadline || Number.isNaN(deadline)) {
      deadline = Date.now() + COUNTDOWN_MS;
      window.sessionStorage.setItem(DEADLINE_KEY, String(deadline));
    }
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Sections fade up as they scroll into view (IntersectionObserver).
  const shellRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = shellRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.m-section'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    els.forEach((e) => e.classList.add('m-reveal'));
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

  const total = prices.main + (bump ? prices.bump : 0);

  async function buy() {
    setError('');
    setLoading(true);
    track('InitiateCheckout', { value: total, currency: 'EUR', content_name: 'menopausia_main' });
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

  return (
    <>
      <CountBar text={o.reserved} remaining={remaining} />

      <div className="m-shell m-shell--offer" ref={shellRef}>
        <motion.h1
          className="m-q m-offer-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {headline}
        </motion.h1>

        {/* TODO: imagen del pack principal (reemplazar el placeholder). */}
        <div className="m-offer-media m-offer-media--pack" role="img" aria-label="" />

        <ul className="m-benefits">
          {o.benefits.map((b, i) => (
            <li key={i} className="m-benefit">
              <Check className="m-benefit__check" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <section className="m-section">
          <h2>{o.receiveTitle}</h2>
          <div className="m-include-list">
            {o.items.map((item, i) => (
              <div key={i} className="m-include-row">
                {/* TODO: i === 0 → portada del ebook principal; i > 0 → miniatura del bonus. */}
                <div className="m-include-row__thumb" aria-hidden="true" />
                <span className="m-include-row__name">{item.name}</span>
                {i === 0 ? (
                  <span className="m-include-row__price">{money(item.price, dict.numberLocale)}</span>
                ) : (
                  <span className="m-include-row__free">{o.freeLabel}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <Bump dict={dict} checked={bump} onToggle={() => setBump((b) => !b)} />

        <section className="m-section">
          <div className="m-price-block">
            <div className="m-price-old">{money(o.priceOld, dict.numberLocale)}</div>
            <div className="m-price-now">
              {o.todayLabel}: {money(o.priceNow, dict.numberLocale)}
            </div>
            <span className="m-badge-off">{o.offLabel}</span>
          </div>
        </section>

        {showResultsCarousel && fotosC.length > 0 && (
          <section className="m-section">
            <div className="m-results-carousel">
              {fotosC.map((src, i) => (
                <img key={i} src={src} alt="" loading="lazy" decoding="async" />
              ))}
            </div>
          </section>
        )}

        <section className="m-section">
          <div className="m-guarantee">
            <ShieldIcon />
            <div>
              <strong>{o.guaranteeTitle}</strong>
              <p className="m-muted" style={{ fontSize: '0.95rem' }}>{o.guaranteeBody}</p>
            </div>
          </div>
          <div className="m-paysafe" style={{ marginTop: '0.75rem' }}>
            <LockIcon /> {o.paySecure} · <span>Visa</span> · <span>Apple Pay</span> · <span>Google Pay</span>
          </div>
        </section>

        <footer className="m-footer">
          <p>{o.footerDisclaimer}</p>
          <p style={{ marginTop: '0.75rem' }}>
            <a href={`/menopausia/${locale}/privacidad`}>{o.privacyLink}</a>
            {' · '}
            <a href={`/menopausia/${locale}/terminos`}>{o.termsLink}</a>
          </p>
        </footer>
      </div>

      {/* Sticky buy bar — pinned to the bottom on mobile, with a soft pulse. */}
      <div className="m-sticky-cta">
        <button className="m-btn m-btn--pulse" onClick={buy} disabled={loading}>
          {loading ? <span className="m-spin" /> : o.buy}
        </button>
        <p className="m-sticky-cta__price">
          {o.todayLabel}: {money(total, dict.numberLocale)} · {o.accessEmail}
        </p>
        {error && <p className="m-field-error" style={{ margin: '0.4rem 0 0' }}>{error}</p>}
      </div>
    </>
  );
}

function CountBar({ text, remaining }: { text: string; remaining: number }) {
  const total = Math.max(0, Math.floor(remaining / 1000));
  const mm = String(Math.floor(total / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');
  const [pre, post] = text.split('{time}');
  return (
    <div className="m-countbar">
      {pre}<b>{mm}:{ss}</b>{post}
    </div>
  );
}

function Bump({ dict, checked, onToggle }: { dict: MenoDict; checked: boolean; onToggle: () => void }) {
  const label = dict.offer.bumpLabel.replace('{price}', money(prices.bump, dict.numberLocale));
  return (
    <label className="m-bump m-section" style={{ marginTop: '1.5rem' }}>
      {/* TODO: miniatura del bump "Vuelve a Descansar Bien en 21 Días". */}
      <div className="m-bump__thumb" aria-hidden="true" />
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span>{label}</span>
    </label>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="var(--sage-dark)" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
