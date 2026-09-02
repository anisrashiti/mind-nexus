import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="home" className="relative overflow-hidden px-6 pb-[150px] pt-40 sm:px-12">
      <div
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[900px] w-[1200px] max-w-[160vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(133,44,20,0.13) 0%, rgba(133,44,20,0.04) 42%, rgba(249,244,238,0) 68%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <div className="flex items-center gap-[9px] type-eyebrow text-rust">
          <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
          {t("eyebrow")}
        </div>
        <h1 className="mt-[26px] max-w-[19ch] text-balance font-serif type-display font-normal text-black">
          {t("title")}
        </h1>
        <p className="mt-7 max-w-[64ch] type-lead text-muted">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-[14px]">
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full bg-rust px-9 py-[18px] text-[15.5px] font-medium text-cream no-underline transition-transform duration-300 ease-out hover:-translate-y-[2px] hover:bg-rust-dark hover:text-cream hover:no-underline"
          >
            {t("contact")}
          </Link>
          <Link
            href="/services"
            className="whitespace-nowrap rounded-full border border-ink/[0.22] px-8 py-[17px] text-[15.5px] text-ink no-underline transition-transform duration-300 ease-out hover:-translate-y-[2px] hover:border-rust hover:text-rust hover:no-underline"
          >
            {t("services")}
          </Link>
        </div>
        <a
          href="#overview"
          className="mt-16 flex flex-col items-center gap-[7px] type-meta text-muted-3 no-underline hover:text-rust hover:no-underline"
        >
          {t("discover")}
          <span
            className="block h-[34px] w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(133,44,20,0.5), rgba(133,44,20,0))",
            }}
          />
        </a>
      </div>
    </section>
  );
}
