"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Drag (mouse, touch, or pen) or use arrow keys to compare a weathered "before" with the "after" photo.
export default function BeforeAfterSlider({
  photo,
  label,
  tag,
  beforeLabel,
  afterLabel,
  sliderLabel,
}: {
  photo: string;
  label: string;
  tag: string;
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const moveTo = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  const clip = `inset(0 ${100 - pos}% 0 0)`;
  const pillCls = "absolute top-3 rounded-full px-[11px] py-[5px] text-[11px] font-bold uppercase tracking-[1px]";
  const outfit = { fontFamily: "var(--font-outfit), sans-serif" };

  return (
    <div>
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label={`${sliderLabel}: ${label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) moveTo(e.clientX);
        }}
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[18px] border border-hair shadow-[0_20px_50px_-28px_rgba(11,71,166,.45)] outline-none focus-visible:ring-2 focus-visible:ring-glow"
      >
        <Image src={photo} alt={afterLabel} fill sizes="(max-width: 700px) 100vw, 400px" className="object-cover" draggable={false} />
        <span className={`${pillCls} right-3 bg-brand/85 text-white`} style={outfit}>
          {afterLabel}
        </span>

        <div className="absolute inset-0" style={{ clipPath: clip, WebkitClipPath: clip }}>
          <Image
            src={photo}
            alt={beforeLabel}
            fill
            sizes="(max-width: 700px) 100vw, 400px"
            className="object-cover"
            draggable={false}
            style={{ filter: "grayscale(.85) brightness(.6) contrast(.95) sepia(.18)" }}
          />
          <div className="absolute inset-0 bg-[rgba(20,18,12,.25)]" />
          <span className={`${pillCls} left-3 bg-[rgba(228,234,242,.92)] text-ink`} style={outfit}>
            {beforeLabel}
          </span>
        </div>

        <div
          className="absolute inset-y-0 w-[3px] -translate-x-[1.5px] bg-white shadow-[0_0_18px_rgba(0,0,0,.4)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-[0_4px_16px_rgba(0,0,0,.35)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7 l-5 5 5 5 M15 7 l5 5 -5 5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="m-0 text-[1.1rem] font-bold text-white">{label}</h3>
        <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[.5px] text-brand">{tag}</span>
      </div>
    </div>
  );
}
