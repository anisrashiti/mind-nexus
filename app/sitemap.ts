import type { MetadataRoute } from "next";
import { SITE_URL, SITEMAP_ROUTES } from "@/lib/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    SITEMAP_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}/${locale}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
  );
}
