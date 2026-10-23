// Clean line icons from the MME design. Each fills its container (size it with a wrapper).
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ICONS = {
  roof: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <path d="M4 20 L20 7 L36 20" /><path d="M8 18 v15 h24 v-15" /><path d="M17 33 v-9 h6 v9" />
    </svg>
  ),
  stucco: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <rect x="6" y="6" width="28" height="28" rx="2" />
      <path d="M6 15 h28 M6 24 h28 M15 6 v9 M24 15 v9 M11 24 v10 M29 24 v10" />
    </svg>
  ),
  paint: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <rect x="6" y="9" width="20" height="9" rx="2" /><path d="M26 13 h6 v6 h-9" />
      <path d="M20 19 v5 a2 2 0 0 1-2 2 h-1 a2 2 0 0 0-2 2 v6" /><rect x="13" y="34" width="4" height="2.5" rx="1" />
    </svg>
  ),
  wash: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <path d="M9 30 v-4 a5 5 0 0 1 5-5 h3" /><path d="M17 21 v-3 h5 l9-6 v16 l-9-6 h-5" />
      <path d="M9 30 h10" /><path d="M24 33 l2-4 M28 34 l2-4 M20 34 l2-4" />
    </svg>
  ),
  driveway: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <path d="M6 34 L15 10 h10 l9 24" /><path d="M12 26 h16 M14 18 h12 M10 34 h20" />
    </svg>
  ),
  more: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <circle cx="20" cy="20" r="14" /><path d="M20 14 v12 M14 20 h12" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <path d="M20 5 l13 5 v9 c0 9-6 14-13 16 -7-2-13-7-13-16 v-9 z" /><path d="M14 20 l4 4 l8-9" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <circle cx="20" cy="16" r="10" /><path d="M14 25 l-2 11 8-5 8 5 -2-11" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <path d="M20 36 c8-9 12-15 12-21 a12 12 0 0 0-24 0 c0 6 4 12 12 21 z" /><circle cx="20" cy="15" r="4" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 40 40" width="100%" height="100%" {...stroke}>
      <circle cx="20" cy="20" r="14" /><path d="M20 12 v8 l5 3" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" {...stroke}>
      <path d="M5 4 h4 l2 5 -2.5 1.5 a11 11 0 0 0 5 5 L16 13 l5 2 v4 a2 2 0 0 1-2 2 A16 16 0 0 1 3 6 a2 2 0 0 1 2-2 z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7 l9 6 9-6" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" stroke="none">
      <path d="M12 2 l2.9 6.3 6.9.6 -5.2 4.6 1.6 6.8 -6.2-3.6 -6.2 3.6 1.6-6.8 -5.2-4.6 6.9-.6 z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" {...stroke}>
      <path d="M5 12 h14 M13 6 l6 6 -6 6" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
      <path d="M14 9 V7 c0-1 .5-1.5 1.5-1.5 H17 V2.5 h-2.5 C12 2.5 11 4 11 6.5 V9 H8.5 v3 H11 v9 h3 v-9 h2.5 l.5-3 z" />
    </svg>
  ),
};

export type IconName = keyof typeof ICONS;

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <span className={`block shrink-0 ${className}`} aria-hidden="true">
      {ICONS[name]}
    </span>
  );
}
