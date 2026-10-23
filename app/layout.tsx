import "./globals.css";

// <html> and <body> are rendered by app/[locale]/layout.tsx, which knows the locale
// (a root layout never receives the [locale] param, so it can't set <html lang>).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
