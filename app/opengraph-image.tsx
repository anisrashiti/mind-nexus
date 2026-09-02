import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt =
  "Mind Nexus — Resilience and Mental Health for Stronger Workplaces";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
  <circle cx="100" cy="100" r="93" stroke="#222121" stroke-width="9" />
  <g stroke="#222121" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M58 118 L58 62" /><path d="M58 62 L79 118" /><path d="M79 118 L100 62" />
    <path d="M100 62 L100 118" /><path d="M100 118 L100 158" /><path d="M100 118 L142 158" />
    <path d="M142 118 L142 158" />
  </g>
  <g fill="#852c14">
    <circle cx="58" cy="62" r="10.5" /><circle cx="100" cy="62" r="10.5" />
    <circle cx="58" cy="118" r="10.5" /><circle cx="79" cy="118" r="10.5" />
    <circle cx="100" cy="118" r="10.5" /><circle cx="142" cy="118" r="10.5" />
    <circle cx="100" cy="158" r="10.5" /><circle cx="142" cy="158" r="10.5" />
  </g>
</svg>`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f9f4ee",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(LOGO_MARK)}`}
            width={64}
            height={64}
            alt=""
          />
          <div style={{ fontSize: 40, color: "#222121", letterSpacing: -0.5 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#852c14",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#852c14",
              }}
            />
            Psychological consulting
          </div>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.15,
              color: "#222121",
              maxWidth: 900,
            }}
          >
            Resilience and Mental Health for Stronger Workplaces
          </div>
          <div style={{ fontSize: 30, color: "#5c5857" }}>
            Resilient people. Strong organizations.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#857f7c",
          }}
        >
          <div>themindnexus.com</div>
          <div>info@themindnexus.com</div>
        </div>
      </div>
    ),
    size,
  );
}
