import { useEffect, useRef, useState } from 'react';
import { tween, wait, type Canceler } from '../../../lib/menopausia/anim';
import { Check } from './icons';
import { Carousel } from './Carousel';

interface Props {
  rows: string[]; // 3 row labels
  onDone: () => void;
}

// Per-row fill durations + trailing pauses, tuned to ~4s total with irregular breaks.
const FILL = [900, 1000, 1100];
const PAUSE = [250, 450, 250];

/** "Creando tu plan": three bars fill one after another (~4s) + photo carousel below. */
export function Loading2({ rows, onDone }: Props) {
  const [fills, setFills] = useState<number[]>(rows.map(() => 0));
  const [checks, setChecks] = useState<boolean[]>(rows.map(() => false));
  const cancelers = useRef<Canceler[]>([]);
  const done = useRef(false);

  useEffect(() => {
    const reg = (c: Canceler) => cancelers.current.push(c);
    const setFill = (i: number, v: number) =>
      setFills((prev) => prev.map((x, idx) => (idx === i ? v : x)));

    (async () => {
      for (let i = 0; i < rows.length; i++) {
        await tween(0, 100, FILL[i] ?? 900, (v) => setFill(i, v), reg);
        setChecks((prev) => prev.map((x, idx) => (idx === i ? true : x)));
        await wait(PAUSE[i] ?? 250, reg);
      }
      if (!done.current) {
        done.current = true;
        onDone();
      }
    })();

    return () => {
      cancelers.current.forEach((c) => c.cancel());
      cancelers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-loader">
      {rows.map((label, i) => (
        <div className="m-loader-row" key={i}>
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>{label}</span>
            <span className="m-loader-row__bar">
              <span className="m-loader-row__fill" style={{ width: `${fills[i]}%` }} />
            </span>
          </span>
          <Check className={`m-loader-row__check ${checks[i] ? 'is-on' : ''}`} />
        </div>
      ))}
      <Carousel />
    </div>
  );
}
