import { useEffect, useState } from 'react';

const PHOTOS = [1, 2, 3, 4, 5, 6];

/**
 * Crossfading photo carousel shown under the loading bars.
 * Reads /menopausia/mujeres/1.jpg … 6.jpg. Any image that 404s falls back to a
 * cream/sage placeholder so the movement is visible before real photos exist;
 * once the real files are uploaded with those names they appear automatically.
 */
export function Carousel() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % PHOTOS.length), 1200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="m-carousel" aria-hidden="true">
      {PHOTOS.map((n, i) => (
        <Slide key={n} n={n} active={i === slide} />
      ))}
    </div>
  );
}

function Slide({ n, active }: { n: number; active: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`m-carousel__slide ${active ? 'is-active' : ''}`}>
      {failed ? (
        <div className="m-carousel__placeholder" />
      ) : (
        <img
          src={`/menopausia/mujeres/${n}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
