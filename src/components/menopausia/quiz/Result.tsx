import type { MenoDict } from '../../../config/menopausia/i18n';
import { bmi, estimateKgRange, type QuizAnswers } from '../../../lib/menopausia/state';

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
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>{imc}</strong>
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.35rem 0' }}>
      <span className="m-muted">{label}</span>
      <span style={{ fontWeight: 600, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function ProgressChart({ bloating, energy, today, day28 }: { bloating: string; energy: string; today: string; day28: string }) {
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
        <path d="M20 50 Q150 80 300 145" fill="none" stroke="var(--terra)" strokeWidth="3" strokeLinecap="round" />
        {/* energy up */}
        <path d="M20 145 Q150 108 300 48" fill="none" stroke="var(--sage-dark)" strokeWidth="3" strokeLinecap="round" />
        {/* day 28 markers */}
        <circle cx="300" cy="145" r="5" fill="var(--terra)" />
        <circle cx="300" cy="48" r="5" fill="var(--sage-dark)" />
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
