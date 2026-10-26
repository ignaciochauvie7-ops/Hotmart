import { useEffect, useRef, useState } from 'react';
import { easeInOut, tween, wait, type Canceler } from '../../../lib/menopausia/anim';
import { Check } from './icons';
import { Carousel } from './Carousel';
import { fotosB } from '../../../config/menopausia/photos';

interface Props {
  rows: string[]; // 2 row labels
  onDone: () => void;
}

const FILL_MS = 2200; // per-row fill duration
const POP_MS = 200; // check pop

/**
 * "Comparando con perfiles": two rows, each with its own thin bar that fills on a
 * single ease-in-out curve. The second row starts once the first reaches 50%, so
 * the wait stays short (~3.5s total). Checks pop in when each bar completes.
 */
export function Loading2({ rows, onDone }: Props) {
  const [fills, setFills] = useState<number[]>(rows.map(() => 0));
  const [checks, setChecks] = useState<boolean[]>(rows.map(() => false));
  const cancelers = useRef<Canceler[]>([]);
  const done = useRef(false);

  useEffect(() => {
    const reg = (c: Canceler) => cancelers.current.push(c);
    const setFill = (i: number, v: number) =>
      setFills((prev) => prev.map((x, idx) => (idx === i ? v : x)));
    const setCheck = (i: number) =>
      setChecks((prev) => prev.map((x, idx) => (idx === i ? true : x)));

    (async () => {
      const row0 = tween(0, 100, FILL_MS, (v) => setFill(0, v), reg, easeInOut).then(() => setCheck(0));
      await wait(FILL_MS / 2, reg); // second row joins at the first's halfway point
      await tween(0, 100, FILL_MS, (v) => setFill(1, v), reg, easeInOut);
      setCheck(1);
      await row0;
      await wait(POP_MS, reg);
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
      <Carousel images={fotosB} />
    </div>
  );
}
