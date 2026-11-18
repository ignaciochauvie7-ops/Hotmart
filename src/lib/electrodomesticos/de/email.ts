import { emailTexts, type AccessLink } from '../../../config/electrodomesticos-de-entrega';

function env(name: string): string {
  const meta = import.meta.env as Record<string, string | undefined>;
  return meta[name] ?? process.env[name] ?? '';
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Envía el email de acceso con Resend (misma cuenta y remitente que menopausia).
 * No hace nada (false) si falta RESEND_API_KEY / EMAIL_FROM, el destinatario o
 * los enlaces.
 */
export async function sendAccessEmail(to: string | undefined, links: AccessLink[]): Promise<boolean> {
  const apiKey = env('RESEND_API_KEY');
  const from = env('EMAIL_FROM_ELECTRODOMESTICOS') || env('EMAIL_FROM');
  if (!apiKey || !from || !to || links.length === 0) return false;

  const e = emailTexts;
  const items = links
    .map(
      (l) =>
        `<li style="margin:10px 0"><a href="${esc(l.url)}" style="color:#c2410c;font-weight:700">${esc(l.label)}</a></li>`,
    )
    .join('');

  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#0b1f3a;background:#eef2f8;padding:24px">
    <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:16px;padding:28px">
      <h1 style="font-size:22px;margin:0 0 12px">${esc(e.heading)}</h1>
      <p style="margin:0 0 16px">${esc(e.intro)}</p>
      <ul style="padding-left:18px;margin:0 0 16px">${items}</ul>
      <p style="color:#5b6b82;font-size:13px;margin:0">${esc(e.note)}</p>
    </div></body></html>`;

  const text = `${e.heading}\n\n${e.intro}\n\n${links.map((l) => `• ${l.label}: ${l.url}`).join('\n')}\n\n${e.note}`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject: e.subject, html, text }),
    });
    if (!res.ok) console.error('[electrodomesticos] resend error', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('[electrodomesticos] resend exception', err);
    return false;
  }
}
