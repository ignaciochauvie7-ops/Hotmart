import { useEffect, useRef, useState } from 'react';
import { easeInOut, tween, type Canceler } from '../../../lib/menopausia/anim';
import { Carousel } from './Carousel';
import { fotosA } from '../../../config/menopausia/photos';

interface Props {
  texts: string[]; // 3 phase texts
  onDone: () => void;
}

/** "Analizando tu perfil": one continuous bar (3s, single ease-in-out curve) + photo carousel below. */
export function Loading1({ texts, onDone }: Props) {
  const [pct, setPct] = useState(0);
  const cancelers = useRef<Canceler[]>([]);
  const done = useRef(false);

  useEffect(() => {
    const reg = (c: Canceler) => cancelers.current.push(c);

    tween(0, 100, 3000, setPct, reg, easeInOut).then(() => {
      if (!done.current) {
        done.current = true;
        onDone();
      }
    });

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
      <Carousel images={fotosA} />
    </div>
  );
}
