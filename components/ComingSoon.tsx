import { useTranslations } from "next-intl";

export default function ComingSoon({ message }: { message: string }) {
  const t = useTranslations("comingSoon");

  return (
    <div className="mx-auto mt-14 flex max-w-[560px] flex-col items-center gap-3 rounded-[18px] border border-ink/[0.09] bg-card px-10 py-16 text-center">
      <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-rust/[0.09] text-[19px] text-rust">
        ◍
      </span>
      <p className="font-serif type-h3 text-black">{t("title")}</p>
      <p className="type-body text-muted">{message}</p>
    </div>
  );
}
