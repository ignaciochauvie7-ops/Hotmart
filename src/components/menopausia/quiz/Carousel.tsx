import { memo, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

interface Props {
  images: string[]; // optimized WebP urls for this group
  pxPerSecond?: number; // scroll speed; constant regardless of strip width
}

/**
 * Horizontal photo marquee for the loading screens: photos sit side by side and
 * slide continuously to the left at a CONSTANT speed (px/second), so one card
 * passes roughly every ~1.2s on a phone no matter how wide the images are. The
 * list is duplicated and the track translates by exactly one copy's width —
 * measured in JS (offsetLeft of the first item of the 2nd copy) — so the loop is
 * perfectly seamless (no jump, no pause). Duration = shift / speed. Holds still
 * (and becomes a manual scroll strip) under prefers-reduced-motion. Any image
 * that 404s falls back to a soft placeholder.
 */
// memo: the loader screens drive a ~60fps progress tween that re-renders their
// whole subtree every frame. `images` is a module constant, so memo keeps the
// marquee from reconciling on each of those frames — that main-thread churn was
// what made the scroll stutter.
export const Carousel = memo(function Carousel({ images, pxPerSecond = 150 }: Props) {
  if (images.length === 0) return null;
  // Two copies back-to-back; the track shifts left by exactly one copy width.
  const loop = [...images, ...images];
  const trackRef = useRef<HTMLDivElement>(null);
  // shift (px) and duration (s) measured from the DOM once images have a width.
  const [anim, setAnim] = useState<{ shift: number; dur: number } | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[images.length] as HTMLElement | undefined;
      if (!first || !second) return;
      // Distance from the start of copy 1 to the start of copy 2 = one copy width
      // including the inter-item gap. Translating by this lands on an identical frame.
      const shift = second.offsetLeft - first.offsetLeft;
      if (shift > 0) setAnim({ shift, dur: shift / pxPerSecond });
    };

    measure();
    // Re-measure once each image decodes (widths are 0 until then) and on resize.
    const imgs = Array.from(track.querySelectorAll('img'));
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, pxPerSecond]);

  // Only animate once measured, so the duration never changes mid-run (which
  // would visibly jump). Before that the strip is static.
  const style = anim
    ? ({
        '--m-marquee-shift': `${anim.shift}px`,
        animationDuration: `${anim.dur}s`,
        animationName: 'm-marquee-scroll',
      } as CSSProperties)
    : ({} as CSSProperties);

  return (
    <div className="m-marquee" aria-hidden="true">
      <div className="m-marquee__track" ref={trackRef} style={style}>
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
