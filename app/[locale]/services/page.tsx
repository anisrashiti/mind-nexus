import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const serviceNames = [
    t("categories.consultation.title"),
    t("categories.leadership.title"),
    t("categories.organizational.title"),
    t("categories.training.title"),
    t("categories.research.title"),
  ];

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mind Nexus services",
    itemListElement: serviceNames.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name,
        serviceType: name,
        url: `${SITE_URL}/${locale}/services`,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };

  const strengths = t.raw("why.items") as string[];

  return (
    <div className="text-ink">
      <JsonLd data={servicesSchema} />
      <Nav />

      <section className="px-6 pb-[60px] pt-20 sm:px-12">
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mx-auto mt-12 flex max-w-[780px] flex-col gap-6 text-center type-lead text-muted">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </div>
      </section>

      <section className="px-6 pb-[60px] sm:px-12">
        <div className="mx-auto max-w-[1180px]">
          <Services />
        </div>
      </section>

      <section className="px-6 py-[60px] sm:px-12">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="mx-auto flex max-w-[780px] flex-col items-center text-center">
            <div className="flex items-center gap-[9px] type-eyebrow text-rust">
              <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
              {t("why.eyebrow")}
            </div>
            <h2 className="mt-5 font-serif type-h2 font-normal text-black">
              {t("why.title")}
            </h2>
            <p className="mt-5 max-w-[66ch] type-lead text-muted">
              {t("why.description")}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-x-10 gap-y-4 text-left sm:grid-cols-2">
            {strengths.map((s) => (
              <div
                key={s}
                className="flex items-start gap-3 type-body text-ink"
              >
                <span className="mt-[2px] text-rust">✓</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CtaBanner />
      <Footer />
    </div>
  );
}
