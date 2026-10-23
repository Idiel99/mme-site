import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/locales";

// The proxy already redirects "/" to a locale; this covers requests that bypass it.
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
