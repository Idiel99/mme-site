// Roofline "M" monogram + wordmark. `id` keeps SVG gradient ids unique when rendered twice.
export default function Logo({ size = 38, id = "logo" }: { size?: number; id?: string }) {
  const blue = `${id}-blue`;
  const silver = `${id}-silver`;
  return (
    <span className="flex items-center gap-[11px]">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={blue} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5FB4F7" />
            <stop offset="1" stopColor="#0B47A6" />
          </linearGradient>
          <linearGradient id={silver} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EEF3F9" />
            <stop offset="1" stopColor="#8696A8" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="11" fill={`url(#${blue})`} />
        <rect x="2.6" y="2.6" width="42.8" height="42.8" rx="10.4" fill="none" stroke={`url(#${silver})`} strokeWidth="1.2" opacity=".6" />
        <path d="M11 33 L11 21 L24 12 L37 21 L37 33" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" fill="none" />
        <path d="M17 33 L17 24 L24 19 L31 24 L31 33" stroke={`url(#${silver})`} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      </svg>
      <span
        className="font-extrabold text-white leading-none tracking-[-0.5px]"
        style={{ fontFamily: "var(--font-outfit), sans-serif", fontSize: size * 0.5 }}
      >
        MME <span className="font-medium text-white/60">Group</span>
      </span>
    </span>
  );
}
