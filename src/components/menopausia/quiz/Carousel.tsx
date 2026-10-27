import { useEffect, useRef, useState } from 'react';

interface Props {
  images: string[]; // optimized WebP urls for this group
}

/**
 * One framed photo at a time, crossfading to the next every ~2.4s. The list
 * loops. Any image that 404s falls back to a soft placeholder so the frame is
 * never empty. Respects prefers-reduced-motion (holds the first photo).
 */
export function Carousel({ images }: Props) {
  const [active, setActive] = useState(0);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (images.length <= 1 || reduce.current) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="m-carousel" aria-hidden="true">
      {images.map((src, i) => (
        <div key={i} className={`m-carousel__item ${i === active ? 'is-active' : ''}`}>
          <Slide src={src} eager={i === 0} />
        </div>
      ))}
    </div>
  );
}

function Slide({ src, eager }: { src: string; eager: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="m-carousel__placeholder" />;
  return (
    <img
      src={src}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
