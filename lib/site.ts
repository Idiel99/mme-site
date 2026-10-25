// Non-translatable site structure. Copy lives in messages/{en,es}.json, keyed by the ids below.
import type { IconName } from "./icons";

export const SITE_NAME = "MME Group";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// One phone line per language. `tel` is the dialable E.164 form used in tel: links.
export const PHONES = {
  en: { display: "786-308-7642", tel: "+17863087642" },
  es: { display: "786-308-7642", tel: "+17863087642" },
} as const;

export type PhoneLang = keyof typeof PHONES;

// The line to show where there's room for only one number: the visitor's language.
export function phoneFor(locale: string) {
  return PHONES[locale === "es" ? "es" : "en"];
}

export const CONTACT = {
  email: "mmegroupenterpriseinc@gmail.com",
  license: "[LICENSE]", // placeholder — fill in before launch
  instagram: "https://www.instagram.com/mme__group",
  facebook: "https://www.facebook.com/share/1EQkhJMWvH",
};

// Set for static exports served from a subpath (see next.config.ts). next/image doesn't add it to string srcs.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const PHOTOS = {
  heroHome: `${BASE_PATH}/images/hero-home.jpg`,
  crew: `${BASE_PATH}/images/crew.jpg`,
  stuccoDrive: `${BASE_PATH}/images/stucco-drive.jpg`,
  poolPalm: `${BASE_PATH}/images/pool-palm.jpg`,
  coastal: `${BASE_PATH}/images/coastal.jpg`,
};

export const NAV_LINKS = ["services", "why", "work", "process", "areas", "contact"] as const;

export const SERVICES: { key: string; icon: IconName }[] = [
  { key: "roofing", icon: "roof" },
  { key: "stucco", icon: "stucco" },
  { key: "painting", icon: "paint" },
  { key: "pressure", icon: "wash" },
  { key: "driveways", icon: "driveway" },
  { key: "more", icon: "more" },
];

// Scroll-hero chapters, one per service, in order.
export const HERO_CHAPTERS = SERVICES.map((s, i) => ({
  key: s.key,
  tag: String(i + 1).padStart(2, "0"),
}));

export const WHY_ITEMS: { key: string; icon: IconName }[] = [
  { key: "licensed", icon: "shield" },
  { key: "experience", icon: "badge" },
  { key: "guarantee", icon: "star" },
  { key: "local", icon: "pin" },
];

export const WHY_STATS = [
  { key: "years", num: "10+" },
  { key: "projects", num: "500+" },
  { key: "insured", num: "100%" },
  { key: "rating", num: "5.0★" },
];

// Real project pairs, cropped to the slider's 4:3 frame in public/images/work/{key}-{before,after}.jpg.
export const WORK_ITEMS = ["stuccoPaint", "roofValley", "roofClean", "wallWash", "metalRoof", "stepsWash"].map((key) => ({
  key,
  before: `${BASE_PATH}/images/work/${key}-before.jpg`,
  after: `${BASE_PATH}/images/work/${key}-after.jpg`,
}));

export const PROCESS_STEPS = ["consult", "quote", "work", "done"] as const;

export const COUNTIES = [
  {
    key: "miamiDade",
    cities: ["Miami", "Hialeah", "Doral", "Kendall", "Homestead", "Coral Gables", "Miami Beach", "Aventura"],
  },
  {
    key: "broward",
    cities: ["Fort Lauderdale", "Hollywood", "Pembroke Pines", "Miramar", "Davie", "Plantation", "Coral Springs", "Weston"],
  },
];
