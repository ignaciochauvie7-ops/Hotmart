import { useEffect, useRef, useState } from 'react';
import { IMG_PATH } from '../../config/electrodomesticos';

interface Props {
  /** Nombre del archivo dentro de /public/electrodomesticos/. */
  file: string;
  w: number;
  h: number;
  alt: string;
  /** Archivos existentes (build/servidor). null = desconocido → se intenta cargar. */
  available: string[] | null;
  className?: string;
  eager?: boolean;
  /** Texto corto del placeholder (por defecto: archivo · medida). */
  label?: string;
  /** Si el archivo no existe no se pinta nada (sin placeholder). */
  optional?: boolean;
  /** Imagen principal (LCP): se pide con prioridad alta. Implica eager. */
  priority?: boolean;
  /** Variante AVIF en opt/ (mismo tamaño); solo se usa si existe. */
  avif?: boolean;
  /** Ancho CSS al que se pinta, p. ej. "40px": activa la miniatura opt/…-160.webp si existe. */
  thumbSizes?: string;
}

/**
 * Imagen con placeholder automático: caja gris de borde punteado con el nombre
 * del archivo y la medida recomendada. En cuanto el archivo existe en
 * /public/electrodomesticos/ se muestra la imagen real.
 */
export function Img({ file, w, h, alt, available, className = '', eager = false, label, optional = false, priority = false, avif = false, thumbSizes }: Props) {
  const known = available ? available.includes(file) : null;
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Un error de carga anterior a la hidratación no dispara onError.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (optional && (known === false || failed)) return null;

  if (known === false || failed) {
    return (
      <span
        className={`rp-ph m-placeholder ${className}`}
        style={{ aspectRatio: `${w} / ${h}` }}
        role="img"
        aria-label={alt}
        title={`${file} · ${w}x${h}`}
      >
        <span>{label ?? `${file} · ${w}x${h}`}</span>
      </span>
    );
  }

  const base = file.replace(/\.webp$/, '');
  const avifFile = `opt/${base}.avif`;
  const thumbFile = `opt/${base}-160.webp`;
  const hasAvif = avif && !!available?.includes(avifFile);
  const hasThumb = !!thumbSizes && !!available?.includes(thumbFile);

  const img = (
    <img
      ref={ref}
      className={`rp-img ${className}`}
      src={`${IMG_PATH}/${file}`}
      srcSet={hasThumb ? `${IMG_PATH}/${thumbFile} 160w, ${IMG_PATH}/${file} ${w}w` : undefined}
      sizes={hasThumb ? thumbSizes : undefined}
      width={w}
      height={h}
      alt={alt}
      loading={eager || priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );

  if (!hasAvif) return img;

  // display: contents → el <picture> no genera caja: el layout es el del <img>.
  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={`${IMG_PATH}/${avifFile}`} />
      {img}
    </picture>
  );
}
