// Quiz answers shared between the Quiz island and the Offer landing.
// Persisted in sessionStorage so a reload mid-funnel keeps the answers.

export interface QuizAnswers {
  age?: number; // index into dict.quiz.age.options
  period?: number;
  fatZone?: number;
  height?: number; // cm
  weight?: number; // kg
  target?: number; // kg
  symptoms?: number[]; // indices into dict.quiz.symptoms.options
  goal?: number;
  movement?: number;
  time?: number;
  lastGood?: number;
  event?: number;
}

const KEY = 'meno_quiz_v1';

export function loadAnswers(): QuizAnswers {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QuizAnswers) : {};
  } catch {
    return {};
  }
}

export function saveAnswers(answers: QuizAnswers): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    /* storage unavailable — ignore */
  }
}

/** BMI, one decimal. Returns null when height/weight missing. */
export function bmi(a: QuizAnswers): number | null {
  if (!a.height || !a.weight) return null;
  const m = a.height / 100;
  if (m <= 0) return null;
  return Math.round((a.weight / (m * m)) * 10) / 10;
}

/** Prudent weight-loss range, always 1..3 kg. Returns "1–3" style string. */
export function estimateKgRange(a: QuizAnswers): string {
  const low = 1;
  let high = 3;
  if (a.weight && a.target) {
    const diff = a.weight - a.target;
    if (diff > 0) high = Math.min(3, Math.max(1, Math.round(diff)));
  }
  if (high <= low) return `${low} kg`;
  return `${low}–${high} kg`;
}
