import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { Icon } from "@/lib/icons";
import { TESTIMONIALS } from "@/lib/site";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const outfit = { fontFamily: "var(--font-outfit), sans-serif" };
  return (
    <section className="bg-surface-2 px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,120px)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} center />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[22px]">
          {TESTIMONIALS.map((r, i) => (
            <Reveal key={r.key} delay={((i % 3) + 1) as 1 | 2 | 3} className="h-full">
              <figure className="m-0 flex h-full flex-col rounded-[18px] border border-hair bg-ink-2 p-[30px] shadow-[0_4px_20px_-12px_rgba(11,71,166,.25)]">
                <div className="mb-4 flex gap-[3px] text-gold" role="img" aria-label={t("rating")}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Icon key={j} name="star" className="h-[18px] w-[18px]" />
                  ))}
                </div>
                <blockquote className="m-0 mb-[22px] flex-1 text-[15.5px] leading-[1.7] text-white">{t(`items.${r.key}`)}</blockquote>
                <figcaption className="flex items-center gap-[13px] border-t border-hair pt-[18px]">
                  <div
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ink-2 to-ink-3 text-base font-extrabold text-glow"
                    style={outfit}
                  >
                    {r.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="whitespace-nowrap text-[14.5px] font-bold leading-[1.3] text-white" style={outfit}>
                      {r.name}
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-white/60">{r.loc}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-[30px] text-center text-[12.5px] italic text-white/60">{t("note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
