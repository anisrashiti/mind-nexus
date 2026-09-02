# Mind Nexus — website

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

** ADD favicon.ico and icon.svg to app/ so the logo shows - use online tools to convert the png logo file to svg and ico.

## Contact form

The Contact page includes a working contact form that sends an email via [Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — your Resend API key (required)
- `CONTACT_TO_EMAIL` — the inbox that should receive enquiries; defaults to `info@themindnexus.com` if unset
- `CONTACT_FROM_EMAIL` — sender address (must be on a domain verified with Resend; defaults to `onboarding@resend.dev` for testing)

Without `RESEND_API_KEY` set, the form will show a friendly error asking visitors to email the team directly instead.

## Pages

- `/` — Home: hero, full About (Mission/Vision), Services teaser, Founder teaser, closing CTA
- `/services` — Our Approach (core principles, Why Mind Nexus) and the five service categories in full
- `/blog` — bilingual founding story: “Why I Created Mind Nexus”
- `/testimonials` — placeholder
- `/team` — Meet our team: the expertise behind Mind Nexus and Luljeta Berisha's full bio
- `/contact` — contact form + direct email links
- `/terms` — Terms of Service

## SEO

- `lib/site.ts` holds the canonical origin (`NEXT_PUBLIC_SITE_URL`, defaulting to `https://themindnexus.com`),
  the sitemap route list, and the `pageMetadata()` helper each page uses for its title, canonical URL,
  and Open Graph / Twitter card.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- `app/opengraph-image.tsx` renders the 1200×630 social card; `app/icon.svg` is the favicon.
- Structured data: Organization + WebSite in `app/layout.tsx`, `Service` list on `/services`,
  `Person` on `/team`.
- `/testimonials` is `noindex` and excluded from the sitemap while it is a placeholder —
  drop `noindex: true` from its metadata and add it back to `SITEMAP_ROUTES` once it has content.

After deploying, submit `https://themindnexus.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
