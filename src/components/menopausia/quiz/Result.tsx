import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { MenoDict } from '../../../config/menopausia/i18n';
import { bmi, estimateKgRange, type QuizAnswers } from '../../../lib/menopausia/state';
import { tween } from '../../../lib/menopausia/anim';

interface Props {
  dict: MenoDict;
  answers: QuizAnswers;
  onSeeMyPlan: () => void;
}

export function Result({ dict, answers, onSeeMyPlan }: Props) {
  const q = dict.quiz;
  const r = q.result;

  const age = answers.age != null ? q.age.options[answers.age] : '—';
  const goal = answers.goal != null ? q.goal.options[answers.goal] : '—';
  const zone = answers.fatZone != null ? q.fatZone.options[answers.fatZone] : '—';
  const symptoms = (answers.symptoms ?? []).slice(0, 3).map((i) => q.symptoms.options[i]);
  const imc = bmi(answers);
  const estimate = r.estimate.replace('{kg}', estimateKgRange(answers));

  return (
    <div>
      <h1 className="m-q" style={{ marginBottom: '1.25rem' }}>{r.title}</h1>

      <div className="m-card">
        <SummaryRow label={r.labelAge} value={age} />
        <SummaryRow label={r.labelGoal} value={goal} />
        {symptoms.length > 0 && <SummaryRow label={r.labelSymptoms} value={symptoms.join(', ')} />}
        <SummaryRow label={r.labelZone} value={zone} />
        {imc != null && (
          <div style={{ marginTop: '0.9rem', paddingTop: '0.9rem', borderTop: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="m-muted">{r.labelImc}</span>
              <CountUp value={imc} decimals={1} />
            </div>
            <p className="m-muted" style={{ fontSize: '0.85rem' }}>{r.imcNote}</p>
          </div>
        )}
      </div>

      <div className="m-card" style={{ marginTop: '1rem' }}>
        <ProgressChart bloating={r.chartBloating} energy={r.chartEnergy} today={r.chartToday} day28={r.chartDay28} />
      </div>

      <p className="m-muted" style={{ marginTop: '1rem', fontSize: '0.95rem' }}>{estimate}</p>

      <button className="m-btn" style={{ marginTop: '1.5rem' }} onClick={onSeeMyPlan}>
        {r.cta}
      </button>
    </div>
  );
}

/** Counts from 0 up to `value` once on mount. Shows the final value immediately under reduced motion. */
function CountUp({ value, decimals }: { value: number; decimals: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let canceler: { cancel: () => void } | undefined;
    tween(0, value, 900, setN, (c) => { canceler = c; });
    return () => canceler?.cancel();
  }, [value, reduce]);
  return (
    <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontVariantNumeric: 'tabular-nums' }}>
      {n.toFixed(decimals)}
    </strong>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.35rem 0' }}>
      <span className="m-muted">{label}</span>
      <span style={{ fontWeight: 600, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function ProgressChart({ bloating, energy, today, day28 }: { bloating: string; energy: string; today: string; day28: string }) {
  const reduce = useReducedMotion();
  const draw = reduce
    ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
    : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } };
  const dot = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.15, duration: 0.3 } };

  return (
    <div>
      <div className="m-chips" style={{ marginBottom: '0.75rem' }}>
        <span className="m-chip" style={{ background: 'color-mix(in srgb, var(--terra) 16%, #fff)', color: 'var(--terra-hover)' }}>
          <Dot color="var(--terra)" /> {bloating}
        </span>
        <span className="m-chip"><Dot color="var(--sage-dark)" /> {energy}</span>
      </div>
      <svg className="m-chart" viewBox="0 0 320 180" role="img" aria-label={`${bloating} / ${energy}`}>
        {/* baseline */}
        <line x1="20" y1="160" x2="300" y2="160" stroke="var(--line)" strokeWidth="1" />
        {/* bloating down */}
        <motion.path d="M20 50 Q150 80 300 145" fill="none" stroke="var(--terra)" strokeWidth="3" strokeLinecap="round" {...draw} />
        {/* energy up */}
        <motion.path d="M20 145 Q150 108 300 48" fill="none" stroke="var(--sage-dark)" strokeWidth="3" strokeLinecap="round" {...draw} />
        {/* day 28 markers */}
        <motion.circle cx="300" cy="145" r="5" fill="var(--terra)" {...dot} />
        <motion.circle cx="300" cy="48" r="5" fill="var(--sage-dark)" {...dot} />
        <line x1="300" y1="30" x2="300" y2="160" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
        {/* x labels */}
        <text x="20" y="176" fontSize="11" fill="var(--muted-text)" fontFamily="Inter, sans-serif">{today}</text>
        <text x="300" y="176" fontSize="11" fill="var(--muted-text)" textAnchor="end" fontFamily="Inter, sans-serif">{day28}</text>
      </svg>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />;
}
