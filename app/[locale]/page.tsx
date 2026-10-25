import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroScroll from "@/components/HeroScroll";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Areas from "@/components/Areas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { CONTACT, COUNTIES, PHONES, PHOTOS, SERVICES, SITE_NAME, SITE_URL, type PhoneLang } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const metaT = await getTranslations({ locale, namespace: "metadata" });
  const servicesT = await getTranslations({ locale, namespace: "services" });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    description: metaT("description"),
    image: new URL(PHOTOS.heroHome, SITE_URL).href,
    telephone: PHONES.en.tel,
    email: CONTACT.email,
    contactPoint: (Object.keys(PHONES) as PhoneLang[]).map((lang) => ({
      "@type": "ContactPoint",
      telephone: PHONES[lang].tel,
      contactType: "customer service",
      availableLanguage: lang === "es" ? "Spanish" : "English",
    })),
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
      <Areas />
      <Contact />
      <Footer />
    </main>
  );
}
