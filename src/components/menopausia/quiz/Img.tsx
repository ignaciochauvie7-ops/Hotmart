import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  label?: string; // shown inside the placeholder when the image is missing
}

/** Image that falls back to a soft placeholder if the file 404s. */
export function Img({ src, alt, className, label }: Props) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The <img> is server-rendered, so a 404 can fire its error before React
  // hydrates and attaches onError. Catch that case on mount.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    // Plain placeholder — no broken-image icon, no visible alt text (label only if given).
    return (
      <div className={`m-placeholder ${className ?? ''}`.trim()} role="img" aria-label={alt}>
        {label && <span>{label}</span>}
      </div>
    );
  }
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
