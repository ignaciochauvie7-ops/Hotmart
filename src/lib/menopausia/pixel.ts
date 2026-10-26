// Thin wrapper over Meta Pixel (window.fbq). Every call is a no-op when the
// pixel is not loaded (missing env var), so the funnel never breaks.

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[] };

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

function fbq(): Fbq | null {
  if (typeof window === 'undefined') return null;
  return window.fbq ?? null;
}

/** Standard Meta events: PageView, ViewContent, Lead, InitiateCheckout, Purchase. */
export function track(event: string, params?: Record<string, unknown>, eventID?: string): void {
  const f = fbq();
  if (!f) return;
  if (eventID) f('track', event, params ?? {}, { eventID });
  else f('track', event, params ?? {});
}

/** Custom events, e.g. QuizStep. */
export function trackCustom(event: string, params?: Record<string, unknown>): void {
  const f = fbq();
  if (!f) return;
  f('trackCustom', event, params ?? {});
}

/** Read a cookie value (used for _fbp / _fbc dedup with the Conversions API). */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}
