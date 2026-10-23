import { notFound } from "next/navigation";

// Unknown paths under a locale (e.g. /es/foo) render the localized app/[locale]/not-found.tsx.
export default function CatchAll() {
  notFound();
}
