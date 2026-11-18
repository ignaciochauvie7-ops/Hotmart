/**
 * Versión FRANCESA (/electrodomesticos/fr) — entrega de los PDF (SOLO SERVIDOR:
 * no importar desde componentes React).
 *
 * Los PDF viven en /private/electrodomesticos/fr (fuera de /public) y solo se sirven
 * desde /api/electrodomesticos/fr/descarga, que comprueba el pago con Dodo.
 * Cada archivo pertenece a un producto de Dodo (`bucket`):
 *   main → DODO_PRODUCT_MAIN · bump → DODO_PRODUCT_BUMP · upsell → DODO_PRODUCT_UPSELL
 */
import { DODO_PRODUCT_BUMP, DODO_PRODUCT_MAIN, DODO_PRODUCT_UPSELL } from './electrodomesticos-fr';

export type Bucket = 'main' | 'bump' | 'upsell';

export interface DeliveryFile {
  /** Identificador corto que viaja en la URL de descarga. */
  key: string;
  /** Nombre exacto del archivo en /private/electrodomesticos/fr. */
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
  { key: 'curso', bucket: 'main', file: 'Cours-de-Reparation-d-Electromenager.pdf', label: 'Télécharger le cours' },
  { key: 'bonus-1', bucket: 'main', file: 'Bonus-1-Guide-rapide-ce-qui-ne-va-pas-avec-ton-appareil.pdf', label: 'Télécharger le Bonus 1' },
  { key: 'bonus-2', bucket: 'main', file: 'Bonus-2-Les-10-pannes-qui-se-reparent-en-moins-de-10-minutes.pdf', label: 'Télécharger le Bonus 2' },
  { key: 'bonus-3', bucket: 'main', file: 'Bonus-3-Quand-reparer-et-quand-en-acheter-un-neuf.pdf', label: 'Télécharger le Bonus 3' },
  { key: 'bonus-4', bucket: 'main', file: 'Bonus-4-Les-outils-qu-il-te-faut-pour-moins-de-50-euros.pdf', label: 'Télécharger le Bonus 4' },
  { key: 'bonus-5', bucket: 'main', file: 'Bonus-5-Securite-quoi-verifier-avant-d-ouvrir-n-importe-quel-appareil.pdf', label: 'Télécharger le Bonus 5' },
  { key: 'repuestos', bucket: 'bump', file: 'Guide-des-pieces-ou-acheter-chaque-piece-moins-cher-en-France.pdf', label: 'Télécharger le Guide des pièces' },
  { key: 'como-nuevos', bucket: 'upsell', file: 'Electromenager-comme-neuf.pdf', label: 'Télécharger Électroménager comme neuf' },
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
  subject: 'Ton accès au Cours de Réparation d’Électroménager',
  heading: 'Voici ton accès !',
  intro: 'Merci pour ton achat. Voici tout ce que contient ta commande :',
  note: 'Garde cet e-mail pour retrouver le contenu quand tu veux. En cas de problème, réponds simplement à ce message.',
};
