import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { Icon } from "@/lib/icons";
import { COUNTIES, phoneFor } from "@/lib/site";

export default function Areas() {
  const t = useTranslations("areas");
  const phone = phoneFor(useLocale());
  return (
    <section id="areas" className="bg-surface-2 px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,120px)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
          {COUNTIES.map((c, i) => (
            <Reveal key={c.key} delay={(i + 1) as 1 | 2} className="h-full">
              <div className="h-full rounded-[18px] border border-hair bg-surface-2 p-[30px]">
                <div className="mb-5 flex items-center gap-[11px]">
                  <Icon name="pin" className="h-[26px] w-[26px] text-brand" />
                  <h3 className="m-0 text-[1.25rem] font-bold text-white">{t(`counties.${c.key}`)}</h3>
                </div>
                <ul className="m-0 flex list-none flex-wrap gap-[9px] p-0">
                  {c.cities.map((city) => (
                    <li key={city} className="rounded-full border border-hair bg-ink-2 px-[15px] py-2 text-[13.5px] font-semibold text-white">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-[14px] rounded-2xl bg-gradient-to-br from-ink-2 to-ink-3 px-[26px] py-5 text-white">
            <Icon name="phone" className="h-[22px] w-[22px] text-glow" />
            <span className="min-w-[200px] flex-1 text-[15px] text-white/85">{t("outside")}</span>
            <a href={`tel:${phone.tel}`} className="whitespace-nowrap text-[15px] font-bold text-glow">
              {phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
