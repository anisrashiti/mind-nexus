import type { Metadata } from "next";
import { Newsreader, Karla } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundDecor from "@/components/BackgroundDecor";
import JsonLd from "@/components/JsonLd";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-karla",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s — ${SITE_NAME}`,
    },
    description: t("description"),
    applicationName: SITE_NAME,
    category: "Psychological consulting",
    keywords: [
      "workplace mental health",
      "psychological consulting",
      "organizational resilience",
      "employee well-being",
      "leadership development",
      "burnout prevention",
      "psychological safety",
      "clinical psychologist",
      "Kosovo",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        sq: "/sq",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "sq" ? "sq_AL" : "en_US",
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "site" });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        image: `${SITE_URL}/opengraph-image`,
        description: t("description"),
        slogan: t("slogan"),
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE.replace(/\s/g, ""),
        founder: {
          "@type": "Person",
          name: "Luljeta Berisha",
          jobTitle: "Founder & CEO",
          url: `${SITE_URL}/${locale}/team`,
        },
        knowsAbout: [
          "Workplace mental health",
          "Organizational resilience",
          "Leadership development",
          "Psychological counseling",
          "Stress and burnout prevention",
          "Organizational assessment",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: CONTACT_EMAIL,
          telephone: CONTACT_PHONE.replace(/\s/g, ""),
          availableLanguage: ["en", "sq"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: t("description"),
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale} className={`${newsreader.variable} ${karla.variable}`}>
      <body className="bg-cream font-sans text-ink antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationSchema} />
          <SmoothScroll />
          <div className="relative z-0">
            <BackgroundDecor />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
