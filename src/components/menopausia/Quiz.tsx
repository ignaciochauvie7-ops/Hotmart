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
// The 10 steps that count toward the progress bar (loaders excluded).
const QUESTION_STEPS = [AGE, HEIGHT, WEIGHT, FATZONE, GOAL, TARGET, PERIOD, SYMPTOMS, MOVEMENT, LASTGOOD];

export function Quiz({ locale, dict }: Props) {
  const q = dict.quiz;
  const reduce = useReducedMotion();
  const [step, setStep] = useState(COVER);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = back; drives slide direction
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [lenUnit, setLenUnit] = useState<'cm' | 'ft'>('cm');
  const [massUnit, setMassUnit] = useState<'kg' | 'lb'>('kg');
  const firedView = useRef(false);
  const firedLead = useRef(false);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d >= 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d >= 0 ? -24 : 24 }),
  };

  // Hydrate answers + last step from sessionStorage on mount (reload keeps place).
  // Never restore onto a loader step — those are transient and would bounce the
  // visitor forward to the offer on reload.
  useEffect(() => {
    setAnswers(loadAnswers());
    const saved = loadStep();
    if (saved != null && saved > COVER && saved <= LAST && !LOADERS.has(saved)) setStep(saved);
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

  // End of the quiz: fire Lead once, then go straight to the offer.
  function finish() {
    if (!firedLead.current) {
      firedLead.current = true;
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

  function go(to: number, direction = 1) {
    setDir(direction);
    setStep(Math.max(COVER, Math.min(LAST, to)));
  }

  function next() {
    go(step + 1, 1);
  }

  function back() {
    let to = step - 1;
    while (to > COVER && LOADERS.has(to)) to -= 1;
    go(to, -1);
  }

  // Start over from the cover (clears saved answers + step).
  function restart() {
    saveAnswers({});
    setAnswers({});
    firedView.current = false;
    firedLead.current = false;
    go(COVER, -1);
  }

  // Single choice: record the answer and advance in the same frame — no delay.
  function pickSingle(key: keyof QuizAnswers, index: number) {
    update({ [key]: index } as Partial<QuizAnswers>);
    next();
  }

  function toggleSymptom(index: number) {
    const current = answers.symptoms ?? [];
    const nextArr = current.includes(index)
      ? current.filter((i) => i !== index)
      : [...current, index];
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
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={step}
            className="m-screen"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
              alt=""
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
          metricMin={140} metricMax={200} step={1} initial={answers.height ?? 165}
          unit={lenUnit} onUnit={(u) => setLenUnit(u as 'cm' | 'ft')}
          onSubmit={(v) => { update({ height: v }); next(); }} />;

      case WEIGHT:
        return <MeasureSlider key="weight" type="weight" q={q.weight.q} dict={dict}
          metricMin={40} metricMax={150} step={1} initial={answers.weight ?? 70}
          unit={massUnit} onUnit={(u) => setMassUnit(u as 'kg' | 'lb')}
          onSubmit={(v) => { update({ weight: v }); next(); }} />;

      case FATZONE:
        return <Single q={q.fatZone.q} options={q.fatZone.options} selected={answers.fatZone} reduce={reduce}
          icons={zoneIcons} onPick={(i) => pickSingle('fatZone', i)} />;

      case LOADING1:
        return <Loading1 texts={q.loading1.texts} onDone={next} />;

      case GOAL:
        return <Single q={q.goal.q} options={q.goal.options} selected={answers.goal}
          onPick={(i) => pickSingle('goal', i)} />;

      case TARGET: {
        const w = answers.weight ?? 70;
        const tMin = Math.max(40, w - 25);
        const tMax = Math.max(tMin, w - 1);
        const init = Math.min(tMax, Math.max(tMin, answers.target ?? w - 5));
        return <MeasureSlider key={`target-${w}`} type="target" q={q.target.q} dict={dict}
          metricMin={tMin} metricMax={tMax} step={1} initial={init} weight={w}
          unit={massUnit} onUnit={(u) => setMassUnit(u as 'kg' | 'lb')}
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
                  return (
                    <button key={i} className={`m-option ${on ? 'is-selected' : ''}`} onClick={() => toggleSymptom(i)} aria-pressed={on}>
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
  type, q, metricMin, metricMax, step, initial, weight, unit, onUnit, dict, onSubmit,
}: {
  type: 'height' | 'weight' | 'target';
  q: string;
  metricMin: number;
  metricMax: number;
  step: number;
  initial: number;
  weight?: number;
  unit: 'cm' | 'ft' | 'kg' | 'lb';
  onUnit: (u: string) => void;
  dict: MenoDict;
  onSubmit: (v: number) => void;
}) {
  const [v, setV] = useState(Math.min(metricMax, Math.max(metricMin, Math.round(initial))));
  const isLength = type === 'height';
  const metricU = isLength ? 'cm' : 'kg';
  const imperialU = isLength ? 'ft' : 'lb';
  const imperial = unit === 'ft' || unit === 'lb';

  const main = displayMain(type, v, imperial);
  const suffix = imperial ? (isLength ? '' : 'lb') : metricU;
  const pct = ((v - metricMin) / (metricMax - metricMin || 1)) * 100;

  return (
    <>
      <div className="m-screen__body">
        <h1 className="m-q">{q}</h1>

        <div className="m-unit-toggle" role="group" aria-label={q}>
          <button type="button" className={!imperial ? 'is-on' : ''} onClick={() => onUnit(metricU)}>
            {isLength ? 'cm' : 'kg'}
          </button>
          <button type="button" className={imperial ? 'is-on' : ''} onClick={() => onUnit(imperialU)}>
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
