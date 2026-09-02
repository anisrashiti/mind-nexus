import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "testimonials.meta" });
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/testimonials",
    locale,
    noindex: true,
  });
}

export default async function TestimonialsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("testimonials");

  return (
    <div className="text-ink">
      <Nav />
      <section className="px-6 pb-[60px] pt-20 sm:px-12">
        <PageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ComingSoon message={t("comingSoon")} />
      </section>
      <CtaBanner />
      <Footer />
    </div>
  );
}
