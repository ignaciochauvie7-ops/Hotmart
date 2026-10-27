import { useEffect, useState } from 'react';

interface Props {
  images: string[]; // optimized WebP urls for this group
  speed?: number; // seconds for one full loop (lower = faster)
}

/**
 * Horizontal photo marquee for the loading screens: photos sit side by side and
 * slide continuously to the left. The list is duplicated so the loop is seamless
 * (the track translates exactly one copy-width, landing back on an identical
 * frame). Constant motion → linear easing. Edges fade out with a mask so photos
 * don't pop in/out. Holds still (and becomes a manual scroll strip) under
 * prefers-reduced-motion. Any image that 404s falls back to a soft placeholder.
 */
export function Carousel({ images, speed = 26 }: Props) {
  if (images.length === 0) return null;
  // Two copies back-to-back; the keyframe moves the track by -50% (one copy).
  const loop = [...images, ...images];
  return (
    <div className="m-marquee" aria-hidden="true">
      <div className="m-marquee__track" style={{ animationDuration: `${speed}s` }}>
        {loop.map((src, i) => (
          <Slide key={i} src={src} eager={i < images.length} />
        ))}
      </div>
    </div>
  );
}

function Slide({ src, eager }: { src: string; eager: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="m-marquee__item">
      {failed ? (
        <div className="m-marquee__placeholder" />
      ) : (
        <img
          src={src}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

// Preload a group's images (used to warm the next loader's photos ahead of time).
export function usePreload(images: string[]) {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
}
