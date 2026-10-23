import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroScroll from "@/components/HeroScroll";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Areas from "@/components/Areas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { CONTACT, COUNTIES, PHOTOS, SERVICES, SITE_NAME, SITE_URL } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const metaT = await getTranslations({ locale, namespace: "metadata" });
  const servicesT = await getTranslations({ locale, namespace: "services" });

  // Skip contact fields that are still "[PLACEHOLDER]" so search engines never index them.
  const filled = (v: string) => (v.startsWith("[") ? undefined : v);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    description: metaT("description"),
    image: `${SITE_URL}${PHOTOS.heroHome}`,
    telephone: filled(CONTACT.phone),
    email: filled(CONTACT.email),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    availableLanguage: ["en", "es"],
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: COUNTIES.flatMap((c) => c.cities).map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Exterior Renovation Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: servicesT(`items.${s.key}.title`) },
      })),
    },
    sameAs: [CONTACT.instagram, CONTACT.facebook],
  };

  return (
    <main id="top" className="bg-surface">
      <JsonLd data={localBusinessSchema} />
      <Navbar />
      <HeroScroll />
      <Services />
      <WhyUs />
      <Work />
      <Process />
      <Testimonials />
      <Areas />
      <Contact />
      <Footer />
    </main>
  );
}
