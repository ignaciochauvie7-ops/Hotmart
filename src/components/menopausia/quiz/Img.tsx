import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  label?: string; // shown inside the cream placeholder when the image is missing
}

/** Image that falls back to a cream placeholder if the file 404s. */
export function Img({ src, alt, className, label }: Props) {
  const [failed, setFailed] = useState(false);
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
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
