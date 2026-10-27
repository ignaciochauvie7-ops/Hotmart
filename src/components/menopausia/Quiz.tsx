import { useEffect, useRef, useState, type CSSProperties, type ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { MenoDict, MenoLocale } from '../../config/menopausia/i18n';
import { loadAnswers, loadStep, saveAnswers, saveStep, type QuizAnswers } from '../../lib/menopausia/state';
import { fotosA, fotosB } from '../../config/menopausia/photos';
import { track, trackCustom } from '../../lib/menopausia/pixel';
import { ArrowLeft, Check, Restart, zoneIcons } from './quiz/icons';
import { Loading1 } from './quiz/Loading1';
import { Loading2 } from './quiz/Loading2';

interface Props {
  locale: MenoLocale;
  dict: MenoDict;
}

// Step map. 10 questions split by two loaders; no result screen (loader 2 → offer).
const COVER = 0;
const AGE = 1;
const HEIGHT = 2;
const WEIGHT = 3;
const FATZONE = 4;
const LOADING1 = 5;
const GOAL = 6;
const TARGET = 7;
const PERIOD = 8;
const SYMPTOMS = 9;
const MOVEMENT = 10;
const LASTGOOD = 11;
const LOADING2 = 12;
const LAST = LOADING2;
const LOADERS = new Set([LOADING1, LOADING2]);
// The 10 steps that count toward the progress bar (loaders excluded), in flow order.
const QUESTION_STEPS = [AGE, HEIGHT, WEIGHT, FATZONE, GOAL, TARGET, PERIOD, SYMPTOMS, MOVEMENT, LASTGOOD];
// Session flag so Lead fires at most once even across reloads.
const LEAD_KEY = 'meno_quiz_lead_v1';

// Has this question step been answered? Drives the no-skip guard on reload.
function isAnswered(step: number, a: QuizAnswers): boolean {
  switch (step) {
    case AGE: return a.age != null;
    case HEIGHT: return a.height != null;
    case WEIGHT: return a.weight != null;
    case FATZONE: return a.fatZone != null;
    case GOAL: return a.goal != null;
    case TARGET: return a.target != null;
    case PERIOD: return a.period != null;
    case SYMPTOMS: return (a.symptoms?.length ?? 0) > 0;
    case MOVEMENT: return a.movement != null;
    case LASTGOOD: return a.lastGood != null;
    default: return true;
  }
}

// First question (in flow order) the visitor hasn't answered yet — the furthest
// step they may legitimately be on. All answered → the last step (loader 2).
function firstUnanswered(a: QuizAnswers): number {
  for (const s of QUESTION_STEPS) if (!isAnswered(s, a)) return s;
  return LAST;
}

export function Quiz({ locale, dict }: Props) {
  const q = dict.quiz;
  const reduce = useReducedMotion();
  const [step, setStep] = useState(COVER);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  // One shared unit preference across height/weight/target (metric vs imperial).
  // Picking ft/in on height carries lb over to the weight sliders and back.
  const [imperial, setImperial] = useState(false);
  const firedView = useRef(false);
  const firedLead = useRef(false);

  // Screen-to-screen transition: a mega-subtle zoom. The outgoing screen eases
  // back (scale 1→0.98) and fades; the incoming one zooms in (0.98→1) and fades.
  // mode="wait" runs them in sequence (out, then in) so there's no layout overlap
  // — that overlap was what made the cover→Q1 step stutter. transform+opacity
  // only, strong ease-out (the --ease-out token), all under 300ms.
  const EASE = [0.22, 1, 0.36, 1] as const;
  const variants = {
    enter: { opacity: 0, scale: reduce ? 1 : 0.98 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
    exit: { opacity: 0, scale: reduce ? 1 : 0.98, transition: { duration: 0.2, ease: EASE } },
  };

  // Hydrate answers + last step from sessionStorage on mount (reload keeps place).
  // Never restore onto a loader step — those are transient and would bounce the
  // visitor forward to the offer on reload. Also clamp to the first unanswered
  // question so a stale/tampered step can't skip ahead of the answers given.
  useEffect(() => {
    const a = loadAnswers();
    setAnswers(a);
    if (sessionStorage.getItem(LEAD_KEY) === '1') firedLead.current = true;
    const saved = loadStep();
    if (saved != null && saved > COVER) {
      let target = Math.min(saved, firstUnanswered(a));
      while (target > COVER && LOADERS.has(target)) target -= 1;
      if (target > COVER && target <= LAST) setStep(target);
    }
  }, []);

  // Persist the step on every change so a reload lands on the same screen.
  useEffect(() => {
    saveStep(step);
  }, [step]);

  // Warm the cache for the first image of each loader while earlier questions
  // are being answered, so the carousels show instantly.
  useEffect(() => {
    [fotosA[0], fotosB[0]].forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  // Pixel: QuizStep on every advance; ViewContent at step 1. Lead fires when loader 2 finishes.
  useEffect(() => {
    trackCustom('QuizStep', { step, locale });
    if (step >= AGE && !firedView.current) {
      firedView.current = true;
      track('ViewContent', { content_name: 'quiz_menopausia', locale });
    }
  }, [step, locale]);

  // End of the quiz: fire Lead once (deduped across reloads via sessionStorage),
  // then go straight to the offer.
  function finish() {
    if (!firedLead.current) {
      firedLead.current = true;
      try { sessionStorage.setItem(LEAD_KEY, '1'); } catch { /* ignore */ }
      track('Lead', { content_name: 'quiz_menopausia', locale });
    }
    window.location.href = `/menopausia/${locale}/oferta`;
  }

  function update(patch: Partial<QuizAnswers>) {
    setAnswers((prev) => {
      const next = { ...prev, ...patch };
      saveAnswers(next);
      return next;
    });
  }

  function go(to: number) {
    setStep(Math.max(COVER, Math.min(LAST, to)));
  }

  function next() {
    go(step + 1);
  }

  function back() {
    let to = step - 1;
    while (to > COVER && LOADERS.has(to)) to -= 1;
    go(to);
  }

  // Start over from the cover (clears saved answers + step).
  function restart() {
    saveAnswers({});
    setAnswers({});
    firedView.current = false;
    firedLead.current = false;
    try { sessionStorage.removeItem(LEAD_KEY); } catch { /* ignore */ }
    go(COVER);
  }

  // Single choice: record the answer and advance in the same frame — no delay.
  function pickSingle(key: keyof QuizAnswers, index: number) {
    update({ [key]: index } as Partial<QuizAnswers>);
    next();
  }

  // Multi-select symptoms. The last option ("Ninguno") is exclusive: picking it
  // clears the rest, and picking any other symptom clears "Ninguno".
  function toggleSymptom(index: number, noneIndex: number) {
    const current = answers.symptoms ?? [];
    const has = current.includes(index);
    let nextArr: number[];
    if (index === noneIndex) {
      nextArr = has ? [] : [noneIndex];
    } else {
      nextArr = has
        ? current.filter((i) => i !== index)
        : [...current.filter((i) => i !== noneIndex), index];
    }
    update({ symptoms: nextArr });
  }

  const showTopbar = step >= AGE && step <= LASTGOOD && !LOADERS.has(step);
  // Percentage over question steps only — loaders and result don't count.
  const qIndex = QUESTION_STEPS.indexOf(step);
  const progress = qIndex >= 0 ? Math.round(((qIndex + 1) / QUESTION_STEPS.length) * 100) : 0;

  return (
    <div className="m-shell">
      {showTopbar && (
        <div className="m-topbar">
          <button className="m-back" onClick={back} aria-label={dict.common.backAria} disabled={step <= COVER}>
            <ArrowLeft />
          </button>
          <div className="m-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="m-progress__fill" style={{ width: `${progress}%` }} />
          </div>
          <button className="m-back m-restart" onClick={restart} aria-label={dict.common.restartAria}>
            <Restart />
          </button>
        </div>
      )}

      <div className="m-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            className="m-screen"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  function renderStep() {
    switch (step) {
      case COVER:
        return (
          <div className="m-center m-cover">
            <span className="m-cover-badge">{q.cover.badge}</span>
            <h1 className="m-q m-cover-title">{q.cover.title}</h1>
            <img
              className="m-cover-photo"
              src="/menopausia/portada.webp"
              alt={q.cover.photoAlt}
              width={900}
              height={1125}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <button className="m-btn" onClick={next}>{q.cover.cta}</button>
          </div>
        );

      case AGE:
        return <Single q={q.age.q} options={q.age.options} selected={answers.age}
          onPick={(i) => pickSingle('age', i)} />;

      case HEIGHT:
        return <MeasureSlider key="height" type="height" q={q.height.q} dict={dict}
          metricMin={140} metricMax={200} step={1} initial={answers.height ?? 162}
          imperial={imperial} onImperial={setImperial}
          onSubmit={(v) => { update({ height: v }); next(); }} />;

      case WEIGHT:
        return <MeasureSlider key="weight" type="weight" q={q.weight.q} dict={dict}
          metricMin={40} metricMax={150} step={1} initial={answers.weight ?? 70}
          imperial={imperial} onImperial={setImperial}
          onSubmit={(v) => { update({ weight: v }); next(); }} />;

      case FATZONE:
        return <Single q={q.fatZone.q} options={q.fatZone.options} selected={answers.fatZone}
          icons={zoneIcons} onPick={(i) => pickSingle('fatZone', i)} />;

      case LOADING1:
        return <Loading1 texts={q.loading1.texts} onDone={next} />;

      case GOAL:
        return <Single q={q.goal.q} options={q.goal.options} selected={answers.goal}
          onPick={(i) => pickSingle('goal', i)} />;

      case TARGET: {
        const w = answers.weight ?? 70;
        // Range runs from 40 kg up to the current weight; start 5 kg below it.
        const tMin = 40;
        const tMax = Math.max(tMin, w);
        const init = Math.min(tMax, Math.max(tMin, answers.target ?? w - 5));
        return <MeasureSlider key={`target-${w}`} type="target" q={q.target.q} dict={dict}
          metricMin={tMin} metricMax={tMax} step={1} initial={init} weight={w}
          imperial={imperial} onImperial={setImperial}
          onSubmit={(v) => { update({ target: v }); next(); }} />;
      }

      case PERIOD:
        return <Single q={q.period.q} options={q.period.options} selected={answers.period}
          onPick={(i) => pickSingle('period', i)} />;

      case SYMPTOMS:
        return (
          <>
            <div className="m-screen__body">
              <h1 className="m-q">{q.symptoms.q}</h1>
              <div className="m-options">
                {q.symptoms.options.map((opt, i) => {
                  const on = (answers.symptoms ?? []).includes(i);
                  const noneIndex = q.symptoms.options.length - 1;
                  return (
                    <button key={i} className={`m-option ${on ? 'is-selected' : ''}`} onClick={() => toggleSymptom(i, noneIndex)} aria-pressed={on}>
                      <span>{opt}</span>
                      <span className="m-option__check">{on && <Check />}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="m-screen__foot">
              <button className="m-btn" disabled={(answers.symptoms ?? []).length === 0} onClick={next}>
                {dict.common.continue}
              </button>
            </div>
          </>
        );

      case MOVEMENT:
        return <Single q={q.movement.q} options={q.movement.options} selected={answers.movement}
          onPick={(i) => pickSingle('movement', i)} />;

      case LASTGOOD:
        return <Single q={q.lastGood.q} options={q.lastGood.options} selected={answers.lastGood}
          onPick={(i) => pickSingle('lastGood', i)} />;

      case LOADING2:
        return <Loading2 rows={q.loading2.rows} onDone={finish} />;

      default:
        return null;
    }
  }
}

// ── Reusable sub-components ────────────────────────────────────────────────

function Single({
  q, options, selected, icons, onPick,
}: {
  q: string;
  options: string[];
  selected?: number;
  icons?: ((p: { className?: string }) => ReactElement)[];
  onPick: (i: number) => void;
}) {
  // Advance on pointerup so there's no tap delay; keep keyboard support too.
  // Options render all at once (no cascade); the press feedback is CSS :active.
  return (
    <div className="m-screen__body">
      <h1 className="m-q">{q}</h1>
      <div className="m-options">
        {options.map((opt, i) => {
          const on = selected === i;
          const Icon = icons?.[i];
          return (
            <button
              key={i}
              className={`m-option ${on ? 'is-selected' : ''}`}
              onPointerUp={() => onPick(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPick(i);
                }
              }}
            >
              {Icon && <Icon className="m-option__icon" />}
              <span>{opt}</span>
              <span className="m-option__check">{on && <Check />}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Big slider for height / weight / target. Always stores metric; display converts.
function MeasureSlider({
  type, q, metricMin, metricMax, step, initial, weight, imperial, onImperial, dict, onSubmit,
}: {
  type: 'height' | 'weight' | 'target';
  q: string;
  metricMin: number;
  metricMax: number;
  step: number;
  initial: number;
  weight?: number;
  imperial: boolean;
  onImperial: (b: boolean) => void;
  dict: MenoDict;
  onSubmit: (v: number) => void;
}) {
  const [v, setV] = useState(Math.min(metricMax, Math.max(metricMin, Math.round(initial))));
  const isLength = type === 'height';
  const metricU = isLength ? 'cm' : 'kg';

  const main = displayMain(type, v, imperial);
  const suffix = imperial ? (isLength ? '' : 'lb') : metricU;
  const pct = ((v - metricMin) / (metricMax - metricMin || 1)) * 100;

  return (
    <>
      <div className="m-screen__body">
        <h1 className="m-q">{q}</h1>

        <div className="m-unit-toggle" role="group" aria-label={q}>
          <button type="button" className={!imperial ? 'is-on' : ''} onClick={() => onImperial(false)}>
            {isLength ? 'cm' : 'kg'}
          </button>
          <button type="button" className={imperial ? 'is-on' : ''} onClick={() => onImperial(true)}>
            {isLength ? 'ft/in' : 'lb'}
          </button>
        </div>

        <div className="m-measure">
          <span className="m-measure__val">{main}</span>
          {suffix && <span className="m-measure__unit">{suffix}</span>}
        </div>

        {type === 'target' && weight != null && (
          <div className="m-measure__diff">
            <span className="m-chip m-chip--diff">{diffLabel(weight, v, imperial)}</span>
          </div>
        )}

        <input
          type="range"
          className="m-slider"
          min={metricMin}
          max={metricMax}
          step={step}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label={q}
          aria-valuetext={`${main} ${suffix}`.trim()}
          style={{ '--m-slider-pct': `${pct}%` } as CSSProperties}
        />
      </div>

      <div className="m-screen__foot">
        <button className="m-btn" onClick={() => onSubmit(v)}>{dict.common.continue}</button>
      </div>
    </>
  );
}

// Big value as it should read on screen (metric number, or imperial conversion).
function displayMain(type: 'height' | 'weight' | 'target', metric: number, imperial: boolean): string {
  if (type === 'height') {
    if (!imperial) return String(metric);
    const totalIn = Math.round(metric / 2.54);
    const ft = Math.floor(totalIn / 12);
    const inch = totalIn % 12;
    return `${ft}′${inch}″`;
  }
  // weight / target
  if (!imperial) return String(metric);
  return String(Math.round(metric / 0.45359237));
}

function diffLabel(weightKg: number, targetKg: number, imperial: boolean): string {
  const diffKg = Math.max(0, weightKg - targetKg);
  if (imperial) return `−${Math.round(diffKg / 0.45359237)} lb`;
  return `−${diffKg} kg`;
}
