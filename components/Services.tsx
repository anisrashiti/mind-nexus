import fs from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";
import ServiceVisual from "@/components/ServiceVisual";
import Reveal from "@/components/Reveal";

const CATEGORY_KEYS = [
  "consultation",
  "leadership",
  "organizational",
  "training",
  "research",
] as const;

const CATEGORY_ICONS = ["◐", "◇", "◎", "◈", "◍"] as const;

const CATEGORY_IMAGES = [
  "/images/services/consult.png",
  "/images/services/leadership.png",
  "/images/services/organizational.png",
  "/images/services/training.png",
  "/images/services/research-eval.png",
] as const;

function resolveImage(src?: string): string | undefined {
  if (!src) return undefined;
  return fs.existsSync(path.join(process.cwd(), "public", src))
    ? src
    : undefined;
}

export default function Services() {
  const t = useTranslations("services");

  return (
    <div className="mt-20 flex w-full flex-col gap-[110px] sm:gap-[150px]">
      {CATEGORY_KEYS.map((key, i) => {
        const title = t(`categories.${key}.title`);
        const intro = t(`categories.${key}.intro`);
        const items = t.raw(`categories.${key}.items`) as string[];

        return (
          <Reveal key={key}>
            <div
              className={`flex flex-col items-center gap-10 sm:gap-16 lg:gap-20 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="flex w-full flex-col items-center text-center lg:w-1/2">
                <div className="flex items-center gap-[9px] type-eyebrow text-rust">
                  <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
                  {t("serviceLabel")} {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 font-serif type-h3 font-normal text-black">
                  {title}
                </h3>
                {intro && (
                  <p className="mt-5 max-w-[64ch] type-body text-muted">
                    {intro}
                  </p>
                )}
                {items.length > 0 && (
                  <ul className="mt-7 flex flex-col gap-[16px] text-left">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-[13px] type-body text-muted-2"
                      >
                        <span className="mt-[9px] block h-[6px] w-[6px] shrink-0 rounded-full bg-rust" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="w-full lg:w-1/2">
                <ServiceVisual
                  icon={CATEGORY_ICONS[i]}
                  index={i}
                  image={resolveImage(CATEGORY_IMAGES[i])}
                  imageAlt={title}
                />
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
