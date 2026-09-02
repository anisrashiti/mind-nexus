import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CtaBanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="bg-rust px-6 py-16 sm:px-12 sm:py-20">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-7 text-center sm:flex-row sm:justify-between">
        <div>
          <p className="font-serif type-h3 text-cream">{t("title")}</p>
          <p className="mt-2 type-small text-cream/75">{t("subtitle")}</p>
        </div>
        <Link
          href="/contact"
          className="whitespace-nowrap rounded-full bg-cream px-9 py-[18px] text-[15.5px] font-medium text-rust no-underline transition-transform duration-300 ease-out hover:-translate-y-[2px] hover:bg-white hover:text-rust hover:no-underline"
        >
          {t("button")}
        </Link>
      </div>
    </section>
  );
}
