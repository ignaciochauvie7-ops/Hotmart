import { useEffect, useRef, useState } from 'react';
import { easeInOut, tween, wait, type Canceler } from '../../../lib/menopausia/anim';
import { Check } from './icons';
import { Carousel } from './Carousel';
import { fotosB } from '../../../config/menopausia/photos';

interface Props {
  rows: string[]; // 2 row labels
  onDone: () => void;
}

const FILL_MS = 3000; // per-row fill duration (~3s each) so each label is readable
const STAGGER_MS = FILL_MS / 2; // next row starts when the previous is ~halfway (~1.5s)
const GAP_MS = 350; // beat after the last check pops before advancing

/**
 * "Comparando con perfiles": each bar fills on a single ease-in-out curve (~3s),
 * but the next row starts when the previous is ~halfway instead of waiting for it
 * to finish — so both labels stay readable while the total stays ~4.5s. A check
 * pops the moment each bar reaches 100%.
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

    const runRow = async (i: number) => {
      if (i > 0) await wait(i * STAGGER_MS, reg);
      await tween(0, 100, FILL_MS, (v) => setFill(i, v), reg, easeInOut);
      setCheck(i);
    };

    (async () => {
      await Promise.all(rows.map((_, i) => runRow(i)));
      await wait(GAP_MS, reg);
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
