"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";
import { CONTACT, HERO_CHAPTERS, PHOTOS } from "@/lib/site";

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
      setP(Math.max(0, Math.min(1, scrolled / total)));
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

const SHADE = "linear-gradient(90deg,rgba(8,17,30,.86) 0%,rgba(8,17,30,.5) 42%,rgba(8,17,30,.12) 70%,rgba(8,17,30,.35) 100%)";
const SHADE_BEFORE = "linear-gradient(90deg,rgba(8,17,30,.86) 0%,rgba(8,17,30,.55) 42%,rgba(8,17,30,.2) 100%)";
const WEATHER = "linear-gradient(180deg,rgba(40,34,22,.28),rgba(10,12,16,.45)), radial-gradient(120% 80% at 30% 20%, transparent, rgba(0,0,0,.35))";

const eyebrowCls =
  "mb-[22px] inline-flex items-center gap-[9px] rounded-full border border-glow/30 bg-brand/20 px-[14px] py-[7px] text-[13px] font-semibold tracking-[.5px] text-glow-soft backdrop-blur-[6px]";
const headingShadow = { textShadow: "0 6px 40px rgba(0,0,0,.4)" };
const subCls = "mb-[30px] max-w-[520px] text-[clamp(1rem,1.6vw,1.22rem)] leading-[1.6] text-white/80";
const h2Cls = "mb-5 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1.04] tracking-[-1.5px] text-white text-balance";

function Dot() {
  return <span className="h-[7px] w-[7px] rounded-full bg-glow shadow-[0_0_8px_var(--color-glow)]" />;
}

function CtaRow() {
  const t = useTranslations("nav");
  return (
    <div className="mb-7 flex flex-wrap gap-[14px]">
      <a href="#contact" className="btn-primary">
        {t("quote")} <Icon name="arrow" className="h-4 w-4" />
      </a>
      <a href={`tel:${CONTACT.phone}`} className="btn-ghost">
        <Icon name="phone" className="h-[17px] w-[17px]" />
        {CONTACT.phone}
      </a>
    </div>
  );
}

export default function HeroScroll() {
  const t = useTranslations("hero");
  const tw = useTranslations("work");
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref);

  const N = HERO_CHAPTERS.length + 2; // intro + chapters + final
  const stage = Math.min(N - 1, Math.floor(p * N + 0.0001));
  // Eased wipe: the home stays "before" through the intro and is fully "after" by the final stage.
  const wipeRaw = Math.max(0, Math.min(1, (p - 0.04) / 0.9));
  const wipe = wipeRaw * wipeRaw * (3 - 2 * wipeRaw); // smoothstep
  const seam = (1 - wipe) * 100;
  const clip = `inset(0 ${100 - seam}% 0 0)`;

  let copy: React.ReactNode;
  if (stage === 0) {
    copy = (
      <div key="intro" className="max-w-[640px] animate-copy">
        <div className={eyebrowCls}>
          <Dot />
          {t("eyebrow")}
        </div>
        <h1
          className="mb-[22px] text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-2px] text-white text-balance"
          style={headingShadow}
        >
          {t("title1")}
          <br />
          <span className="text-gradient">{t("title2")}</span>
        </h1>
        <p className={subCls} style={{ textShadow: "0 2px 12px rgba(0,0,0,.5)" }}>{t("sub")}</p>
        <CtaRow />
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
      </div>
    );
  } else if (stage <= HERO_CHAPTERS.length) {
    const c = HERO_CHAPTERS[stage - 1];
    copy = (
      <div key={c.key} className="max-w-[640px] animate-copy">
        <div className={eyebrowCls}>
          <span className="font-extrabold tracking-[1px] text-glow" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
            {c.tag}
          </span>
          {t(`chapters.${c.key}.accent`)}
        </div>
        <h2 className={h2Cls} style={headingShadow}>
          {t(`chapters.${c.key}.title`)}
          <br />
          <span className="text-gradient">{t(`chapters.${c.key}.accent`)}</span>
        </h2>
        <p className={subCls} style={{ textShadow: "0 2px 12px rgba(0,0,0,.5)" }}>{t(`chapters.${c.key}.body`)}</p>
      </div>
    );
  } else {
    copy = (
      <div key="final" className="max-w-[640px] animate-copy">
        <div className={eyebrowCls}>
          <Dot />
          {t("badge")}
        </div>
        <h2 className={h2Cls} style={headingShadow}>{t("finalTitle")}</h2>
        <p className={subCls} style={{ textShadow: "0 2px 12px rgba(0,0,0,.5)" }}>{t("finalBody")}</p>
        <CtaRow />
      </div>
    );
  }

  const pill = "absolute top-24 z-[5] items-center gap-2 rounded-full px-3 py-[6px] text-[11px] font-bold uppercase tracking-[1.5px] backdrop-blur-[6px]";

  return (
    <section ref={ref} className="relative bg-ink" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* AFTER layer — vibrant, restored */}
        <div className="absolute inset-0">
          <Image src={PHOTOS.heroHome} alt="" fill priority sizes="100vw" className="animate-ken object-cover" />
          <div className="absolute inset-0" style={{ background: SHADE }} />
        </div>

        {/* BEFORE layer — dull, weathered; clipped away as you scroll */}
        <div className="absolute inset-0" style={{ clipPath: clip, WebkitClipPath: clip }}>
          <Image
            src={PHOTOS.heroHome}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(.8) brightness(.72) contrast(.92) sepia(.14)" }}
          />
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
        <div
          className={`${pill} left-8 border border-silver/25 bg-[rgba(10,18,30,.5)] text-silver ${seam > 6 ? "flex" : "hidden"}`}
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {tw("beforeLabel")}
        </div>
        <div
          className={`${pill} right-16 border border-glow/45 bg-brand/20 text-glow ${seam < 94 ? "flex" : "hidden"}`}
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {tw("afterLabel")}
        </div>

        {/* Copy */}
        <div className="absolute inset-0 z-[6] flex items-center px-[clamp(24px,6vw,96px)]">{copy}</div>

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
        <div
          className={`absolute bottom-[26px] left-1/2 z-[6] -translate-x-1/2 flex-col items-center gap-[7px] text-xs font-medium text-white/60 ${
            stage === 0 ? "flex" : "hidden"
          }`}
        >
          <div className="flex animate-float flex-col items-center gap-[7px]">
            <span>{t("scrollHint")}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5 v14 M6 13 l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
