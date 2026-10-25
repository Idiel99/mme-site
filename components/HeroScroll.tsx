"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";
import { HERO_CHAPTERS, PHOTOS, phoneFor } from "@/lib/site";

// 0 → 1 as the (tall) section scrolls past the viewport; drives the sticky stage.
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -el.getBoundingClientRect().top;
      // total can be 0 mid-layout; 0/0 is NaN, which the clamp passes through and breaks the stage lookup.
      setP(total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    calc();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

const N = HERO_CHAPTERS.length + 2; // intro + chapters + final

// What each stage says; the desktop and phone layouts style it differently.
type Stage = {
  key: string;
  isIntro: boolean;
  tag?: string; // chapter number shown in the eyebrow (otherwise a dot)
  eyebrow: string;
  line1: string;
  line2?: string; // gradient second line
  body: string;
  cta: boolean;
};

function useStages(): Stage[] {
  const t = useTranslations("hero");
  return [
    { key: "intro", isIntro: true, eyebrow: t("eyebrow"), line1: t("title1"), line2: t("title2"), body: t("sub"), cta: true },
    ...HERO_CHAPTERS.map((c) => ({
      key: c.key,
      isIntro: false,
      tag: c.tag,
      eyebrow: t(`chapters.${c.key}.accent`),
      line1: t(`chapters.${c.key}.title`),
      line2: t(`chapters.${c.key}.accent`),
      body: t(`chapters.${c.key}.body`),
      cta: false,
    })),
    { key: "final", isIntro: false, eyebrow: t("badge"), line1: t("finalTitle"), body: t("finalBody"), cta: true },
  ];
}

const SHADE = "linear-gradient(90deg,rgba(8,17,30,.86) 0%,rgba(8,17,30,.5) 42%,rgba(8,17,30,.12) 70%,rgba(8,17,30,.35) 100%)";
const SHADE_BEFORE = "linear-gradient(90deg,rgba(8,17,30,.86) 0%,rgba(8,17,30,.55) 42%,rgba(8,17,30,.2) 100%)";
const WEATHER = "linear-gradient(180deg,rgba(40,34,22,.28),rgba(10,12,16,.45)), radial-gradient(120% 80% at 30% 20%, transparent, rgba(0,0,0,.35))";
const BEFORE_FILTER = "grayscale(.8) brightness(.72) contrast(.92) sepia(.14)";
const outfit = { fontFamily: "var(--font-outfit), sans-serif" };

function Dot() {
  return <span className="h-[7px] w-[7px] rounded-full bg-glow shadow-[0_0_8px_var(--color-glow)]" />;
}

function Eyebrow({ s, className }: { s: Stage; className: string }) {
  return (
    <div className={`inline-flex items-center gap-[9px] rounded-full border border-glow/30 bg-brand/20 font-semibold tracking-[.5px] text-glow-soft backdrop-blur-[6px] ${className}`}>
      {s.tag ? (
        <span className="font-extrabold tracking-[1px] text-glow" style={outfit}>
          {s.tag}
        </span>
      ) : (
        <Dot />
      )}
      {s.eyebrow}
    </div>
  );
}

function Heading({ s, className, style }: { s: Stage; className: string; style?: React.CSSProperties }) {
  const Tag = s.isIntro ? "h1" : "h2";
  return (
    <Tag className={className} style={style}>
      {s.line1}
      {s.line2 && (
        <>
          <br />
          <span className="text-gradient">{s.line2}</span>
        </>
      )}
    </Tag>
  );
}

function CtaRow({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("nav");
  const phone = phoneFor(useLocale());
  return (
    <div className={`flex flex-wrap ${compact ? "gap-[10px]" : "mb-7 gap-[14px]"}`}>
      <a href="#contact" className={`btn-primary ${compact ? "!px-5 !py-[13px] !text-sm" : ""}`}>
        {t("quote")} <Icon name="arrow" className="h-4 w-4" />
      </a>
      <a href={`tel:${phone.tel}`} className={`btn-ghost ${compact ? "!px-4 !py-[13px] !text-sm" : ""}`}>
        <Icon name="phone" className="h-[17px] w-[17px]" />
        {phone.display}
      </a>
    </div>
  );
}

function ScrollArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5 v14 M6 13 l6 6 6-6" />
    </svg>
  );
}

