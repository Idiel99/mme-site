import { notFound } from "next/navigation";

// Unknown paths under a locale (e.g. /es/foo) render the localized app/[locale]/not-found.tsx.
// Static exports can't prerender a catch-all, so emit /{locale}/404/ as a concrete localized 404.
export function generateStaticParams() {
  return [{ rest: ["404"] }];
}

export default function CatchAll() {
  notFound();
}
