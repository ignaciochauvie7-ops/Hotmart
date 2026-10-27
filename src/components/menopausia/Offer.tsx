import { useEffect, useRef, useState } from 'react';
import { getDict, money, type MenoLocale } from '../../config/menopausia/i18n';
import { getPricing } from '../../config/menopausia/products';
import { loadAnswers } from '../../lib/menopausia/state';
import { getCookie, track } from '../../lib/menopausia/pixel';
import { Reviews } from './Reviews';
import { Check } from './quiz/icons';

interface Props {
  locale: MenoLocale;
  /** process.env.SUPPORT_EMAIL, inyectado por la página. Vacío = no se muestra. */
  supportEmail?: string;
}

/** Días de garantía — variable única usada en copy y sello. */
const GUARANTEE_DAYS = 14;

export function Offer({ locale, supportEmail }: Props) {
  const dict = getDict(locale);
  const o = dict.offer;
  const q = dict.quiz;
  const pr = getPricing(locale);
  const nl = dict.numberLocale;

  const [bump, setBump] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [headline, setHeadline] = useState(o.genericHeadline);
  const [chips, setChips] = useState<{ label: string; value: string }[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  const total = pr.main + (bump ? pr.bump : 0);
  const mainPrice = money(pr.main, nl, pr.currency);
  const bumpPrice = money(pr.bump, nl, pr.currency);
  const totalPrice = money(total, nl, pr.currency);
  const withDays = (s: string) => s.replace('{days}', String(GUARANTEE_DAYS));

  // Personaliza titular y chips con las respuestas del quiz (genérico si entró directo).
  useEffect(() => {
    const a = loadAnswers();
    const next: { label: string; value: string }[] = [];
    if (a.age != null && q.age.options[a.age]) {
      setHeadline(o.headline.replace('{age}', q.age.options[a.age]));
      next.push({ label: q.result.labelAge, value: q.age.options[a.age] });
    }
    if (a.goal != null && q.goal.options[a.goal]) {
      next.push({ label: q.result.labelGoal, value: q.goal.options[a.goal] });
    }
    if (Array.isArray(a.symptoms) && a.symptoms.length > 0) {
      const names = a.symptoms
        .map((i) => q.symptoms.options[i])
        .filter(Boolean)
        .slice(0, 3);
      if (names.length > 0) {
        next.push({ label: q.result.labelSymptoms, value: names.join(' · ') });
      }
    }
    setChips(next);
  }, [dict]);

  // La barra fija aparece al pasar el primer CTA (sentinela bajo la promesa).
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

  // Las secciones aparecen una vez al entrar en viewport (opacity + translateY).
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

  const items = [o.ebook, ...o.bonuses];

  return (
    <>
      <div className="m-shell m-shell--offer" ref={shellRef}>
        {/* ── Bloque 1 · Promesa ───────────────────────────────────────── */}
        <header className="m-hero">
          <h1 className="m-hero__title m-hero-in">{headline}</h1>
          <p className="m-hero__sub m-hero-in">{o.subhead}</p>

          {chips.length > 0 && (
            <div className="m-profile m-hero-in">
              <p className="m-profile__intro">{o.profileIntro}</p>
              <div className="m-chips">
                {chips.map((c, i) => (
                  <span key={i} className="m-chip">
                    <span className="m-chip__label">{c.label}:</span> {c.value}
                  </span>
                ))}
              </div>
            </div>
          )}

          <ul className="m-benefits m-hero-in">
            {o.benefits.map((b, i) => (
              <li key={i} className="m-benefit">
                <Check className="m-benefit__check" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="m-hero-in">
            <button className="m-btn m-btn--glow" onClick={buy} disabled={loading}>
              {loading ? <span className="m-spin" /> : o.ctaMain}
            </button>
            <p className="m-cta-trust">
              <LockIcon /> {o.trustInline}
            </p>
          </div>
        </header>

        <div ref={sentinelRef} aria-hidden="true" className="m-sentinel" />

        {/* ── Bloque 2 · Problema + solución ───────────────────────────── */}
        <section className="m-section m-reveal">
          <h2>{o.problemTitle}</h2>
          {o.problemBody.map((p, i) => (
            <p key={i} className="m-prose">{p}</p>
          ))}
        </section>

        <section className="m-section m-reveal">
          <h2>{o.solutionTitle}</h2>
          <p className="m-prose">{o.solutionBody}</p>

          <h3 className="m-subhead">{o.includesTitle}</h3>
          <ul className="m-features">
            {items.map((it, i) => (
              <li key={i} className="m-feature">
                <span className="m-feature__mark" aria-hidden="true">
                  <Check />
                </span>
                <div>
                  <p className="m-feature__name">
                    {it.name}
                    {i > 0 && <span className="m-tag">{o.freeLabel}</span>}
                  </p>
                  <p className="m-feature__blurb">{it.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Bloque 3 · Prueba honesta ────────────────────────────────── */}
        <section className="m-section m-reveal">
          <h2>{o.proofTitle}</h2>
          <ul className="m-trust">
            <li className="m-trust__row">
              <LockIcon className="m-trust__icon" />
              <span>{o.proofSecure}</span>
            </li>
            <li className="m-trust__row">
              <ShieldIcon className="m-trust__icon" />
              <span>{withDays(o.proofGuarantee)}</span>
            </li>
            <li className="m-trust__row">
              <MailIcon className="m-trust__icon" />
              <span>{o.proofDelivery}</span>
            </li>
            {supportEmail && (
              <li className="m-trust__row">
                <ChatIcon className="m-trust__icon" />
                <span>
                  {o.proofSupportPrefix}{' '}
                  <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
                </span>
              </li>
            )}
          </ul>
          <Reviews locale={locale} />
        </section>

        {/* ── Bloque 4 · Oferta ────────────────────────────────────────── */}
        <section className="m-section m-reveal">
          <h2>{o.offerTitle}</h2>
          <div className="m-offer-card">
            <p className="m-offer-card__head">{o.getListTitle}</p>
            <ul className="m-get">
              {o.getList.map((name, i) => (
                <li key={i} className="m-get__row">
                  <Check className="m-get__check" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>

            <div className="m-price">
              <span className="m-price__lead">{o.priceLead}</span>
              <span className="m-price__now">{mainPrice}</span>
            </div>
            <p className="m-price__note">{o.priceNote}</p>

            <label className="m-bump">
              <input type="checkbox" checked={bump} onChange={() => setBump((b) => !b)} />
              <span>{o.bumpLabel.replace('{price}', bumpPrice)}</span>
            </label>

            {bump && (
              <p className="m-total">
                {o.totalTodayLabel}: <strong>{totalPrice}</strong>
              </p>
            )}

            <button className="m-btn m-btn--glow" onClick={buy} disabled={loading}>
              {loading ? <span className="m-spin" /> : o.ctaOffer}
            </button>
            {error && <p className="m-field-error" style={{ marginTop: '0.6rem' }}>{error}</p>}

            <div className="m-guarantee">
              <ShieldIcon />
              <span>{withDays(o.guaranteeBadge)}</span>
            </div>
            <p className="m-paynote">
              <LockIcon /> {o.paymentNote}
            </p>
          </div>
        </section>

        {/* ── Bloque 5 · FAQ ───────────────────────────────────────────── */}
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
          <p className="m-medical">{o.medicalNote}</p>
        </section>

        {/* ── Cierre ───────────────────────────────────────────────────── */}
        <section className="m-section m-final m-reveal">
          <h2>{o.finalTitle}</h2>
          <button className="m-btn m-btn--glow" onClick={buy} disabled={loading}>
            {loading ? <span className="m-spin" /> : o.ctaFinal}
          </button>
          <p className="m-cta-trust">
            <LockIcon /> {o.trustInline}
          </p>
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

      {/* Barra CTA fija en móvil — slide-in al pasar el primer CTA. */}
      <div className={`m-sticky-cta${showSticky ? ' is-visible' : ''}`}>
        <button className="m-btn" onClick={buy} disabled={loading}>
          {loading ? <span className="m-spin" /> : o.ctaMain}
        </button>
        <p className="m-sticky-cta__price">
          {o.stickyPrefix}: {totalPrice} · {o.paymentNote}
        </p>
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

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
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
