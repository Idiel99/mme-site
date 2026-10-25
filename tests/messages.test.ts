import { describe, it, expect } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import {
  COUNTIES,
  NAV_LINKS,
  PROCESS_STEPS,
  SERVICES,
  WHY_ITEMS,
  WHY_STATS,
  WORK_ITEMS,
} from "@/lib/site";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
}

function get(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], obj);
}

describe("messages", () => {
  it("en and es define exactly the same keys", () => {
    expect(keyPaths(es).sort()).toEqual(keyPaths(en).sort());
  });

  it("has no empty strings", () => {
    for (const [name, msgs] of [["en", en], ["es", es]] as const) {
      for (const path of keyPaths(msgs)) {
        expect(get(msgs, path), `${name}:${path}`).not.toBe("");
      }
    }
  });

  // Every id in lib/site.ts must have copy, or the page renders a raw key.
  const required = [
    ...NAV_LINKS.map((id) => `nav.links.${id}`),
    ...SERVICES.flatMap((s) => [
      `services.items.${s.key}.title`,
      `services.items.${s.key}.alt`,
      `services.items.${s.key}.desc`,
      `hero.chapters.${s.key}.title`,
      `contact.serviceOptions.${s.key}`,
    ]),
    ...WHY_ITEMS.map((w) => `why.items.${w.key}.title`),
    ...WHY_STATS.map((s) => `why.stats.${s.key}`),
    ...WORK_ITEMS.map((w) => `work.items.${w.key}.title`),
    ...PROCESS_STEPS.map((k) => `process.steps.${k}.title`),
    ...COUNTIES.map((c) => `areas.counties.${c.key}`),
  ];

  it.each(required)("defines %s", (path) => {
    expect(typeof get(en, path)).toBe("string");
    expect(typeof get(es, path)).toBe("string");
  });
});
