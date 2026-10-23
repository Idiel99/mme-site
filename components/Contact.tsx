import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { Icon, type IconName } from "@/lib/icons";
import { CONTACT } from "@/lib/site";

export default function Contact() {
  const t = useTranslations("contact");

  const rows: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "phone", label: t("phoneLabel"), value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
    { icon: "mail", label: t("emailLabel"), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: "clock", label: t("hoursLabel"), value: t("hoursValue") },
    { icon: "pin", label: t("addressLabel"), value: t("addressValue") },
  ];

  const social = "flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-silver/20 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[linear-gradient(165deg,var(--color-ink),#0a2747)] px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,120px)]"
    >
      <div className="pointer-events-none absolute -bottom-[120px] -left-20 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(26,111,224,.2),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-[clamp(32px,5vw,64px)] min-[981px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
          <div className="flex flex-col gap-3">
            {rows.map((c, i) => {
              const inner = (
                <>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] border border-glow/30 bg-glow/15 text-glow">
                    <Icon name={c.icon} className="h-[22px] w-[22px]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[.5px] text-white/50">{c.label}</div>
                    <div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                      {c.value}
                    </div>
                  </div>
                </>
              );
              const cls = "flex items-center gap-[15px] rounded-[13px] border border-hair bg-white/5 p-[15px]";
              return (
                <Reveal key={c.icon} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  {c.href ? (
                    <a href={c.href} className={`${cls} transition-colors duration-200 hover:border-glow/40`}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
            <Reveal>
              <div className="mt-[6px] flex gap-3">
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={social}>
                  <Icon name="instagram" className="h-[22px] w-[22px]" />
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={social}>
                  <Icon name="facebook" className="h-[22px] w-[22px]" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={2}>
          <div className="rounded-[22px] bg-white p-[clamp(26px,4vw,40px)] shadow-[0_40px_90px_-40px_rgba(0,0,0,.6)]">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
