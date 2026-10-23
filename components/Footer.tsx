import { useTranslations } from "next-intl";
import Logo from "./Logo";
import { CONTACT, SERVICES } from "@/lib/site";

const COMPANY_LINKS = ["why", "work", "areas", "contact"] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const ts = useTranslations("services");

  const heading = "mb-4 text-[13px] font-bold uppercase tracking-[1px] text-white";
  const list = "m-0 flex list-none flex-col gap-[11px] p-0";
  const link = "text-sm text-white/50 transition-colors duration-200 hover:text-white";

  return (
    <footer className="border-t border-silver/10 bg-footer px-[clamp(20px,5vw,48px)] pt-[clamp(48px,7vw,72px)] pb-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-11 grid grid-cols-1 gap-7 min-[521px]:grid-cols-2 min-[761px]:grid-cols-[1.6fr_1fr_1fr_1.2fr] min-[761px]:gap-10">
          <div>
            <Logo size={40} id="footer-logo" />
            <p className="mt-[18px] mb-0 max-w-[320px] text-sm leading-[1.65] text-white/50">{t("tagline")}</p>
          </div>
          <div>
            <h4 className={heading}>{t("servicesTitle")}</h4>
            <ul className={list}>
              {SERVICES.map((s) => (
                <li key={s.key}>
                  <a href="#services" className={link}>
                    {ts(`items.${s.key}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={heading}>{t("companyTitle")}</h4>
            <ul className={list}>
              {COMPANY_LINKS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className={link}>
                    {t(`company.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={heading}>{t("contactTitle")}</h4>
            <ul className={list}>
              <li><a href={`tel:${CONTACT.phone}`} className={link}>{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a></li>
              <li><a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={link}>Instagram</a></li>
              <li><a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className={link}>Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="silver-rule mb-6 opacity-40" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-[12.5px] text-white/40">
            © {new Date().getFullYear()} MME Group. {t("rights")} · {t("license", { license: CONTACT.license })}
          </p>
          <p className="m-0 text-[12.5px] text-white/40">{t("region")}</p>
        </div>
      </div>
    </footer>
  );
}
