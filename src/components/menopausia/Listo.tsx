import { useEffect } from 'react';
import { getDict, type MenoLocale } from '../../config/menopausia/i18n';
import { track } from '../../lib/menopausia/pixel';
import { Check } from './quiz/icons';
import { Downloads } from './Gracias';

interface DownloadLink {
  file: string;
  url: string;
}

interface Props {
  locale: MenoLocale;
  upsellPaid: boolean;
  value: number;
  currency: string;
  eventId: string;
  downloads?: DownloadLink[];
}

export function Listo({ locale, upsellPaid, value, currency, eventId, downloads = [] }: Props) {
  const dict = getDict(locale);
  const l = dict.listo;

  // Fire Purchase for the upsell payment (its own event_id).
  useEffect(() => {
    if (upsellPaid && eventId) {
      track('Purchase', { value, currency, content_name: 'menopausia_upsell' }, eventId);
    }
  }, [upsellPaid, eventId, value, currency]);

  return (
    <div className="m-shell m-center" style={{ paddingTop: '3rem' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--sage)', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem' }}>
        <Check className="" />
      </div>
      <h1 className="m-q">{l.title}</h1>
      <p>{l.body}</p>
      {upsellPaid && <p className="m-muted" style={{ marginTop: '1rem' }}>{l.upsellThanks}</p>}
      {downloads.length > 0 && (
        <div style={{ marginTop: '1.75rem', textAlign: 'left' }}>
          <Downloads title={dict.downloads.title} note={dict.downloads.note} links={downloads} />
        </div>
      )}
    </div>
  );
}
