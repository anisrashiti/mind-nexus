import { useTranslations } from "next-intl";
import Logo from "@/components/Logo";
import { Link } from "@/i18n/navigation";

/** LinkedIn URL to be provided — the link is hidden until it is set. */
const LINKEDIN_URL: string = "";

const CONTACT_LINKS = [
  { href: "tel:+38345116162", label: "+383 45 116 162" },
  { href: "mailto:info@themindnexus.com", label: "info@themindnexus.com" },
  { href: "mailto:luljeta@themindnexus.com", label: "luljeta@themindnexus.com" },
];

function LinkedInMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const companyLinks = [
    { href: "/#overview" as const, label: t("aboutUs") },
    { href: "/our-approach" as const, label: tNav("ourApproach") },
    { href: "/team" as const, label: tNav("meetTeam") },
  ];

  const resourceLinks = [
    { href: "/testimonials" as const, label: tNav("testimonials") },
    { href: "/blog" as const, label: tNav("blog") },
  ];

  const serviceLinks = t.raw("serviceLinks") as string[];

  return (
    <footer className="border-t border-cream/[0.08] bg-ink px-6 pb-10 pt-16 sm:px-12">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.4fr_1.15fr]">
        <div>
          <Logo markClassName="h-[26px] w-[26px] shrink-0" className="text-cream" />
          <p className="mt-[14px] max-w-[32ch] text-sm leading-[1.65] text-cream/65">
            {t("tagline")}
          </p>
        </div>

        <div className="flex flex-col gap-8 text-sm">
          <div className="flex flex-col gap-[11px]">
            <span className="type-meta text-cream/40">{t("company")}</span>
            {companyLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-cream/70 no-underline hover:text-rust hover:no-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-[11px]">
            <span className="type-meta text-cream/40">{t("resources")}</span>
            {resourceLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-cream/70 no-underline hover:text-rust hover:no-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[11px] text-sm">
          <span className="type-meta text-cream/40">{t("ourServices")}</span>
          {serviceLinks.map((label) => (
            <Link
              key={label}
              href="/services"
              className="text-cream/70 no-underline hover:text-rust hover:no-underline"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-[11px] text-sm">
          <span className="type-meta text-cream/40">{t("contact")}</span>
          {CONTACT_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="break-words text-cream/70 no-underline hover:text-rust hover:no-underline"
            >
              {l.label}
            </a>
          ))}
          {LINKEDIN_URL && (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-cream/70 no-underline hover:text-rust hover:no-underline sm:justify-start"
            >
              <LinkedInMark />
              LinkedIn
            </a>
          )}
        </div>
      </div>

      <div className="mx-auto mt-11 flex max-w-[1180px] flex-wrap justify-between gap-5 border-t border-cream/[0.1] pt-[22px] type-meta tracking-normal normal-case text-cream/45">
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>© 2026 Mind Nexus</span>
          <Link
            href="/terms"
            className="text-cream/45 no-underline hover:text-rust hover:no-underline"
          >
            {t("terms")}
          </Link>
        </span>
        <span>
          {t("madeBy")}{" "}
          <a
            href="https://cyphera.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/45 no-underline hover:text-rust hover:no-underline"
          >
            Cyphera
          </a>
        </span>
      </div>
    </footer>
  );
}
