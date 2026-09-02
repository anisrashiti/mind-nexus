"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LINKS = [
  { href: "/our-approach" as const, labelKey: "ourApproach" as const },
  { href: "/services" as const, labelKey: "ourServices" as const },
  { href: "/testimonials" as const, labelKey: "testimonials" as const },
  { href: "/blog" as const, labelKey: "blog" as const },
];

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-ink/[0.08] bg-cream/88 px-6 backdrop-blur-md sm:px-12">
        <div className="mx-auto flex max-w-[1180px] items-center gap-6 overflow-x-auto py-[18px]">
          <Link href="/" className="shrink-0 text-ink no-underline hover:no-underline">
            <Logo markClassName="h-[30px] w-[30px] shrink-0" />
          </Link>

          <div className="hidden shrink-0 items-center gap-[22px] whitespace-nowrap text-[17px] text-muted-2 md:flex">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    active
                      ? "text-ink font-medium no-underline hover:no-underline"
                      : "text-muted-2 no-underline hover:text-rust hover:no-underline"
                  }
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </div>

          <div className="ml-auto hidden shrink-0 items-center gap-[10px] md:flex">
            <div className="flex items-center gap-1 rounded-full border border-ink/[0.15] p-[3px] text-[13px]">
              {routing.locales.map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  className={
                    l === locale
                      ? "rounded-full bg-rust px-3 py-[5px] font-medium text-cream no-underline hover:no-underline"
                      : "rounded-full px-3 py-[5px] text-muted-2 no-underline hover:text-rust hover:no-underline"
                  }
                  aria-label={l === "en" ? "English" : "Shqip"}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <Link
              href="/team"
              className="shrink-0 whitespace-nowrap rounded-full border border-ink/[0.22] px-5 py-[10px] text-sm text-ink no-underline hover:border-rust hover:text-rust hover:no-underline"
            >
              {t("meetTeam")}
            </Link>
            <Link
              href="/contact"
              className="shrink-0 whitespace-nowrap rounded-full bg-rust px-[22px] py-[11px] text-sm font-medium text-cream no-underline hover:bg-rust-dark hover:text-cream hover:no-underline"
            >
              {t("contact")}
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-cream md:hidden">
          <div className="flex items-center justify-between border-b border-ink/[0.08] px-6 py-[18px]">
            <Link
              href="/"
              className="shrink-0 text-ink no-underline hover:no-underline"
              onClick={() => setOpen(false)}
            >
              <Logo markClassName="h-[30px] w-[30px] shrink-0" />
            </Link>
            <button
              type="button"
              aria-label={t("closeMenu")}
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-9">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={
                pathname === "/"
                  ? "font-serif text-[26px] text-ink no-underline hover:no-underline"
                  : "font-serif text-[26px] text-muted-2 no-underline hover:text-rust hover:no-underline"
              }
            >
              {t("home")}
            </Link>
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    active
                      ? "font-serif text-[26px] text-ink no-underline hover:no-underline"
                      : "font-serif text-[26px] text-muted-2 no-underline hover:text-rust hover:no-underline"
                  }
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}

            <div className="flex items-center gap-2">
              {routing.locales.map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  onClick={() => setOpen(false)}
                  className={
                    l === locale
                      ? "rounded-full bg-rust px-4 py-2 text-sm font-medium text-cream no-underline hover:no-underline"
                      : "rounded-full border border-ink/[0.22] px-4 py-2 text-sm text-muted-2 no-underline hover:text-rust hover:no-underline"
                  }
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>

            <Link
              href="/team"
              onClick={() => setOpen(false)}
              className="mt-3 whitespace-nowrap rounded-full border border-ink/[0.22] px-8 py-[14px] text-base text-ink no-underline hover:border-rust hover:text-rust hover:no-underline"
            >
              {t("meetTeam")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="whitespace-nowrap rounded-full bg-rust px-9 py-[16px] text-base font-medium text-cream no-underline hover:bg-rust-dark hover:text-cream hover:no-underline"
            >
              {t("contact")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
