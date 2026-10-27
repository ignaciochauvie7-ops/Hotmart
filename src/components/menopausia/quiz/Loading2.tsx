import { useEffect, useRef, useState } from 'react';
import { easeInOut, tween, wait, type Canceler } from '../../../lib/menopausia/anim';
import { Check } from './icons';
import { Carousel } from './Carousel';
import { fotosB } from '../../../config/menopausia/photos';

interface Props {
  rows: string[]; // 2 row labels
  onDone: () => void;
}

const FILL_MS = 2000; // per-row fill duration (~2s each, per spec)
const GAP_MS = 350; // beat after a check pops before the next row fills

/**
 * "Comparando con perfiles": rows fill and complete one at a time. Each bar fills
 * on a single ease-in-out curve (~2s each); its check pops in the moment it
 * reaches 100%, then the next row begins.
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
      for (let i = 0; i < rows.length; i++) {
        await tween(0, 100, FILL_MS, (v) => setFill(i, v), reg, easeInOut);
        setCheck(i);
        await wait(GAP_MS, reg);
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
      <Carousel images={fotosB} />
    </div>
  );
}
