import { useEffect, useState } from 'react';

interface Props {
  images: string[]; // optimized WebP urls for this group
}

/**
 * Crossfading photo carousel shown under the loading bars. The first image loads
 * eagerly (high priority) so there's no gap; the rest lazy-load. Any image that
 * 404s falls back to a soft placeholder so the movement is always visible.
 */
export function Carousel({ images }: Props) {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % images.length), 1200);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="m-carousel" aria-hidden="true">
      {images.map((src, i) => (
        <Slide key={src} src={src} active={i === slide} eager={i === 0} />
      ))}
    </div>
  );
}

function Slide({ src, active, eager }: { src: string; active: boolean; eager: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`m-carousel__slide ${active ? 'is-active' : ''}`}>
      {failed ? (
        <div className="m-carousel__placeholder" />
      ) : (
        <img
          src={src}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          // @ts-expect-error fetchpriority is a valid DOM attribute
          fetchpriority={eager ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
