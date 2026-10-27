import { memo, useEffect, useState, type CSSProperties } from 'react';

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
// memo: the loader screens drive a ~60fps progress tween that re-renders their
// whole subtree every frame. `images` is a module constant, so memo keeps the
// marquee from reconciling on each of those frames — that main-thread churn was
// what made the scroll stutter.
export const Carousel = memo(function Carousel({ images, speed = 26 }: Props) {
  if (images.length === 0) return null;
  // Two copies back-to-back; the keyframe moves the track by -50% (one copy).
  const loop = [...images, ...images];
  // Duration is a CSS var so a media query can halve it on mobile (photos pass
  // ~2× faster on a phone, where the strip is narrower and felt too slow).
  return (
    <div className="m-marquee" aria-hidden="true">
      <div className="m-marquee__track" style={{ '--m-marquee-speed': `${speed}s` } as CSSProperties}>
        {loop.map((src, i) => (
          <Slide key={i} src={src} />
        ))}
      </div>
    </div>
  );
});

// Both copies load eager: they share URLs with the first copy (already cached),
// and lazy-loading the second copy made photos pop in mid-scroll → visible jank.
function Slide({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="m-marquee__item">
      {failed ? (
        <div className="m-marquee__placeholder" />
      ) : (
        <img
          src={src}
          alt=""
          loading="eager"
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
