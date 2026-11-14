/**
 * Curso de Reparación de Electrodomésticos — entrega de los PDF (SOLO SERVIDOR:
 * no importar desde componentes React).
 *
 * Los PDF viven en /private/electrodomesticos (fuera de /public) y solo se sirven
 * desde /api/electrodomesticos/descarga, que comprueba el pago con Dodo.
 * Cada archivo pertenece a un producto de Dodo (`bucket`):
 *   main → DODO_PRODUCT_MAIN · bump → DODO_PRODUCT_BUMP · upsell → DODO_PRODUCT_UPSELL
 */
import { DODO_PRODUCT_BUMP, DODO_PRODUCT_MAIN, DODO_PRODUCT_UPSELL } from './electrodomesticos';

export type Bucket = 'main' | 'bump' | 'upsell';

export interface DeliveryFile {
  /** Identificador corto que viaja en la URL de descarga. */
  key: string;
  /** Nombre exacto del archivo en /private/electrodomesticos. */
  file: string;
  /** Texto del botón de descarga. */
  label: string;
  bucket: Bucket;
}

export const PRODUCT_BY_BUCKET: Record<Bucket, string> = {
  main: DODO_PRODUCT_MAIN,
  bump: DODO_PRODUCT_BUMP,
  upsell: DODO_PRODUCT_UPSELL,
};

// El orden de esta lista es el orden de los botones en /gracias.
export const deliveryFiles: DeliveryFile[] = [
  { key: 'curso', bucket: 'main', file: 'Curso-de-Reparacion-de-Electrodomesticos.pdf', label: 'Curso de Reparación de Electrodomésticos' },
  { key: 'bonus-1', bucket: 'main', file: 'Bonus-1-Guia-rapida-que-le-pasa-a-tu-aparato.pdf', label: 'Bonus 1 · Guía rápida: qué le pasa a tu aparato' },
  { key: 'bonus-2', bucket: 'main', file: 'Bonus-2-Las-10-averias-que-se-arreglan-en-menos-de-10-minutos.pdf', label: 'Bonus 2 · Las 10 averías que se arreglan en menos de 10 minutos' },
  { key: 'bonus-3', bucket: 'main', file: 'Bonus-3-Cuando-arreglar-y-cuando-comprar-uno-nuevo.pdf', label: 'Bonus 3 · Cuándo arreglar y cuándo comprar uno nuevo' },
  { key: 'bonus-4', bucket: 'main', file: 'Bonus-4-Herramientas-que-necesitas-por-menos-de-50-euros.pdf', label: 'Bonus 4 · Herramientas que necesitas por menos de 50 €' },
  { key: 'bonus-5', bucket: 'main', file: 'Bonus-5-Seguridad-que-revisar-antes-de-abrir-cualquier-aparato.pdf', label: 'Bonus 5 · Seguridad: qué revisar antes de abrir cualquier aparato' },
  { key: 'repuestos', bucket: 'bump', file: 'Guia-de-repuestos-donde-comprar-cada-pieza-mas-barata-en-Espana.pdf', label: 'Guía de repuestos: dónde comprar cada pieza más barata en España' },
  { key: 'como-nuevos', bucket: 'upsell', file: 'Electrodomesticos-como-nuevos.pdf', label: 'Electrodomésticos como nuevos' },
];

// ── Email de acceso (opcional) ─────────────────────────────────────────────
// El webhook de Dodo solo envía email si aquí hay enlaces. Vacío = no se envía
// nada: la entrega se hace en la página /gracias.
export interface AccessLink {
  label: string;
  url: string;
}

export const delivery: Record<Bucket, AccessLink[]> = {
  main: [],
  bump: [],
  upsell: [],
};

export const emailTexts = {
  subject: 'Tu acceso al Curso de Reparación de Electrodomésticos',
  heading: '¡Ya tienes tu acceso!',
  intro: 'Gracias por tu compra. Aquí tienes todo lo que has adquirido:',
  note: 'Guarda este email para volver a entrar cuando quieras. Si tienes cualquier problema, responde a este mensaje.',
};
