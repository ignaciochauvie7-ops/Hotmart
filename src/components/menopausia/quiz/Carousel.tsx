import { useState } from 'react';

interface Props {
  images: string[]; // optimized WebP urls for this group
}

/**
 * Photos slide continuously to the left (marquee). The list is duplicated so the
 * loop is seamless. The first image loads eagerly; the rest lazy. Any image that
 * 404s falls back to a soft placeholder so the motion is always visible.
 */
export function Carousel({ images }: Props) {
  if (images.length === 0) return null;
  const loop = [...images, ...images];
  return (
    <div className="m-carousel" aria-hidden="true">
      <div className="m-carousel__track" style={{ animationDuration: `${images.length * 2.6}s` }}>
        {loop.map((src, i) => (
          <Slide key={i} src={src} eager={i === 0} />
        ))}
      </div>
    </div>
  );
}

function Slide({ src, eager }: { src: string; eager: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="m-carousel__item">
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
