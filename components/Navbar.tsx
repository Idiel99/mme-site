"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/site";
import { SUPPORTED_LOCALES } from "@/i18n/locales";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the visitor's scroll position when switching language.
  const switchLocale = (next: string) => {
    router.push(pathname.replace(/^\/(en|es)/, `/${next}`), { scroll: false });
  };

  const solid = scrolled || open;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[200] backdrop-blur-[16px] transition-[background-color,border-color] duration-[350ms] border-b ${
        solid ? "bg-[rgba(10,18,30,.92)] border-hair" : "bg-[rgba(10,18,30,.16)] border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-[clamp(20px,4vw,48px)]">
        <a href="#top" onClick={() => setOpen(false)}>
          <Logo height={64} priority />
        </a>

        <ul className="m-0 hidden list-none gap-7 p-0 min-[981px]:flex">
          {NAV_LINKS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="text-[14.5px] font-medium text-white/80 transition-colors duration-200 hover:text-white">
                {t(`links.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-white/15 bg-white/10 p-[3px]">
            {SUPPORTED_LOCALES.map((lng) => (
              <button
                key={lng}
                onClick={() => switchLocale(lng)}
                aria-pressed={locale === lng}
                className={`cursor-pointer rounded-full px-[13px] py-[5px] text-xs font-bold transition-all duration-200 ${
                  locale === lng
                    ? "bg-gradient-to-br from-brand to-brand-deep text-white"
                    : "text-white/60 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                {lng === "en" ? t("langEn") : t("langEs")}
              </button>
            ))}
          </div>
          <a href="#contact" className="btn-primary !hidden !px-5 !py-[11px] !text-sm min-[761px]:!inline-flex">
            {t("quote")}
          </a>
          <button
            aria-label={t("menu")}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-[10px] border border-white/20 bg-white/10 text-white min-[981px]:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6 l12 12 M18 6 l-12 12" /> : <path d="M4 7 h16 M4 12 h16 M4 17 h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-[max-height] duration-[350ms] ease-in-out min-[981px]:hidden ${
          open ? "max-h-[460px] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-[clamp(20px,5vw,32px)] pt-4 pb-6">
          {NAV_LINKS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="border-b border-white/5 px-1 py-[11px] text-[17px] font-semibold text-white/80"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t(`links.${id}`)}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="btn-primary mt-[14px] justify-center">
            {t("quote")}
          </a>
        </div>
      </div>
    </nav>
  );
}
