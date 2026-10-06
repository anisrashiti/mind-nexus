import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import CircularPortrait from "@/components/CircularPortrait";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team.meta" });
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/team",
    locale,
  });
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");

  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t("founderName"),
    jobTitle: t("founderTitle"),
    url: `${SITE_URL}/${locale}/team`,
    image: `${SITE_URL}/images/founder.jpeg`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    description: t("bio.p1"),
    knowsAbout: [
      "Clinical psychology",
      "Psychological counseling and psychotherapy",
      "Workplace mental health",
      "Stress and burnout prevention",
      "Resilience building",
      "Trauma-informed practice",
    ],
  };

  const xhevahireSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/${locale}/team#xhevahire-balaj-mataj`,
    name: t("xhevahire.name"),
    jobTitle: t("xhevahire.title"),
    url: `${SITE_URL}/${locale}/team#xhevahire-balaj-mataj`,
    image: `${SITE_URL}/images/xhevahire-balaj-mataj.jpg`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    description: t("xhevahire.bio.p1"),
    knowsAbout: [
      "Clinical psychology",
      "Trauma therapy",
      "Clinical supervision",
      "Workplace psychological well-being",
      "Resilience building",
      "Professional development",
    ],
  };

  return (
    <div className="text-ink">
      <JsonLd data={founderSchema} />
      <JsonLd data={xhevahireSchema} />
      <Nav />
      <section className="px-6 pb-[60px] pt-20 sm:px-12">
        <PageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mx-auto mt-16 flex max-w-[1180px] flex-col items-center gap-14 sm:flex-row sm:items-start">
          <div className="w-full max-w-[380px] shrink-0 sm:sticky sm:top-28">
            <CircularPortrait
              src="/images/founder.jpeg"
              alt={t("founderAlt")}
              className="max-w-[380px]"
            />
            <p className="mt-8 text-center font-serif type-h4 font-medium text-black">
              {t("founderName")}
            </p>
            <p className="mt-1 text-center type-small text-muted-2">
              {t("founderRole")}
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <p className="type-small font-medium text-rust">
                {t("founderTitle")}
              </p>
              <p className="mt-2 max-w-[56ch] type-small text-muted-2">
                {t("founderCredentials")}
              </p>
            </div>

            <div className="flex max-w-[71ch] flex-col gap-6 type-body text-muted">
              <p>{t("bio.p1")}</p>
              <p>{t("bio.p2")}</p>
              <p>{t("bio.p3")}</p>
              <p>{t("bio.p4")}</p>
            </div>
          </div>
        </div>

        <div
          id="xhevahire-balaj-mataj"
          className="mx-auto mt-20 flex max-w-[1180px] flex-col items-center gap-14 border-t border-ink/[0.08] pt-20 sm:flex-row sm:items-start"
        >
          <div className="w-full max-w-[380px] shrink-0 sm:sticky sm:top-28">
            <CircularPortrait
              src="/images/xhevahire-balaj-mataj.jpg"
              alt={t("xhevahire.alt")}
              className="max-w-[380px]"
            />
            <h2 className="mt-8 text-center font-serif type-h4 font-medium text-black">
              {t("xhevahire.name")}
            </h2>
            <p className="mt-1 text-center type-small text-muted-2">
              {t("xhevahire.role")}
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 text-center">
            <p className="max-w-[56ch] type-small font-medium text-rust">
              {t("xhevahire.title")}
            </p>
            <div className="flex max-w-[71ch] flex-col gap-6 type-body text-muted">
              <p>{t("xhevahire.bio.p1")}</p>
              <p>{t("xhevahire.bio.p2")}</p>
              <p>{t("xhevahire.bio.p3")}</p>
              <p>{t("xhevahire.bio.p4")}</p>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
      <Footer />
    </div>
  );
}
