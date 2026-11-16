/**
 * Versión PORTUGUESA (/electrodomesticos/pt) — entrega de los PDF (SOLO SERVIDOR:
 * no importar desde componentes React).
 *
 * Los PDF viven en /private/electrodomesticos/pt (fuera de /public) y solo se sirven
 * desde /api/electrodomesticos/pt/descarga, que comprueba el pago con Dodo.
 * PENDIENTE: subir los PDF traducidos a /private/electrodomesticos/pt con estos nombres.
 * Cada archivo pertenece a un producto de Dodo (`bucket`):
 *   main → DODO_PRODUCT_MAIN · bump → DODO_PRODUCT_BUMP · upsell → DODO_PRODUCT_UPSELL
 */
import { DODO_PRODUCT_BUMP, DODO_PRODUCT_MAIN, DODO_PRODUCT_UPSELL } from './electrodomesticos-pt';

export type Bucket = 'main' | 'bump' | 'upsell';

export interface DeliveryFile {
  /** Identificador corto que viaja en la URL de descarga. */
  key: string;
  /** Nombre exacto del archivo en /private/electrodomesticos/pt. */
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
  { key: 'curso', bucket: 'main', file: 'Curso-de-Reparacao-de-Eletrodomesticos.pdf', label: 'Descarregar o curso' },
  { key: 'bonus-1', bucket: 'main', file: 'Bonus-1-Guia-rapido-o-que-tem-o-teu-aparelho.pdf', label: 'Descarregar o Bónus 1' },
  { key: 'bonus-2', bucket: 'main', file: 'Bonus-2-As-10-avarias-que-se-reparam-em-menos-de-10-minutos.pdf', label: 'Descarregar o Bónus 2' },
  { key: 'bonus-3', bucket: 'main', file: 'Bonus-3-Quando-reparar-e-quando-comprar-um-novo.pdf', label: 'Descarregar o Bónus 3' },
  { key: 'bonus-4', bucket: 'main', file: 'Bonus-4-As-ferramentas-de-que-precisas-por-menos-de-50-euros.pdf', label: 'Descarregar o Bónus 4' },
  { key: 'bonus-5', bucket: 'main', file: 'Bonus-5-Seguranca-o-que-verificar-antes-de-abrir-qualquer-aparelho.pdf', label: 'Descarregar o Bónus 5' },
  { key: 'repuestos', bucket: 'bump', file: 'Guia-de-pecas-onde-comprar-cada-peca-ao-preco-mais-baixo-em-Portugal.pdf', label: 'Descarregar o Guia de peças de substituição' },
  { key: 'como-nuevos', bucket: 'upsell', file: 'Eletrodomesticos-como-novos.pdf', label: 'Descarregar Eletrodomésticos como novos' },
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
  subject: 'O teu acesso ao Curso de Reparação de Eletrodomésticos',
  heading: 'Aqui está o teu acesso!',
  intro: 'Obrigado pela tua compra. Aqui tens tudo o que compraste:',
  note: 'Guarda este email para voltares a aceder quando quiseres. Se tiveres algum problema, responde a esta mensagem.',
};
