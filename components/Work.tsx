import { useTranslations } from "next-intl";
import BeforeAfterSlider from "./BeforeAfterSlider";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { WORK_ITEMS } from "@/lib/site";

export default function Work() {
  const t = useTranslations("work");
  return (
    <section id="work" className="bg-surface-2 px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,120px)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} center />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {WORK_ITEMS.map((it, i) => (
            <Reveal key={it.key} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <BeforeAfterSlider
                photo={it.photo}
                label={t(`items.${it.key}.title`)}
                tag={t(`items.${it.key}.tag`)}
                beforeLabel={t("beforeLabel")}
                afterLabel={t("afterLabel")}
                sliderLabel={t("sliderLabel")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
