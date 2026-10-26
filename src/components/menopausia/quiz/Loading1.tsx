import { useEffect, useRef, useState } from 'react';
import { tween, wait, type Canceler } from '../../../lib/menopausia/anim';
import { Img } from './Img';

interface Props {
  texts: string[]; // 3 phase texts
  onDone: () => void;
}

const PHOTOS = [1, 2, 3, 4, 5, 6];

/** "Analizando tu perfil": photo carousel + non-linear progress bar (~5-6s). */
export function Loading1({ texts, onDone }: Props) {
  const [pct, setPct] = useState(0);
  const [slide, setSlide] = useState(0);
  const cancelers = useRef<Canceler[]>([]);
  const done = useRef(false);

  useEffect(() => {
    const reg = (c: Canceler) => cancelers.current.push(c);

    const carousel = setInterval(() => setSlide((s) => (s + 1) % PHOTOS.length), 1200);

    (async () => {
      await tween(0, 34, 900, setPct, reg);
      await wait(700, reg);
      await tween(34, 61, 900, setPct, reg);
      await wait(1000, reg);
      await tween(61, 100, 1500, setPct, reg);
      if (!done.current) {
        done.current = true;
        onDone();
      }
    })();

    return () => {
      clearInterval(carousel);
      cancelers.current.forEach((c) => c.cancel());
      cancelers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const phase = pct < 34 ? 0 : pct < 61 ? 1 : 2;

  return (
    <div className="m-center">
      <div className="m-loader-slides">
        {PHOTOS.map((n, i) => (
          <Img
            key={n}
            src={`/menopausia/mujeres/${n}.jpg`}
            alt=""
            label="Foto"
            className={`m-loader-slide ${i === slide ? 'is-active' : ''}`}
          />
        ))}
      </div>

      <div className="m-loader-bar" aria-hidden="true">
        <div className="m-loader-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="m-loader-pct">{Math.round(pct)}%</div>
      <p className="m-muted" aria-live="polite">{texts[phase]}</p>
    </div>
  );
}