// ── Desktop (≥768px): full-bleed photo, left-to-right wipe, copy on the left ──
function DesktopStage({ s, stage, seam }: { s: Stage; stage: number; seam: number }) {
  const t = useTranslations("hero");
  const tw = useTranslations("work");
  const clip = `inset(0 ${100 - seam}% 0 0)`;
  const headingShadow = { textShadow: "0 6px 40px rgba(0,0,0,.4)" };
  const pill = "absolute top-24 z-[5] items-center gap-2 rounded-full px-3 py-[6px] text-[11px] font-bold uppercase tracking-[1.5px] backdrop-blur-[6px]";

  return (
    <div className="absolute inset-0 hidden min-[768px]:block">
      {/* AFTER layer — vibrant, restored */}
      <div className="absolute inset-0">
        <Image src={PHOTOS.heroHome} alt="" fill priority sizes="100vw" className="animate-ken object-cover" />
        <div className="absolute inset-0" style={{ background: SHADE }} />
      </div>

      {/* BEFORE layer — dull, weathered; clipped away as you scroll */}
      <div className="absolute inset-0" style={{ clipPath: clip, WebkitClipPath: clip }}>
        <Image src={PHOTOS.heroHome} alt="" fill priority sizes="100vw" className="object-cover" style={{ filter: BEFORE_FILTER }} />
        <div className="absolute inset-0" style={{ background: WEATHER }} />
        <div className="absolute inset-0" style={{ background: SHADE_BEFORE }} />
      </div>

      {/* Seam */}
      {seam > 1 && seam < 99 && (
        <div
          className="absolute inset-y-0 z-[4] w-0.5 bg-[linear-gradient(180deg,transparent,rgba(95,180,247,.9),transparent)] shadow-[0_0_24px_3px_rgba(95,180,247,.55)]"
          style={{ left: `${seam}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-glow/60 bg-glow/20 backdrop-blur-[4px]">
            <Icon name="arrow" className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      {/* Before / after pills */}
      <div className={`${pill} left-8 border border-silver/25 bg-[rgba(10,18,30,.5)] text-silver ${seam > 6 ? "flex" : "hidden"}`} style={outfit}>
        {tw("beforeLabel")}
      </div>
      <div className={`${pill} right-16 border border-glow/45 bg-brand/20 text-glow ${seam < 94 ? "flex" : "hidden"}`} style={outfit}>
        {tw("afterLabel")}
      </div>

      {/* Copy */}
      <div className="absolute inset-0 z-[6] flex items-center px-[clamp(24px,6vw,96px)]">
        <div key={s.key} className="max-w-[640px] animate-copy">
          <Eyebrow s={s} className="mb-[22px] px-[14px] py-[7px] text-[13px]" />
          <Heading
            s={s}
            style={headingShadow}
            className={
              s.isIntro
                ? "mb-[22px] text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-2px] text-white text-balance"
                : "mb-5 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1.04] tracking-[-1.5px] text-white text-balance"
            }
          />
          <p className="mb-[30px] max-w-[520px] text-[clamp(1rem,1.6vw,1.22rem)] leading-[1.6] text-white/80" style={{ textShadow: "0 2px 12px rgba(0,0,0,.5)" }}>
            {s.body}
          </p>
          {s.cta && <CtaRow />}
          {s.isIntro && <TrustChips />}
        </div>
      </div>

      {/* Progress rail */}
      <div className="absolute top-1/2 right-[30px] z-[6] flex -translate-y-1/2 flex-col items-end gap-2" aria-hidden="true">
        {Array.from({ length: N }).map((_, i) => (
          <div
            key={i}
            className={`h-[3px] rounded-[3px] transition-all duration-300 ${i <= stage ? "bg-glow" : "bg-silver/30"} ${
              i === stage ? "w-[26px] shadow-[0_0_10px_rgba(95,180,247,.8)]" : "w-4"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className={`absolute bottom-[26px] left-1/2 z-[6] -translate-x-1/2 text-xs font-medium text-white/60 ${stage === 0 ? "block" : "hidden"}`}>
        <div className="flex animate-float flex-col items-center gap-[7px]">
          <span>{t("scrollHint")}</span>
          <ScrollArrow />
        </div>
      </div>
    </div>
  );
}

function TrustChips() {
  const t = useTranslations("hero");
  return (
    <div className="flex flex-wrap gap-[10px]">
      {[t("badge"), t("trust.years"), t("trust.bilingual")].map((b) => (
        <span
          key={b}
          className="inline-flex items-center gap-[7px] rounded-full border border-white/15 bg-white/10 px-[13px] py-2 text-[13px] font-semibold text-white/85 backdrop-blur-[6px]"
        >
          <Icon name="shield" className="h-[14px] w-[14px] text-glow" />
          {b}
        </span>
      ))}
    </div>
  );
}

// ── Phone (<768px): photo card on top with a top-to-bottom reveal, copy below, progress dots ──
function PhoneStage({ stages, stage, wipe }: { stages: Stage[]; stage: number; wipe: number }) {
  const t = useTranslations("hero");
  const tw = useTranslations("work");
  const edge = wipe * 100; // how far down the "after" photo has rolled
  const clip = `inset(${edge}% 0 0 0)`;
  const pill = "absolute z-[3] rounded-full px-[10px] py-[5px] text-[10px] font-bold uppercase tracking-[1.5px] backdrop-blur-[6px]";

  return (
    <div className="absolute inset-0 flex flex-col px-4 pt-[82px] pb-[max(16px,env(safe-area-inset-bottom))] min-[768px]:hidden">
      {/* Photo card — takes the space the copy leaves, so short phones shrink the photo, not the text */}
      <div className="relative max-h-[44svh] min-h-[150px] flex-1 overflow-hidden rounded-[20px] border border-silver/20 shadow-[0_24px_50px_-24px_rgba(0,0,0,.8)]">
        {/* AFTER — revealed from the top down */}
        <Image src={PHOTOS.heroHome} alt="" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
        {/* BEFORE — what's left below the edge */}
        <div className="absolute inset-0" style={{ clipPath: clip, WebkitClipPath: clip }}>
          <Image src={PHOTOS.heroHome} alt="" fill priority sizes="100vw" className="object-cover object-[62%_center]" style={{ filter: BEFORE_FILTER }} />
          <div className="absolute inset-0" style={{ background: WEATHER }} />
        </div>
        {/* Edge line */}
        {edge > 1 && edge < 99 && (
          <div
            className="absolute inset-x-0 z-[2] h-0.5 -translate-y-px bg-[linear-gradient(90deg,transparent,rgba(95,180,247,.95),transparent)] shadow-[0_0_18px_2px_rgba(95,180,247,.6)]"
            style={{ top: `${edge}%` }}
          />
        )}
        <span className={`${pill} top-3 right-3 border border-glow/45 bg-brand/30 text-glow ${edge > 8 ? "" : "hidden"}`} style={outfit}>
          {tw("afterLabel")}
        </span>
        <span className={`${pill} bottom-3 left-3 border border-silver/25 bg-[rgba(10,18,30,.55)] text-silver ${edge < 92 ? "" : "hidden"}`} style={outfit}>
          {tw("beforeLabel")}
        </span>
      </div>

      {/* Copy — every stage shares one grid cell, so the cell is as tall as the longest stage
          and the photo above keeps a constant size. Only the active stage is visible. */}
      <div className="grid shrink-0 pt-5">
        {stages.map((s, i) => (
          <div
            key={s.key}
            aria-hidden={i !== stage}
            // Outgoing text fades out fast; incoming waits for it, so two stages never overlap visibly.
            className={`col-start-1 row-start-1 flex flex-col transition-[opacity,translate,visibility] ease-out ${
              i === stage
                ? "visible translate-y-0 opacity-100 duration-500 delay-150"
                : "invisible translate-y-2.5 opacity-0 duration-150"
            }`}
          >
            <Eyebrow s={s} className="mb-3 self-start px-3 py-[6px] text-[12px]" />
            <Heading
              s={s}
              className={`mb-3 font-extrabold leading-[1.05] tracking-[-1px] text-white text-balance ${
                s.isIntro ? "text-[clamp(1.6rem,min(8.4vw,5svh),2.4rem)]" : "text-[clamp(1.5rem,min(7.6vw,4.6svh),2.2rem)]"
              }`}
            />
            <p className="mb-4 text-[clamp(14px,2.3svh,15px)] leading-[1.55] text-white/75">{s.body}</p>
            {s.cta && <CtaRow compact />}
          </div>
        ))}
      </div>

      {/* Progress dots (+ scroll hint on the first stage) */}
      <div className="mt-auto flex shrink-0 items-center justify-between gap-3 pt-3" aria-hidden="true">
        <span className={`flex min-w-0 items-center gap-1 text-[12px] font-medium text-white/55 transition-opacity duration-300 ${stage === 0 ? "opacity-100" : "opacity-0"}`}>
          <span className="shrink-0 animate-float">
            <ScrollArrow />
          </span>
          <span className="truncate">{t("scrollHint")}</span>
        </span>
        <div className="flex shrink-0 items-center gap-[6px]">
          {Array.from({ length: N }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i <= stage ? "bg-glow" : "bg-silver/30"} ${
                i === stage ? "w-5 shadow-[0_0_8px_rgba(95,180,247,.8)]" : "w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroScroll() {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref);

  const stage = Math.min(N - 1, Math.floor(p * N + 0.0001));
  // Eased wipe: the home stays "before" through the intro and is fully "after" by the final stage.
  const wipeRaw = Math.max(0, Math.min(1, (p - 0.04) / 0.9));
  const wipe = wipeRaw * wipeRaw * (3 - 2 * wipeRaw); // smoothstep
  const stages = useStages();

  // Phones get a shorter scroll (420svh ≈ 40% of a screen per stage); desktop keeps 100vh per stage.
  return (
    <section ref={ref} className="relative h-[420svh] bg-ink min-[768px]:h-[800vh]">
      <div className="sticky top-0 h-svh overflow-hidden min-[768px]:h-screen">
        <DesktopStage s={stages[stage]} stage={stage} seam={(1 - wipe) * 100} />
        <PhoneStage stages={stages} stage={stage} wipe={wipe} />
      </div>
    </section>
  );
}
