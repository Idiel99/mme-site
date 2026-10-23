import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { Icon } from "@/lib/icons";
import { PHOTOS, WHY_ITEMS, WHY_STATS } from "@/lib/site";

export default function WhyUs() {
  const t = useTranslations("why");
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-[linear-gradient(165deg,var(--color-ink)_0%,#0c1f38_60%,#0a2747_100%)] px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,120px)]"
    >
      <div className="pointer-events-none absolute -top-[100px] -right-[100px] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(26,111,224,.22),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-[clamp(32px,6vw,80px)] min-[981px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
            <div className="grid grid-cols-2 gap-[18px]">
              {WHY_ITEMS.map((w, i) => (
                <Reveal key={w.key} delay={((i % 2) + 1) as 1 | 2} className="h-full">
                  <div className="h-full rounded-2xl border border-hair bg-white/5 p-[22px] backdrop-blur-[6px]">
                    <div className="mb-[14px] flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-glow/30 bg-glow/15 text-glow">
                      <Icon name={w.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mb-[6px] text-[1.05rem] font-bold text-white">{t(`items.${w.key}.title`)}</h3>
                    <p className="m-0 text-[13.5px] leading-[1.6] text-white/60">{t(`items.${w.key}.desc`)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={2}>
            <div className="relative h-[540px] overflow-hidden rounded-[22px] border border-silver/20 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]">
              <Image
                src={PHOTOS.crew}
                alt={t("photoAlt")}
                fill
                sizes="(max-width: 980px) 100vw, 600px"
                className="animate-ken object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(8,17,30,.85))]" />
              <div className="absolute inset-x-5 bottom-5 grid grid-cols-4 gap-[10px] rounded-2xl border border-silver/20 bg-[rgba(10,18,30,.55)] px-3 py-4 backdrop-blur-[10px]">
                {WHY_STATS.map((st) => (
                  <div key={st.key} className="text-center">
                    <div
                      className="text-[clamp(1.1rem,2vw,1.5rem)] font-extrabold tracking-[-.5px] text-white"
                      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                    >
                      {st.num}
                    </div>
                    <div className="mt-0.5 text-[10.5px] leading-[1.3] text-white/60">{t(`stats.${st.key}`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
