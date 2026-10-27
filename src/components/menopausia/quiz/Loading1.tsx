import { useEffect, useRef, useState } from 'react';
import { easeInOut, tween, wait, type Canceler } from '../../../lib/menopausia/anim';
import { Check } from './icons';
import { Carousel } from './Carousel';
import { fotosA } from '../../../config/menopausia/photos';

interface Props {
  texts: string[]; // phase texts
  onDone: () => void;
}

/** "Analizando tu perfil": one continuous bar (~2.5s, single ease-in-out curve)
 *  + photo carousel below. On reaching 100% a check pops in, then it advances. */
export function Loading1({ texts, onDone }: Props) {
  const [pct, setPct] = useState(0);
  const [complete, setComplete] = useState(false);
  const cancelers = useRef<Canceler[]>([]);
  const done = useRef(false);

  useEffect(() => {
    const reg = (c: Canceler) => cancelers.current.push(c);

    (async () => {
      await tween(0, 100, 2500, setPct, reg, easeInOut);
      setComplete(true);
      await wait(500, reg);
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

  const phase = pct < 40 ? 0 : pct < 70 ? 1 : 2;

  return (
    <div className="m-center m-loader">
      <div className="m-loader-bar" aria-hidden="true">
        <div className="m-loader-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="m-loader-pct">{Math.round(pct)}%</div>
      <p className="m-muted" aria-live="polite">{texts[phase]}</p>
      <div className="m-loader-done">
        <Check className={`m-loader-row__check ${complete ? 'is-on' : ''}`} />
      </div>
      <Carousel images={fotosA} />
    </div>
  );
}
