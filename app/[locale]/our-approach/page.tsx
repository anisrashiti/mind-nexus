import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ApproachSteps from "@/components/ApproachSteps";
import { pageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "approach.meta" });
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/our-approach",
    locale,
  });
}

const PRINCIPLE_KEYS = [
  { icon: "◍", key: "professionalism" },
  { icon: "◎", key: "evidence" },
  { icon: "◐", key: "confidentiality" },
  { icon: "◇", key: "ethics" },
  { icon: "◈", key: "impact" },
] as const;

export default async function ApproachPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("approach");

  return (
    <div className="text-ink">
      <Nav />

      <section className="px-6 pt-20 sm:px-12">
        <Reveal className="mx-auto flex max-w-[880px] flex-col items-center text-center">
          <div className="flex items-center gap-[9px] type-eyebrow text-rust">
            <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
            {t("eyebrow")}
          </div>
          <h1 className="mt-5 max-w-[22ch] font-serif type-h1 font-normal text-black">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-[68ch] type-lead text-muted">{t("p1")}</p>
          <p className="mt-5 max-w-[68ch] type-lead text-muted">{t("p2")}</p>
          <p className="mt-5 max-w-[68ch] type-lead text-muted">{t("p3")}</p>
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-[1180px]">
          <h2 className="text-center font-serif type-h3 font-normal text-black">
            {t("principlesTitle")}
          </h2>
          <div className="mt-9 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            {PRINCIPLE_KEYS.map((p) => (
              <div
                key={p.key}
                className="flex flex-col items-center gap-3 rounded-[18px] border border-ink/[0.09] bg-card px-5 py-8 text-center"
              >
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-rust/[0.09] text-[17px] text-rust">
                  {p.icon}
                </span>
                <span className="type-body font-medium text-black">
                  {t(`principles.${p.key}`)}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-center gap-3 text-muted-3">
          <span className="type-meta">{t("scroll")}</span>
          <span className="block h-12 w-[1px] bg-gradient-to-b from-rust/60 to-transparent" />
        </div>
      </section>

      <ApproachSteps />

      <CtaBanner />
      <Footer />
    </div>
  );
}
