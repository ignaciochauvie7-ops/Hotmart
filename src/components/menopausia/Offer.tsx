import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getDict, money, type MenoDict, type MenoLocale } from '../../config/menopausia/i18n';
import { prices } from '../../config/menopausia/products';
import { loadAnswers } from '../../lib/menopausia/state';
import { getCookie, track } from '../../lib/menopausia/pixel';
import { Check } from './quiz/icons';
import { Testimonials } from './Testimonials';

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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [headline, setHeadline] = useState(o.genericHeadline);
  const [chips, setChips] = useState<string[]>([]);

  // Personalize from the quiz answers (generic if entered directly).
  useEffect(() => {
    const a = loadAnswers();
    const q = dict.quiz;
    if (a.age != null) {
      let h = o.headline.replace('{age}', q.age.options[a.age]);
      if (a.event != null && o.eventPhrases[a.event]) {
        h = o.headlineEvent.replace('{base}', h).replace('{event}', o.eventPhrases[a.event]);
      }
      setHeadline(h);
    }
    const c: string[] = [];
    if (a.goal != null) c.push(q.goal.options[a.goal]);
    (a.symptoms ?? []).slice(0, 2).forEach((i) => c.push(q.symptoms.options[i]));
    setChips(c);
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

      <div className="m-shell">
        <motion.h1 className="m-q" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {headline}
        </motion.h1>

        {chips.length > 0 && (
          <div className="m-chips" style={{ marginBottom: '1rem' }}>
            {chips.map((c, i) => <span key={i} className="m-chip">{c}</span>)}
          </div>
        )}

        <Testimonials locale={locale} />

        <section className="m-section">
          <h2>{o.receiveTitle}</h2>
          <div className="m-value-list">
            {o.items.map((item, i) => (
              <div key={i} className="m-value-item">
                <Check className="m-value-item__check" />
                <span>{item.name}</span>
                <span className="m-value-item__price">{money(item.price, dict.numberLocale)}</span>
              </div>
            ))}
            <div className="m-value-item" style={{ fontWeight: 700, marginTop: '0.25rem' }}>
              <span>{o.totalLabel}</span>
              <span className="m-value-item__price" style={{ textDecoration: 'line-through' }}>
                {money(o.totalValue, dict.numberLocale)}
              </span>
            </div>
          </div>
        </section>

        <section className="m-section">
          <div className="m-price-block">
            <div className="m-price-old">{money(o.priceOld, dict.numberLocale)}</div>
            <div className="m-price-now">
              {o.todayLabel}: {money(o.priceNow, dict.numberLocale)}
            </div>
            <span className="m-badge-off">{o.offLabel}</span>
          </div>
        </section>

        <Bump dict={dict} checked={bump} onToggle={() => setBump((b) => !b)} />

        <BuyBlock dict={dict} total={total} loading={loading} error={error} onBuy={buy} />

        <section className="m-section">
          <h2>{o.howTitle}</h2>
          <div className="m-steps">
            {o.howSteps.map((s, i) => (
              <div key={i} className="m-step">
                <span className="m-step__n">{i + 1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="m-section">
          <div className="m-guarantee">
            <ShieldIcon />
            <div>
              <strong>{o.guaranteeTitle}</strong>
              <p className="m-muted" style={{ fontSize: '0.95rem' }}>{o.guaranteeBody}</p>
            </div>
          </div>
        </section>

        <section className="m-section">
          <h2>{o.faqTitle}</h2>
          {o.faq.map((item, i) => (
            <div key={i} className="m-faq-item">
              <button className="m-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                {item.q}
                <span aria-hidden="true">{openFaq === i ? '–' : '+'}</span>
              </button>
              {openFaq === i && (
                <motion.div className="m-faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                  {item.a}
                </motion.div>
              )}
            </div>
          ))}
        </section>

        <div className="m-divider" />
        <Bump dict={dict} checked={bump} onToggle={() => setBump((b) => !b)} />
        <BuyBlock dict={dict} total={total} loading={loading} error={error} onBuy={buy} />

        <footer className="m-footer">
          <p>{o.footerDisclaimer}</p>
          <p style={{ marginTop: '0.75rem' }}>
            <a href={`/menopausia/${locale}/privacidad`}>{o.privacyLink}</a>
            {' · '}
            <a href={`/menopausia/${locale}/terminos`}>{o.termsLink}</a>
          </p>
        </footer>
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
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span>{label}</span>
    </label>
  );
}

function BuyBlock({
  dict, total, loading, error, onBuy,
}: { dict: MenoDict; total: number; loading: boolean; error: string; onBuy: () => void }) {
  const o = dict.offer;
  return (
    <div className="m-section">
      <button className="m-btn" onClick={onBuy} disabled={loading}>
        {loading ? <span className="m-spin" /> : o.buy}
      </button>
      <p className="m-center m-muted" style={{ marginTop: '0.6rem', fontWeight: 600 }}>
        {dict.offer.todayLabel}: {money(total, dict.numberLocale)}
      </p>
      {error && <p className="m-field-error">{error}</p>}
      <div className="m-paysafe" style={{ marginTop: '0.75rem' }}>
        <LockIcon /> {o.paySecure} · <span>Visa</span> · <span>Apple Pay</span> · <span>Google Pay</span>
      </div>
      <p className="m-center m-muted" style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>{o.accessEmail}</p>
    </div>
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
