import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/blog",
    locale,
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <div className="text-ink">
      <Nav />
      <main>
        <article className="px-6 pb-[120px] pt-20 sm:px-12 sm:pb-[150px] sm:pt-24">
          <Reveal className="mx-auto max-w-[820px]">
            <header className="flex flex-col items-center text-center">
              <div className="flex items-center gap-[9px] type-eyebrow text-rust">
                <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
                {t("eyebrow")}
              </div>
              <h1 className="mt-6 max-w-[20ch] text-balance font-serif type-h1 font-normal text-black">
                {t("title")}
              </h1>
              <span className="mt-10 block h-px w-20 bg-rust/35" />
            </header>

            <div className="mt-12 flex flex-col gap-7 text-left type-body text-muted sm:mt-16">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "font-serif type-lead text-ink"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="mt-12 rounded-[20px] border border-rust/15 bg-card px-7 py-9 text-center font-serif type-h3 font-normal text-rust sm:px-12">
              {t("tagline")}
            </blockquote>
          </Reveal>
        </article>
      </main>
      <CtaBanner />
      <Footer />
    </div>
  );
}
