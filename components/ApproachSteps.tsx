"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const STEP_KEYS = ["01", "02", "03", "04"] as const;

export default function ApproachSteps() {
  const t = useTranslations("approach.steps");
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el) => {
      if (!el) return;

      const reveal = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            reveal.unobserve(el);
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
      );
      reveal.observe(el);
      observers.push(reveal);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative px-6 py-16 sm:px-12 sm:py-24">
      <div className="mx-auto grid w-full max-w-[1120px] gap-x-16 gap-y-20 md:grid-cols-2 md:gap-y-24">
        {STEP_KEYS.map((n, i) => (
          <section
            key={n}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="reveal relative flex flex-col items-center text-center"
          >
            <span className="pointer-events-none select-none font-serif text-[110px] font-light leading-[0.85] text-rust/[0.14] sm:text-[140px]">
              {n}
            </span>

            <div className="mt-6 flex items-center gap-[9px] type-eyebrow text-rust">
              <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
              {t("step")} {n}
            </div>
            <h2 className="mt-5 font-serif type-h3 font-normal text-black">
              {t(`${n}.title`)}
            </h2>
            <p className="mt-6 max-w-[64ch] type-lead text-muted">
              {t(`${n}.body`)}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
