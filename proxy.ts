import createMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/i18n/locales";

export default createMiddleware({
  locales: [...SUPPORTED_LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});

// Paths excluded from locale rewriting:
// - _next, _vercel: framework internals.
// - .*\\..*: any path containing a dot (static files: .ico, .png, .jpg, .css, .js, etc.).
export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
