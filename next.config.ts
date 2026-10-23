import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Pin the project root so a stray lockfile higher up the tree isn't picked up.
const root = path.join(__dirname);

const nextConfig = {
  output: "standalone" as const,
  outputFileTracingRoot: root,
  turbopack: { root },
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
