import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { PROCESS_STEPS } from "@/lib/site";

export default function Process() {
  const t = useTranslations("process");
  return (
    <section id="process" className="bg-surface px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,120px)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} center />
        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          <div className="absolute top-[34px] right-[12%] left-[12%] z-0 hidden h-0.5 bg-[linear-gradient(90deg,var(--color-hair),var(--color-brand),var(--color-hair))] min-[981px]:block" />
          {PROCESS_STEPS.map((key, i) => (
            <Reveal key={key} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="relative z-[1] text-center">
                <div
                  className="mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full border-4 border-surface bg-gradient-to-br from-brand to-brand-deep text-[22px] font-extrabold text-white shadow-[0_14px_30px_-12px_rgba(11,71,166,.7)] outline outline-1 outline-hair"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-[1.15rem] font-bold text-white">{t(`steps.${key}.title`)}</h3>
                <p className="mx-auto max-w-[240px] text-sm leading-[1.6] text-white/60">{t(`steps.${key}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
