import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Local, hand-authored placeholder graphics only — safe to allow SVG optimization.
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [{ source: "/founder", destination: "/sq/team", permanent: true }];
  },
};

export default withNextIntl(nextConfig);
