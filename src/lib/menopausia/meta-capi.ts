import { createHash } from 'node:crypto';

function env(name: string): string {
  const meta = import.meta.env as Record<string, string | undefined>;
  return meta[name] ?? process.env[name] ?? '';
}

function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export interface PurchaseEvent {
  eventId: string; // = payment_id, for dedup with the browser Pixel
  value: number;
  currency: string;
  email?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  eventSourceUrl?: string;
}

/**
 * Send a server-side Purchase to the Meta Conversions API.
 * No-ops (returns false) when the pixel ID or CAPI token is missing, so the
 * funnel keeps working untracked.
 */
export async function sendPurchaseCapi(ev: PurchaseEvent): Promise<boolean> {
  const pixelId = env('NEXT_PUBLIC_META_PIXEL_ID_MENOPAUSIA');
  const token = env('META_CAPI_TOKEN_MENOPAUSIA');
  if (!pixelId || !token) return false;

  const userData: Record<string, unknown> = {};
  if (ev.email) userData.em = [sha256(ev.email)];
  if (ev.clientIp) userData.client_ip_address = ev.clientIp;
  if (ev.userAgent) userData.client_user_agent = ev.userAgent;
  if (ev.fbp) userData.fbp = ev.fbp;
  if (ev.fbc) userData.fbc = ev.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: ev.eventId,
        action_source: 'website',
        event_source_url: ev.eventSourceUrl,
        user_data: userData,
        custom_data: { currency: ev.currency, value: ev.value },
      },
    ],
  };

  const testCode = env('META_CAPI_TEST_EVENT_CODE');
  if (testCode) body.test_event_code = testCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}
