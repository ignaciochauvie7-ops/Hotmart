import DodoPayments from 'dodopayments';
import type { MenoLocale } from '../../config/menopausia/products';

function env(name: string): string {
  const meta = import.meta.env as Record<string, string | undefined>;
  return meta[name] ?? process.env[name] ?? '';
}

export function getDodoEnvironment(): 'test_mode' | 'live_mode' {
  return env('DODO_PAYMENTS_ENVIRONMENT') === 'live_mode' ? 'live_mode' : 'test_mode';
}

/** Public site URL (no trailing slash) used to build Dodo return_url. */
export function siteUrl(reqUrl?: string): string {
  const configured = env('PUBLIC_SITE_URL');
  if (configured) return configured.replace(/\/$/, '');
  if (reqUrl) {
    const u = new URL(reqUrl);
    return `${u.protocol}//${u.host}`;
  }
  return 'http://localhost:4321';
}

/** Returns a Dodo client, or null when the API key is not configured. */
export function getDodoClient(): DodoPayments | null {
  const bearerToken = env('DODO_PAYMENTS_API_KEY');
  if (!bearerToken) return null;
  const webhookKey = env('DODO_PAYMENTS_WEBHOOK_KEY') || undefined;
  return new DodoPayments({ bearerToken, webhookKey, environment: getDodoEnvironment() });
}

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface CreateCheckoutArgs {
  productCart: CartItem[];
  returnUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
  locale?: MenoLocale;
}

/** Create a checkout session. Returns { checkout_url, session_id }. */
export async function createCheckout(client: DodoPayments, args: CreateCheckoutArgs) {
  const payload: Record<string, unknown> = {
    product_cart: args.productCart,
    billing_currency: 'EUR',
    return_url: args.returnUrl,
  };
  if (args.customerEmail) payload.customer = { email: args.customerEmail };
  if (args.metadata) payload.metadata = args.metadata;
  // Pass the UI language to Dodo (ignored by the API if unsupported).
  if (args.locale) payload.metadata = { ...(args.metadata ?? {}), locale: args.locale };
  return (client as any).checkoutSessions.create(payload) as Promise<{
    checkout_url?: string;
    session_id?: string;
  }>;
}

/** Retrieve a payment to verify it server-side. Returns null on failure. */
export async function retrievePayment(client: DodoPayments, paymentId: string): Promise<any> {
  try {
    return await (client as any).payments.retrieve(paymentId);
  } catch {
    return null;
  }
}

/** True if the payment object represents a completed payment. */
export function paymentIsPaid(payment: any): boolean {
  const st = String(payment?.status ?? '').toLowerCase();
  return st === 'succeeded' || st === 'paid' || st === 'active';
}

/** Best-effort extraction of purchased product IDs across possible SDK shapes. */
export function paymentProductIds(payment: any): string[] {
  const cart = payment?.product_cart ?? payment?.products ?? payment?.line_items ?? [];
  if (!Array.isArray(cart)) return [];
  return cart
    .map((it: any) => it?.product_id ?? it?.product?.product_id ?? it?.id)
    .filter((x: any): x is string => typeof x === 'string');
}
