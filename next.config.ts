import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Pin the project root so a stray lockfile higher up the tree isn't picked up.
const root = path.join(__dirname);

// STATIC_EXPORT=true builds plain HTML into out/ for static hosts (GitHub Pages).
// BASE_PATH is the subpath it's served from, e.g. "/mme-site". No proxy or image optimizer there.
const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig = staticExport
  ? {
      output: "export" as const,
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_BASE_PATH: basePath },
      turbopack: { root },
    }
  : {
      output: "standalone" as const,
      outputFileTracingRoot: root,
      turbopack: { root },
      poweredByHeader: false,
    };

export default withNextIntl(nextConfig);
