import { createHmac, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import type { MenoLocale, ProductBucket } from '../../config/menopausia/products';

function env(name: string): string {
  const meta = import.meta.env as Record<string, string | undefined>;
  return meta[name] ?? process.env[name] ?? '';
}

export interface DownloadPayload {
  pid: string; // payment_id
  file: string; // exact filename
  bucket: ProductBucket;
  locale: MenoLocale;
  exp: number; // unix seconds
}

const SEVEN_DAYS = 7 * 24 * 60 * 60;

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function sign(data: string, secret: string): string {
  return b64url(createHmac('sha256', secret).update(data).digest());
}

/** Build a signed, 7-day download token. Returns '' if no secret configured. */
export function signDownloadToken(p: Omit<DownloadPayload, 'exp'>, ttl = SEVEN_DAYS): string {
  const secret = env('DOWNLOAD_SECRET');
  if (!secret) return '';
  const payload: DownloadPayload = { ...p, exp: Math.floor(Date.now() / 1000) + ttl };
  const data = b64url(Buffer.from(JSON.stringify(payload)));
  return `${data}.${sign(data, secret)}`;
}

/** Verify a token: HMAC + expiry. Returns the payload or null. */
export function verifyDownloadToken(token: string): DownloadPayload | null {
  const secret = env('DOWNLOAD_SECRET');
  if (!secret || !token || !token.includes('.')) return null;
  const [data, sig] = token.split('.');
  const expected = sign(data, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()) as DownloadPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Absolute path to a delivered file (outside /public). */
export function filePath(locale: MenoLocale, file: string): string {
  // path.basename strips any traversal (../) — only a bare filename is allowed.
  return path.join(process.cwd(), 'private', 'menopausia', locale, path.basename(file));
}

/** Build the relative download URL for a file. */
export function downloadUrl(p: Omit<DownloadPayload, 'exp'>): string {
  const token = signDownloadToken(p);
  return `/api/menopausia/descarga?token=${encodeURIComponent(token)}`;
}
