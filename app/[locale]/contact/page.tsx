import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="text-ink">
      <Nav />
      <section className="relative px-6 py-20 sm:px-12 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 900px 520px at 50% 30%, rgba(133,44,20,0.14) 0%, rgba(249,244,238,0) 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-16 text-center lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-[9px] type-eyebrow text-rust">
              <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
              {t("eyebrow")}
            </div>
            <h1 className="mt-5 font-serif type-h1 font-normal text-black">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-[66ch] type-lead text-muted">
              {t("description")}
            </p>

            <div className="mt-12 flex flex-col items-center gap-3">
              <span className="type-meta text-muted-3">{t("direct")}</span>
              <div className="flex flex-wrap items-center justify-center gap-[10px]">
                <a
                  href="mailto:info@themindnexus.com"
                  className="whitespace-nowrap rounded-full border border-ink/[0.22] px-6 py-3 text-[14.5px] text-ink no-underline hover:border-rust hover:text-rust hover:no-underline"
                >
                  info@themindnexus.com
                </a>
                <a
                  href="mailto:luljeta@themindnexus.com"
                  className="whitespace-nowrap rounded-full border border-ink/[0.22] px-6 py-3 text-[14.5px] text-ink no-underline hover:border-rust hover:text-rust hover:no-underline"
                >
                  luljeta@themindnexus.com
                </a>
                <a
                  href="tel:+38345116162"
                  className="whitespace-nowrap rounded-full border border-ink/[0.22] px-6 py-3 text-[14.5px] text-ink no-underline hover:border-rust hover:text-rust hover:no-underline"
                >
                  +383 45 116 162
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  );
}
