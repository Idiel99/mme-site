import Link from "next/link";
import Logo from "@/components/Logo";
import { fontVariables } from "@/lib/fonts";

// Fallback 404 for URLs outside a locale. Localized 404s live in app/[locale]/not-found.tsx.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased">
        <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(165deg,var(--color-ink),#0a2747)] px-4">
          <div className="max-w-lg text-center">
            <div className="mb-8 flex justify-center">
              <Logo size={44} id="gnf-logo" />
            </div>
            <div className="mb-4 text-8xl font-black text-glow" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
              404
            </div>
            <h1 className="mb-8 text-2xl font-bold text-white">Page Not Found · Página No Encontrada</h1>
            <Link href="/en" className="btn-primary">
              Go to Homepage
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
