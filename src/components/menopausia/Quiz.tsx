import { useEffect, useRef, useState, type ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { MenoDict, MenoLocale } from '../../config/menopausia/i18n';
import { loadAnswers, loadStep, saveAnswers, saveStep, type QuizAnswers } from '../../lib/menopausia/state';
import { track, trackCustom } from '../../lib/menopausia/pixel';
import { ArrowLeft, Check, zoneIcons } from './quiz/icons';
import { Img } from './quiz/Img';
import { Loading1 } from './quiz/Loading1';
import { Loading2 } from './quiz/Loading2';
import { Result } from './quiz/Result';

interface Props {
  locale: MenoLocale;
  dict: MenoDict;
}

// Step map
const COVER = 0;
const AGE = 1;
const PERIOD = 2;
const FATZONE = 3;
const REASSURE = 4;
const HEIGHT = 5;
const WEIGHT = 6;
const TARGET = 7;
const LOADING1 = 8;
const SYMPTOMS = 9;
const GOAL = 10;
const MOVEMENT = 11;
const TIME = 12;
const LASTGOOD = 13;
const EVENT = 14;
const LOADING2 = 15;
const RESULT = 16;
const LAST = RESULT;
const LOADERS = new Set([LOADING1, LOADING2]);
// Steps that count toward the progress bar (loaders and result excluded).
const QUESTION_STEPS = [AGE, PERIOD, FATZONE, REASSURE, HEIGHT, WEIGHT, TARGET, SYMPTOMS, GOAL, MOVEMENT, TIME, LASTGOOD, EVENT];

export function Quiz({ locale, dict }: Props) {
  const q = dict.quiz;
  const reduce = useReducedMotion();
  const [step, setStep] = useState(COVER);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = back; drives slide direction
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [pending, setPending] = useState<number | null>(null); // 300ms single-choice feedback
  const [timeAfter, setTimeAfter] = useState(false);
  const firedView = useRef(false);
  const firedLead = useRef(false);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d >= 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d >= 0 ? -24 : 24 }),
  };

  // Hydrate answers + last step from sessionStorage on mount (reload keeps place).
  useEffect(() => {
    setAnswers(loadAnswers());
    const saved = loadStep();
    if (saved != null && saved > COVER && saved <= LAST) setStep(saved);
  }, []);

  // Persist the step on every change so a reload lands on the same screen.
  useEffect(() => {
    saveStep(step);
  }, [step]);

  // Pixel: QuizStep on every advance; ViewContent at step 1; Lead at result.
  useEffect(() => {
    trackCustom('QuizStep', { step, locale });
    if (step >= AGE && !firedView.current) {
      firedView.current = true;
      track('ViewContent', { content_name: 'quiz_menopausia', locale });
    }
    if (step === RESULT && !firedLead.current) {
      firedLead.current = true;
      track('Lead', { content_name: 'quiz_menopausia', locale });
    }
  }, [step, locale]);

  function update(patch: Partial<QuizAnswers>) {
    setAnswers((prev) => {
      const next = { ...prev, ...patch };
      saveAnswers(next);
      return next;
    });
  }

  function go(to: number, direction = 1) {
    setPending(null);
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

  // Single choice: 300ms visual feedback, then advance.
  function pickSingle(key: keyof QuizAnswers, index: number) {
    update({ [key]: index } as Partial<QuizAnswers>);
    setPending(index);
    window.setTimeout(() => {
      setPending(null);
      if (step === TIME) setTimeAfter(true);
      else next();
    }, 300);
  }

  function toggleSymptom(index: number) {
    const current = answers.symptoms ?? [];
    const nextArr = current.includes(index)
      ? current.filter((i) => i !== index)
      : [...current, index];
    update({ symptoms: nextArr });
  }

  const showTopbar = step >= AGE && step <= EVENT && !LOADERS.has(step) && !timeAfter;
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
        </div>
      )}

      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div
          key={timeAfter ? 'time-after' : step}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  function renderStep() {
    if (timeAfter) return <TimeAfter text={q.time.after} onDone={() => { setTimeAfter(false); next(); }} />;

    switch (step) {
      case COVER:
        return (
          <div className="m-center" style={{ paddingTop: '1.5rem' }}>
            <h1 className="m-q" style={{ marginBottom: '1.5rem' }}>{q.cover.title}</h1>
            <Img src="/menopausia/portada.jpg" alt={q.cover.photoAlt} label="Portada" className="m-hero-img" />
            <button className="m-btn" style={{ marginTop: '1.75rem' }} onClick={next}>{q.cover.cta}</button>
          </div>
        );

      case AGE:
        return <Single q={q.age.q} options={q.age.options} selected={answers.age} pending={pending} reduce={reduce}
          onPick={(i) => pickSingle('age', i)} />;

      case PERIOD:
        return <Single q={q.period.q} options={q.period.options} selected={answers.period} pending={pending} reduce={reduce}
          onPick={(i) => pickSingle('period', i)} />;

      case FATZONE:
        return <Single q={q.fatZone.q} options={q.fatZone.options} selected={answers.fatZone} pending={pending} reduce={reduce}
          icons={zoneIcons} onPick={(i) => pickSingle('fatZone', i)} />;

      case REASSURE:
        return (
          <div style={{ paddingTop: '1rem' }}>
            <p style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', lineHeight: 1.4 }}>{q.reassure.body}</p>
            <button className="m-btn" style={{ marginTop: '2rem' }} onClick={next}>{dict.common.continue}</button>
          </div>
        );

      case HEIGHT:
        return <Numeric q={q.height.q} unit={q.height.unit} min={140} max={200} value={answers.height}
          err={q.target.errLess} dict={dict} validate={(v) => (v >= 140 && v <= 200 ? null : 'range')}
          rangeMsg={`140–200 ${q.height.unit}`} onSubmit={(v) => { update({ height: v }); next(); }} />;

      case WEIGHT:
        return <Numeric q={q.weight.q} unit={q.weight.unit} min={40} max={180} value={answers.weight}
          err={q.target.errLess} dict={dict} validate={(v) => (v >= 40 && v <= 180 ? null : 'range')}
          rangeMsg={`40–180 ${q.weight.unit}`} onSubmit={(v) => { update({ weight: v }); next(); }} />;

      case TARGET:
        return <Numeric q={q.target.q} unit={q.target.unit} min={40} max={180} value={answers.target}
          dict={dict}
          validate={(v) => {
            if (v < 40 || v > 180) return 'range';
            if (answers.weight && v >= answers.weight) return q.target.errLess;
            if (answers.weight && answers.weight - v > 25) return q.target.errMax;
            return null;
          }}
          rangeMsg={`40–180 ${q.target.unit}`} onSubmit={(v) => { update({ target: v }); next(); }} />;

      case LOADING1:
        return <Loading1 texts={q.loading1.texts} onDone={next} />;

      case SYMPTOMS:
        return (
          <div>
            <h1 className="m-q">{q.symptoms.q}</h1>
            <div className="m-options">
              {q.symptoms.options.map((opt, i) => {
                const on = (answers.symptoms ?? []).includes(i);
                return (
                  <motion.button key={i} className={`m-option ${on ? 'is-selected' : ''}`} onClick={() => toggleSymptom(i)} aria-pressed={on}
                    whileTap={reduce ? undefined : { scale: 0.97 }} {...optionMotion(i, reduce)}>
                    <span>{opt}</span>
                    <span className="m-option__check">{on && <Check />}</span>
                  </motion.button>
                );
              })}
            </div>
            <button className="m-btn" style={{ marginTop: '1.25rem' }} disabled={(answers.symptoms ?? []).length === 0} onClick={next}>
              {dict.common.continue}
            </button>
          </div>
        );

      case GOAL:
        return <Single q={q.goal.q} options={q.goal.options} selected={answers.goal} pending={pending} reduce={reduce}
          onPick={(i) => pickSingle('goal', i)} />;

      case MOVEMENT:
        return <Single q={q.movement.q} options={q.movement.options} selected={answers.movement} pending={pending} reduce={reduce}
          onPick={(i) => pickSingle('movement', i)} />;

      case TIME:
        return <Single q={q.time.q} options={q.time.options} selected={answers.time} pending={pending} reduce={reduce}
          onPick={(i) => pickSingle('time', i)} />;

      case LASTGOOD:
        return <Single q={q.lastGood.q} options={q.lastGood.options} selected={answers.lastGood} pending={pending} reduce={reduce}
          onPick={(i) => pickSingle('lastGood', i)} />;

      case EVENT:
        return <Single q={q.event.q} options={q.event.options} selected={answers.event} pending={pending} reduce={reduce}
          onPick={(i) => pickSingle('event', i)} />;

      case LOADING2:
        return <Loading2 rows={q.loading2.rows} onDone={next} />;

      case RESULT:
        return <Result dict={dict} answers={answers} onSeeMyPlan={() => { window.location.href = `/menopausia/${locale}/oferta`; }} />;

      default:
        return null;
    }
  }
}

