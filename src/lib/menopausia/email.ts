import { getDict, type MenoLocale } from '../../config/menopausia/i18n';
import type { DownloadLink } from './order';

function env(name: string): string {
  const meta = import.meta.env as Record<string, string | undefined>;
  return meta[name] ?? process.env[name] ?? '';
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Absolute links (download urls are relative). */
export interface AbsLink {
  file: string;
  url: string;
}

export function absolutize(base: string, links: DownloadLink[]): AbsLink[] {
  const root = base.replace(/\/$/, '');
  return links.map((l) => ({ file: l.file, url: `${root}${l.url}` }));
}

/**
 * Send the download email via Resend. Returns false (no-op) when RESEND_API_KEY
 * or EMAIL_FROM is missing, or there is no recipient — the funnel never breaks.
 */
export async function sendDownloadEmail(locale: MenoLocale, to: string | undefined, links: AbsLink[]): Promise<boolean> {
  const apiKey = env('RESEND_API_KEY');
  const from = env('EMAIL_FROM');
  if (!apiKey || !from || !to || links.length === 0) return false;

  const e = getDict(locale).email;
  const items = links
    .map((l) => `<li style="margin:8px 0"><a href="${esc(l.url)}" style="color:#c27a5c;font-weight:600">${esc(l.file.replace(/\.pdf$/i, ''))}</a></li>`)
    .join('');

  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#3d3a35;background:#f7f2ea;padding:24px">
    <div style="max-width:520px;margin:auto;background:#fffdf9;border-radius:16px;padding:28px">
      <h1 style="font-size:22px;margin:0 0 12px">${esc(e.heading)}</h1>
      <p style="margin:0 0 16px">${esc(e.intro)}</p>
      <ul style="padding-left:18px;margin:0 0 16px">${items}</ul>
      <p style="color:#76706a;font-size:13px;margin:0">${esc(e.expiryNote)}</p>
    </div></body></html>`;

  const text = `${e.heading}\n\n${e.intro}\n\n${links.map((l) => `• ${l.file.replace(/\.pdf$/i, '')}: ${l.url}`).join('\n')}\n\n${e.expiryNote}`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject: e.subject, html, text }),
    });
    if (!res.ok) console.error('[menopausia] resend error', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('[menopausia] resend exception', err);
    return false;
  }
}
