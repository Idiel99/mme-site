"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { SERVICES } from "@/lib/site";

// Demo form: shows a thank-you state on submit. Nothing is sent anywhere yet.
export default function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  const input =
    "w-full rounded-[11px] border-[1.5px] border-line bg-paper px-[15px] py-[13px] text-[14.5px] text-ink outline-none transition-colors duration-200 focus:border-brand";
  const label = "mb-[7px] block text-[11.5px] font-bold uppercase tracking-[.6px] text-steel";

  if (sent) {
    return (
      <div className="px-[10px] py-10 text-center" role="status">
        <div className="mx-auto mb-[18px] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12 l4 4 L19 6" />
          </svg>
        </div>
        <h3 className="mb-2 text-[1.4rem] font-extrabold text-ink">{t("thanksTitle")}</h3>
        <p className="m-0 text-[14.5px] text-steel">{t("thanksBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-4"
    >
      <label className="block">
        <span className={label}>{t("fields.name")}</span>
        <input name="name" required autoComplete="name" className={input} placeholder={t("placeholders.name")} />
      </label>
      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
        <label className="block">
          <span className={label}>{t("fields.phone")}</span>
          <input name="phone" required type="tel" autoComplete="tel" className={input} placeholder={t("placeholders.phone")} />
        </label>
        <label className="block">
          <span className={label}>{t("fields.email")}</span>
          <input name="email" type="email" autoComplete="email" className={input} placeholder={t("placeholders.email")} />
        </label>
      </div>
      <label className="block">
        <span className={label}>{t("fields.service")}</span>
        <select
          name="service"
          defaultValue=""
          className={`${input} appearance-none bg-[url("data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_width='12'_height='8'_viewBox='0_0_12_8'%3E%3Cpath_fill='%238696A8'_d='M6_8_0_0h12z'/%3E%3C/svg%3E")] bg-[position:right_15px_center] bg-no-repeat`}
        >
          <option value="" disabled>
            {t("serviceOptions.placeholder")}
          </option>
          {SERVICES.map((s) => (
            <option key={s.key} value={s.key}>
              {t(`serviceOptions.${s.key}`)}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className={label}>{t("fields.message")}</span>
        <textarea name="message" rows={4} className={`${input} resize-none`} placeholder={t("placeholders.message")} />
      </label>
      <button type="submit" className="btn-primary w-full justify-center !p-4">
        {t("submit")}
      </button>
      <p className="m-0 text-center text-[11.5px] text-steel">{t("disclaimer")}</p>
    </form>
  );
}