// ── Reusable sub-components ────────────────────────────────────────────────

// Options fade + rise in a 50ms cascade (disabled under reduced motion).
function optionMotion(i: number, reduce: boolean | null) {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.28, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function Single({
  q, options, selected, pending, icons, reduce, onPick,
}: {
  q: string;
  options: string[];
  selected?: number;
  pending: number | null;
  icons?: ((p: { className?: string }) => ReactElement)[];
  reduce: boolean | null;
  onPick: (i: number) => void;
}) {
  return (
    <div>
      <h1 className="m-q">{q}</h1>
      <div className="m-options">
        {options.map((opt, i) => {
          const on = pending === i || (pending === null && selected === i);
          const Icon = icons?.[i];
          return (
            <motion.button
              key={i}
              className={`m-option ${on ? 'is-selected' : ''}`}
              onClick={() => onPick(i)}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              {...optionMotion(i, reduce)}
            >
              {Icon && <Icon className="m-option__icon" />}
              <span>{opt}</span>
              <span className="m-option__check">{on && <Check />}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Numeric({
  q, unit, min, max, value, dict, validate, rangeMsg, onSubmit,
}: {
  q: string;
  unit: string;
  min: number;
  max: number;
  value?: number;
  err?: string;
  dict: MenoDict;
  validate: (v: number) => string | null;
  rangeMsg: string;
  onSubmit: (v: number) => void;
}) {
  const [raw, setRaw] = useState(value != null ? String(value) : '');
  const [error, setError] = useState<string | null>(null);

  function submit() {
    const v = Number(raw);
    if (!raw || Number.isNaN(v)) {
      setError(rangeMsg);
      return;
    }
    const problem = validate(v);
    if (problem) {
      setError(problem === 'range' ? rangeMsg : problem);
      return;
    }
    setError(null);
    onSubmit(v);
  }

  return (
    <div>
      <h1 className="m-q">{q}</h1>
      <div className="m-number">
        <input
          type="number"
          inputMode="numeric"
          autoFocus
          value={raw}
          min={min}
          max={max}
          placeholder="—"
          onChange={(e) => setRaw(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          aria-label={q}
        />
        <span className="m-number__unit">{unit}</span>
      </div>
      {error && <p className="m-field-error">{error}</p>}
      <button className="m-btn" onClick={submit}>{dict.common.continue}</button>
    </div>
  );
}

function TimeAfter({ text, onDone }: { text: string; onDone: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onDone, 1600);
    return () => window.clearTimeout(id);
  }, [onDone]);
  return (
    <div className="m-center" style={{ paddingTop: '3rem' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--sage)', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 1.25rem' }}>
        <Check className="" />
      </div>
      <p style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)' }}>{text}</p>
    </div>
  );
}
