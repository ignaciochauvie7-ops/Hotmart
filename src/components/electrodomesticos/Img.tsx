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
}

/**
 * Imagen con placeholder automático: caja gris de borde punteado con el nombre
 * del archivo y la medida recomendada. En cuanto el archivo existe en
 * /public/electrodomesticos/ se muestra la imagen real.
 */
export function Img({ file, w, h, alt, available, className = '', eager = false }: Props) {
  const known = available ? available.includes(file) : null;
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Un error de carga anterior a la hidratación no dispara onError.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (known === false || failed) {
    return (
      <div className={`rp-ph ${className}`} style={{ aspectRatio: `${w} / ${h}` }} role="img" aria-label={alt}>
        <span>
          {file} · {w}x{h}
        </span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      className={`rp-img ${className}`}
      src={`${IMG_PATH}/${file}`}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
