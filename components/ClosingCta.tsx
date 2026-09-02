import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ClosingCta() {
  const t = useTranslations("closingCta");

  return (
    <section className="relative px-6 pb-[140px] pt-[130px] sm:px-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 520px at 50% 55%, rgba(133,44,20,0.14) 0%, rgba(249,244,238,0) 70%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <div className="flex items-center gap-[9px] type-eyebrow text-rust">
          <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
          {t("eyebrow")}
        </div>
        <h2 className="mt-[22px] max-w-[20ch] font-serif type-h2 font-normal text-black">
          {t("title")}
        </h2>
        <div className="mt-[22px] flex max-w-[66ch] flex-col gap-6 type-lead text-muted">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-[14px]">
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full bg-rust px-8 py-4 text-[15.5px] font-medium text-cream no-underline hover:bg-rust-dark hover:text-cream hover:no-underline"
          >
            {t("contact")}
          </Link>
          <a
            href="mailto:info@themindnexus.com"
            className="whitespace-nowrap rounded-full border border-ink/[0.22] px-[30px] py-[15px] text-[15.5px] text-ink no-underline hover:border-rust hover:text-rust hover:no-underline"
          >
            {t("email")}
          </a>
        </div>
      </div>
    </section>
  );
}
