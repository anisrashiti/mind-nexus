import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MissionVision from "@/components/About";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const serviceTeasers = t.raw("services.teasers") as Array<{
    icon: string;
    title: string;
    text: string;
  }>;

  return (
    <div className="text-ink">
      <Nav />
      <Hero />

      <section id="overview" className="px-6 py-[140px] sm:px-12 sm:py-[170px]">
        <Reveal className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
          <div className="flex items-center gap-[9px] type-eyebrow text-rust">
            <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
            {t("about.eyebrow")}
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <h2 className="max-w-[20ch] font-serif type-h2 font-normal text-black">
              {t("about.title")}
            </h2>
            <LogoMark className="h-[1em] w-[1em] shrink-0 type-h2" />
          </div>
          <div className="mx-auto mt-6 flex max-w-[780px] flex-col gap-6 text-center type-lead text-muted">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            {t.has("about.p3") && <p>{t("about.p3")}</p>}
          </div>
        </Reveal>
        <Reveal className="mx-auto mt-14 max-w-[1180px]">
          <MissionVision />
        </Reveal>
      </section>

      <section id="services" className="px-6 py-[140px] sm:px-12 sm:py-[170px]">
        <Reveal className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
          <div className="flex items-center gap-[9px] type-eyebrow text-rust">
            <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
            {t("services.eyebrow")}
          </div>
          <h2 className="mt-6 max-w-[20ch] font-serif type-h2 font-normal text-black">
            {t("services.title")}
          </h2>
          <p className="mt-6 max-w-[56ch] type-lead text-muted">
            {t("services.subtitle")}
          </p>

          <div className="mt-16 grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 text-center">
            {serviceTeasers.map((s) => (
              <div
                key={s.title}
                className="rounded-[20px] border border-ink/[0.09] bg-card p-9 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-rust/40 hover:shadow-[0_24px_50px_-24px_rgba(133,44,20,0.35)]"
              >
                <span className="mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-rust/[0.09] text-[18px] text-rust">
                  {s.icon}
                </span>
                <h3 className="mt-5 mb-[10px] font-serif type-h4 font-medium text-black">
                  {s.title}
                </h3>
                <p className="type-body text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <Link
            href="/services"
            className="mt-10 border-b border-rust/35 pb-[2px] type-small text-rust no-underline hover:text-rust-dark hover:no-underline"
          >
            {t("services.viewAll")}
          </Link>
        </Reveal>
      </section>

      <section className="px-6 py-[140px] sm:px-12 sm:py-[170px]">
        <Reveal className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
          <div className="flex items-center gap-[9px] type-eyebrow text-rust">
            <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
            {t("team.eyebrow")}
          </div>
          <h2 className="mt-6 max-w-[20ch] font-serif type-h2 font-normal text-black">
            {t("team.title")}
          </h2>
          <p className="mt-6 max-w-[68ch] type-lead text-muted">
            {t("team.description")}
          </p>

          <Link
            href="/team"
            className="mt-10 border-b border-rust/35 pb-[2px] type-small text-rust no-underline hover:text-rust-dark hover:no-underline"
          >
            {t("team.meetTeam")}
          </Link>
        </Reveal>
      </section>

      <ClosingCta />
      <Footer />
    </div>
  );
}
