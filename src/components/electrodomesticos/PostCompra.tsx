import { useEffect, useRef, useState } from 'react';
import { trackPurchaseOnce } from '../../lib/electrodomesticos/purchase';
import '../../styles/electrodomesticos-postcompra.css';

/**
 * Recorrido post compra (mismo componente para /it, /fr, /de y /pl):
 *   Pantalla 1 · raspa y gana → upsell con cobro en un clic.
 *   Pantalla 2 · 3 cajas de regalo → 3 extras con casillas, cobro en un clic.
 *   Después, siempre, /gracias (descargas). Nunca se vuelve a un checkout.
 * Los cobros los hace el servidor (/api/electrodomesticos/<pais>/cobro) con la
 * tarjeta guardada del pago principal.
 */

type Item = 'upsell' | 'extra1' | 'extra2' | 'extra3';

export interface PostTexts {
  scratchTitle: string;
  scratchHint: string;
  off: string;
  giftsTitle: string;
  giftAria: string;
  yes: string;
  no: string;
  error: string;
  loading: string;
  notPaidTitle: string;
  notPaidBody: string;
  notPaidBack: string;
}

export interface Offer {
  item: Item;
  name: string;
  /** Línea corta de beneficio bajo el título. */
  benefit?: string;
  cover?: string;
  price: number;
  priceLabel: string;
  wasLabel: string;
}

interface Props {
  /** Pago principal verificado en el servidor con Dodo. */
  paid: boolean;
  /** Importe real del pago principal (para el pixel). */
  value: number;
  paymentId: string;
  currency: string;
  basePath: string;
  apiPath: string;
  imgPath: string;
  texts: PostTexts;
  /** null = upsell no disponible (se salta la pantalla 1). */
  upsell: Offer | null;
  extras: Offer[];
  /** Clave de vista previa (validada en el servidor): simula los cobros, sin Dodo ni pixel. */
  preview?: string;
}

type Charge = { status: string; paymentId?: string; charged?: Item[]; error?: string };

const Check = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5 9-10" />
  </svg>
);

function reducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Confeti ligero en canvas (sin librerías). */
function confetti() {
  if (reducedMotion()) return;
  const c = document.createElement('canvas');
  c.className = 'rp-pc-confetti';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  if (!ctx) return c.remove();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = window.innerWidth;
  const H = window.innerHeight;
  c.width = W * dpr;
  c.height = H * dpr;
  ctx.scale(dpr, dpr);
  const colors = ['#ff8a1f', '#12924a', '#2f6fec', '#f5c518', '#e5484d', '#ffffff'];
  const parts = Array.from({ length: 140 }, () => ({
    x: W / 2 + (Math.random() - 0.5) * 80,
    y: H * 0.4,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 14 - 4,
    s: 5 + Math.random() * 6,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[(Math.random() * colors.length) | 0],
  }));
  const start = performance.now();
  const tick = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.vy += 0.35;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - t / 2200);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    }
    if (t < 2200) requestAnimationFrame(tick);
    else c.remove();
  };
  requestAnimationFrame(tick);
}

/** Tarjeta de raspa y gana: se raspa con el dedo o el ratón. */
function ScratchCard({ hint, children, onReveal }: { hint: string; children: React.ReactNode; onReveal: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);
  const revealRef = useRef(onReveal);
  revealRef.current = onReveal;

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const rect = c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(rect.width * dpr);
    c.height = Math.round(rect.height * dpr);
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, '#b9c2cf');
    g.addColorStop(0.5, '#e6eaf0');
    g.addColorStop(1, '#a9b3c1');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = '#4a5568';
    ctx.font = '800 20px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hint, rect.width / 2, rect.height / 2);
    c.classList.add('is-ready');

    let drawing = false;
    let last: { x: number; y: number } | null = null;
    let moves = 0;
    const R = 22;
    const pos = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const cleared = () => {
      const { data } = ctx.getImageData(0, 0, c.width, c.height);
      let clear = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * 32) {
        total++;
        if (data[i] === 0) clear++;
      }
      return total ? clear / total : 0;
    };
    const scratch = (p: { x: number; y: number }) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = R * 2;
      ctx.beginPath();
      ctx.moveTo((last ?? p).x, (last ?? p).y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
      if (++moves % 8 === 0 && !doneRef.current && cleared() > 0.45) finish();
    };
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setDone(true);
      confetti();
      revealRef.current();
    };
    const down = (e: PointerEvent) => {
      drawing = true;
      last = null;
      c.setPointerCapture?.(e.pointerId);
      scratch(pos(e));
    };
    const move = (e: PointerEvent) => {
      if (drawing) scratch(pos(e));
    };
    const up = () => {
      drawing = false;
      last = null;
      if (!doneRef.current && cleared() > 0.45) finish();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        finish();
      }
    };
    c.addEventListener('pointerdown', down);
    c.addEventListener('pointermove', move);
    c.addEventListener('pointerup', up);
    c.addEventListener('pointercancel', up);
    c.addEventListener('keydown', key);
    return () => {
      c.removeEventListener('pointerdown', down);
      c.removeEventListener('pointermove', move);
      c.removeEventListener('pointerup', up);
      c.removeEventListener('pointercancel', up);
      c.removeEventListener('keydown', key);
    };
  }, [hint]);

  return (
    <div className={`rp-pc-scratch${done ? ' is-done' : ''}`}>
      <div className="rp-pc-scratch__prize">{children}</div>
      <canvas ref={ref} className="rp-pc-scratch__cover" tabIndex={done ? -1 : 0} role="button" aria-label={hint} />
    </div>
  );
}

