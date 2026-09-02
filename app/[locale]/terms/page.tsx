import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms.meta" });
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/terms",
    locale,
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  const sections = t.raw("sections") as Array<{
    title: string;
    body: string[];
  }>;

  return (
    <div className="text-ink">
      <Nav />
      <section className="px-6 pb-[100px] pt-20 sm:px-12">
        <PageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mx-auto mt-14 flex max-w-[780px] flex-col gap-10 text-center">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif type-h4 font-medium text-black">
                {section.title}
              </h2>
              <div className="mt-3 flex flex-col gap-3 type-body text-muted">
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
