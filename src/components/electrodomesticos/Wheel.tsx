import { useEffect, useRef, useState } from "react";
import { texts as t } from "../../config/electrodomesticos";

const STORAGE_KEY = "rp_wheel_claimed";

/** true si el descuento de la ruleta ya se reclamó en este navegador. */
export function wheelClaimed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

const SIZE = 300;
const C = SIZE / 2;
const R = C - 6;

/** Punto del borde a `deg` grados desde arriba, en sentido horario. */
function at(deg: number, r: number): string {
  const a = (deg * Math.PI) / 180;
  return `${(C + r * Math.sin(a)).toFixed(2)} ${(C - r * Math.cos(a)).toFixed(2)}`;
}

interface Props {
  /** Se llama al pulsar "Reclamar" (el descuento queda aplicado en la página). */
  onClaim: () => void;
}

/**
 * Ruleta de descuentos que se abre al entrar. El primer sector de
 * `wheel.segments` es el premio: el giro pasa ya muy lento por el sector
 * vecino (un descuento pequeño) y se detiene justo al entrar en el premio.
 */
export function Wheel({ onClaim }: Props) {
  const w = t.wheel;
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"idle" | "spinning" | "won">("idle");
  const discRef = useRef<SVGSVGElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Solo la primera visita: quien ya reclamó no vuelve a ver la ruleta.
  // Para volver a verla al probar: añade ?ruleta=1 a la URL.
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('ruleta');
    if (forced || !wheelClaimed()) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    btnRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const n = w.segments.length;
  const step = 360 / n;

  function spin() {
    const disc = discRef.current;
    if (phase !== "idle" || !disc) return;
    setPhase("spinning");
    // Bajo el puntero queda el ángulo (360 − giro). El premio ocupa [0, step) y
    // el sector vecino [step, 2·step). Un único frenado continuo: la ruleta
    // recorre el vecino ya muy despacio y se para nada más cruzar al premio.
    const final = 360 * 5 + 360 - step * 0.86;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || typeof disc.animate !== "function") {
      disc.style.transform = `rotate(${final % 360}deg)`;
      setPhase("won");
      return;
    }
    const anim = disc.animate(
      [{ transform: "rotate(0deg)" }, { transform: `rotate(${final}deg)` }],
      {
        duration: 6500,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        fill: "forwards",
      },
    );
    anim.onfinish = () => setPhase("won");
  }

  function claim() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* sin storage: la ruleta volverá a salir en la próxima visita */
    }
    setOpen(false);
    onClaim();
  }

  const won = phase === "won";

  return (
    <div
      className="m-wheel"
      role="dialog"
      aria-modal="true"
      aria-label={w.title}
    >
      <div className="m-wheel__backdrop" />
      <div className="m-wheel__card">
        <button
          className="m-wheel__close"
          aria-label={w.close}
          onClick={() => setOpen(false)}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <p className="m-wheel__title">{w.title}</p>

        <div className="m-wheel__stage">
          <span className="m-wheel__pointer" aria-hidden="true" />
          <svg
            ref={discRef}
            className="m-wheel__disc"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
          >
            <circle cx={C} cy={C} r={C} className="m-wheel__rim" />
            {w.segments.map((label, i) => {
              const a0 = i * step;
              const kind = i === 0 ? "prize" : i % 2 ? "dark" : "light";
              return (
                <g key={label} className={`m-wheel__seg m-wheel__seg--${kind}`}>
                  <path
                    d={`M${C} ${C} L${at(a0, R)} A${R} ${R} 0 0 1 ${at(a0 + step, R)} Z`}
                  />
                  <text
                    x={C}
                    y={C - R * 0.6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${a0 + step / 2} ${C} ${C})`}
                  >
                    {label}
                  </text>
                </g>
              );
            })}
            <circle cx={C} cy={C} r={20} className="m-wheel__hub" />
          </svg>
        </div>

        {won ? (
          <>
            <p className="m-wheel__won" role="status">
              {w.wonTitle}
            </p>
            <button
              ref={btnRef}
              className="m-btn m-btn--glow m-wheel__cta"
              onClick={claim}
            >
              {w.claim}
            </button>
          </>
        ) : (
          <button
            ref={btnRef}
            className="m-btn m-btn--glow m-wheel__cta"
            onClick={spin}
            disabled={phase === "spinning"}
          >
            {w.spin}
          </button>
        )}
      </div>
    </div>
  );
}
