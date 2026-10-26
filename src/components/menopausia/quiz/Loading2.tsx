import { useEffect, useRef, useState } from 'react';
import { tween, wait, type Canceler } from '../../../lib/menopausia/anim';
import { Check } from './icons';

interface Props {
  rows: string[]; // 3 row labels
  onDone: () => void;
}

/** "Creando tu plan": three bars fill one after another with checks (~7s). */
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
        await tween(0, 55, 700, (v) => setFill(i, v), reg);
        await wait(i === 1 ? 600 : 400, reg);
        await tween(55, 100, 900, (v) => setFill(i, v), reg);
        setChecks((prev) => prev.map((x, idx) => (idx === i ? true : x)));
        await wait(350, reg);
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
    <div>
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
    </div>
  );
}
