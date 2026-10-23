import { DEFAULT_LOCALE } from "@/i18n/locales";
import { BASE_PATH } from "@/lib/site";
import { fontVariables } from "@/lib/fonts";

// On a server the proxy redirects "/" to a locale before this renders. Static hosts
// (GitHub Pages) have no proxy, so this page redirects with a plain meta refresh.
export default function RootPage() {
  const target = `${BASE_PATH}/${DEFAULT_LOCALE}/`;
  return (
    <html lang={DEFAULT_LOCALE} className={fontVariables}>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${target}`} />
        <link rel="canonical" href={target} />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen items-center justify-center bg-ink">
          <a href={target} className="text-glow underline">
            MME Group
          </a>
        </div>
      </body>
    </html>
  );
}
