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

function LinkedInLink({ onClick }: { onClick?: () => void }) {
  const t = useTranslations("nav");

  return (
    <a
      href="https://www.linkedin.com/company/the-mind-nexus/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("linkedin")}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-2 no-underline hover:text-rust hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
    >
      {/* The installed lucide-react has no LinkedIn export; reuse the site's brand mark. */}
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className="h-[18px] w-[18px]">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    </a>
  );
}

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
            <LinkedInLink />
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
              <LinkedInLink onClick={() => setOpen(false)} />
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
