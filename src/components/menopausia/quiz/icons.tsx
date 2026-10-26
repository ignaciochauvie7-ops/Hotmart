// Small inline SVG icons. No icon library — keeps the bundle tiny.
interface IconProps {
  className?: string;
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// Fat-zone icons, aligned to quiz.fatZone.options order:
// 0 Abdomen · 1 Caderas y muslos · 2 Brazos · 3 Todo el cuerpo
export const zoneIcons = [
  // Abdomen
  (p: IconProps) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true">
      <circle cx="12" cy="7" r="3" />
      <path d="M8 21v-5a4 4 0 0 1 8 0v5" />
      <circle cx="12" cy="15" r="2.2" />
    </svg>
  ),
  // Caderas y muslos
  (p: IconProps) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true">
      <path d="M7 3v6c0 2 1 3 3 4l-1 8" />
      <path d="M17 3v6c0 2-1 3-3 4l1 8" />
      <path d="M7 9h10" />
    </svg>
  ),
  // Brazos
  (p: IconProps) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true">
      <path d="M6 4c0 4 1 7 3 9s3 5 3 7" />
      <path d="M18 4c0 4-1 7-3 9" />
      <circle cx="6" cy="4" r="1.4" />
      <circle cx="18" cy="4" r="1.4" />
    </svg>
  ),
  // Todo el cuerpo
  (p: IconProps) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true">
      <circle cx="12" cy="5" r="2.4" />
      <path d="M12 7.5v7" />
      <path d="M12 8.5 6.5 11M12 8.5 17.5 11" />
      <path d="M12 14.5 8.5 21M12 14.5 15.5 21" />
    </svg>
  ),
];