function Gift({ opened, faded, label, aria, onOpen }: { opened: boolean; faded: boolean; label: string; aria: string; onOpen: () => void }) {
  return (
    <button type="button" className={`rp-pc-gift${opened ? ' is-open' : ''}${faded ? ' is-faded' : ''}`} onClick={onOpen} aria-label={aria} disabled={faded}>
      <span className="rp-pc-gift__prize" aria-hidden={!opened}>
        {label}
      </span>
      <span className="rp-pc-gift__lid" aria-hidden="true" />
      <span className="rp-pc-gift__box" aria-hidden="true" />
    </button>
  );
}

export function PostCompra({ paid, value, paymentId, currency, basePath, apiPath, imgPath, texts: t, upsell, extras, preview = '' }: Props) {
  const [step, setStep] = useState<'scratch' | 'gifts'>(upsell ? 'scratch' : 'gifts');
  const [revealed, setRevealed] = useState(false);
  const [opened, setOpened] = useState<number | null>(null);
  const [showList, setShowList] = useState(false);
  const [picked, setPicked] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Cobros aún en curso: /gracias los vuelve a consultar.
  const pendingRef = useRef<string[]>([]);
  // Vista previa: productos "comprados" (simulados) para mostrarlos en /gracias.
  const previewRef = useRef<Item[]>([]);

  // Purchase del producto principal: solo con pago confirmado y una vez por pago.
  useEffect(() => {
    if (paid && !preview) trackPurchaseOnce(paymentId, value, 'reparador_pro_main', currency);
  }, [paid, paymentId, value, currency, preview]);

  const finishFlow = () => {
    if (preview) {
      const items = previewRef.current.length ? `&items=${previewRef.current.join(',')}` : '';
      window.location.replace(`${basePath}/gracias?preview=${encodeURIComponent(preview)}${items}`);
      return;
    }
    const x = pendingRef.current.length ? `&x=${pendingRef.current.join(',')}` : '';
    window.location.replace(`${basePath}/gracias?payment_id=${encodeURIComponent(paymentId)}${x}`);
  };

  const nextAfterScratch = () => {
    setError('');
    if (extras.length) {
      setStep('gifts');
      window.scrollTo(0, 0);
    } else finishFlow();
  };

  // Portadas de los extras: se precargan en segundo plano al llegar a las cajas,
  // así aparecen al instante al abrir el regalo sin competir con la carga inicial.
  useEffect(() => {
    if (!paid || step !== 'gifts') return;
    const load = () => extras.forEach((o) => o.cover && (new Image().src = `${imgPath}/${o.cover}`));
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(load);
    else window.setTimeout(load, 300);
  }, [paid, step, extras, imgPath]);

  // Sin nada que ofrecer: directo a las descargas.
  useEffect(() => {
    if (paid && !upsell && extras.length === 0) finishFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paid]);

  if (!paid) {
    return (
      <main className="rp-simple">
        <h1>{t.notPaidTitle}</h1>
        <p>{t.notPaidBody}</p>
        <a className="rp-btn" href={`${basePath}/oferta#oferta`}>
          {t.notPaidBack}
        </a>
      </main>
    );
  }

  async function charge(items: Item[], contentName: string, offers: Offer[]): Promise<boolean> {
    setError('');
    setLoading(true);
    if (preview) {
      // Cobro simulado (como una tarjeta de prueba aprobada): nunca llama al servidor ni a Dodo.
      await new Promise((ok) => window.setTimeout(ok, 700));
      for (const i of items) if (!previewRef.current.includes(i)) previewRef.current.push(i);
      return true;
    }
    try {
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ main: paymentId, items }),
      });
      const data: Charge = await res.json();
      if (data.status === 'owned') return true;
      if ((data.status === 'succeeded' || data.status === 'processing') && data.paymentId) {
        if (data.status === 'succeeded') {
          const charged = data.charged ?? items;
          const amount = offers.filter((o) => charged.includes(o.item)).reduce((a, o) => a + o.price, 0);
          trackPurchaseOnce(data.paymentId, Math.round(amount * 100) / 100, contentName, currency);
        } else {
          pendingRef.current.push(data.paymentId);
        }
        return true;
      }
    } catch {
      /* error de red */
    }
    setError(t.error);
    setLoading(false);
    return false;
  }

  async function acceptUpsell() {
    if (!upsell || loading) return;
    if (await charge(['upsell'], 'reparador_pro_upsell', [upsell])) {
      setLoading(false);
      nextAfterScratch();
    }
  }

  async function acceptExtras() {
    if (loading || picked.length === 0) return;
    if (await charge(picked, 'reparador_pro_extras', extras)) finishFlow();
  }

  const toggle = (item: Item) =>
    setPicked((p) => (p.includes(item) ? p.filter((i) => i !== item) : [...p, item]));

  const openGift = (i: number) => {
    if (opened !== null) return;
    setOpened(i);
    confetti();
    window.setTimeout(() => setShowList(true), reducedMotion() ? 0 : 1100);
  };

  const yesButton = (onClick: () => void, disabled = false) => (
    <button type="button" className="rp-pc-yes" onClick={onClick} disabled={disabled || loading}>
      {loading ? (
        <span className="rp-spin rp-pc-spin" aria-label={t.loading} />
      ) : (
        <>
          <Check />
          <span>{t.yes}</span>
        </>
      )}
    </button>
  );

  const noButton = (onClick: () => void) => (
    <button type="button" className="rp-pc-no" onClick={onClick} disabled={loading}>
      {t.no}
    </button>
  );

  if (step === 'scratch' && upsell) {
    return (
      <main className="rp-pc">
        <h1 className="rp-pc-title">{t.scratchTitle}</h1>
        <ScratchCard hint={t.scratchHint} onReveal={() => setRevealed(true)}>
          <span className="rp-pc-off">{t.off}</span>
        </ScratchCard>
        {revealed && (
          <div className="rp-pc-deal">
            <h2 className="rp-pc-name">{upsell.name}</h2>
            {upsell.benefit && <p className="rp-pc-benefit">{upsell.benefit}</p>}
            <p className="rp-pc-prices">
              <s>{upsell.wasLabel}</s>
              <strong>{upsell.priceLabel}</strong>
            </p>
            {yesButton(acceptUpsell)}
            {error && (
              <p className="rp-error" role="alert">
                {error}
              </p>
            )}
            {noButton(nextAfterScratch)}
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="rp-pc">
      {!showList ? (
        <>
          <h1 className="rp-pc-title">{t.giftsTitle}</h1>
          <div className="rp-pc-gifts">
            {[0, 1, 2].map((i) => (
              <Gift
                key={i}
                opened={opened === i}
                faded={opened !== null && opened !== i}
                label="-60%"
                aria={t.giftAria}
                onOpen={() => openGift(i)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="rp-pc-deal">
          <p className="rp-pc-badge">-60%</p>
          <ul className="rp-pc-list">
            {extras.map((o) => {
              const on = picked.includes(o.item);
              return (
                <li key={o.item}>
                  <label className={`rp-pc-item${on ? ' is-on' : ''}`}>
                    {o.cover && <img src={`${imgPath}/${o.cover}`} width={300} height={424} alt="" loading="eager" decoding="async" />}
                    <span className="rp-pc-item__body">
                      <span className="rp-pc-item__head">
                        <span className="rp-pc-item__name">{o.name}</span>
                        <input type="checkbox" checked={on} onChange={() => toggle(o.item)} />
                      </span>
                      {o.benefit && <span className="rp-pc-benefit">{o.benefit}</span>}
                      <span className="rp-pc-prices">
                        <s>{o.wasLabel}</s>
                        <strong>{o.priceLabel}</strong>
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          {yesButton(acceptExtras, picked.length === 0)}
          {error && (
            <p className="rp-error" role="alert">
              {error}
            </p>
          )}
          {noButton(finishFlow)}
        </div>
      )}
    </main>
  );
}
