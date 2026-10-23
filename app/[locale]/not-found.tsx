import { useTranslations } from "next-intl";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(165deg,var(--color-ink),#0a2747)] px-4">
      <div className="max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <Logo size={44} id="nf-logo" />
        </div>
        <div className="mb-4 text-8xl font-black text-glow" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
          404
        </div>
        <h1 className="mb-4 text-2xl font-bold text-white">{t("title")}</h1>
        <p className="mb-8 leading-relaxed text-white/50">{t("body")}</p>
        <Link href="/" className="btn-primary">
          {t("home")}
        </Link>
      </div>
    </div>
  );
}
