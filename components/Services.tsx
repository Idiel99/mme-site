import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { Icon } from "@/lib/icons";
import { SERVICES } from "@/lib/site";

export default function Services() {
  const t = useTranslations("services");
  return (
    <section id="services" className="bg-surface px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,120px)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
          {SERVICES.map((s, i) => (
            <Reveal key={s.key} delay={((i % 3) + 1) as 1 | 2 | 3} className="h-full">
              <div className="relative h-full overflow-hidden rounded-[18px] border border-hair bg-ink-2 p-[30px] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[0_24px_50px_-24px_rgba(11,71,166,.4)]">
                <div className="pointer-events-none absolute top-0 right-0 h-[120px] w-[120px] bg-[radial-gradient(circle_at_top_right,rgba(95,180,247,.14),transparent_70%)]" />
                <div className="mb-[22px] flex h-[58px] w-[58px] items-center justify-center rounded-[15px] bg-gradient-to-br from-ink-2 to-ink-3 text-glow shadow-[0_10px_24px_-10px_rgba(11,71,166,.6)]">
                  <Icon name={s.icon} className="h-[30px] w-[30px]" />
                </div>
                <h3 className="mb-[3px] text-[1.32rem] font-bold tracking-[-.4px] text-white">{t(`items.${s.key}.title`)}</h3>
                <div className="mb-3 text-[13.5px] font-semibold text-brand">{t(`items.${s.key}.alt`)}</div>
                <p className="m-0 text-[14.5px] leading-[1.65] text-white/60">{t(`items.${s.key}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
