import Image from "next/image";

const RINGS = [
  { r: 150, opacity: 0.09 },
  { r: 112, opacity: 0.13 },
  { r: 76, opacity: 0.18 },
];

const BLOBS: Record<number, { cx: number; cy: number; r: number; fill: string; opacity: number }[]> = {
  0: [
    { cx: 60, cy: 70, r: 150, fill: "var(--color-rust)", opacity: 0.14 },
    { cx: 330, cy: 260, r: 120, fill: "var(--color-ink)", opacity: 0.08 },
  ],
  1: [
    { cx: 340, cy: 60, r: 140, fill: "var(--color-rust)", opacity: 0.12 },
    { cx: 70, cy: 280, r: 130, fill: "var(--color-ink)", opacity: 0.09 },
  ],
  2: [
    { cx: 90, cy: 280, r: 150, fill: "var(--color-rust)", opacity: 0.13 },
    { cx: 320, cy: 80, r: 110, fill: "var(--color-ink)", opacity: 0.07 },
  ],
  3: [
    { cx: 320, cy: 300, r: 140, fill: "var(--color-rust)", opacity: 0.12 },
    { cx: 60, cy: 60, r: 120, fill: "var(--color-ink)", opacity: 0.09 },
  ],
  4: [
    { cx: 200, cy: 320, r: 160, fill: "var(--color-rust)", opacity: 0.13 },
    { cx: 340, cy: 60, r: 100, fill: "var(--color-ink)", opacity: 0.08 },
  ],
};

export default function ServiceVisual({
  icon,
  index,
  image,
  imageAlt = "",
}: {
  icon: string;
  index: number;
  /** Optional photo. When set, it replaces the abstract placeholder graphic. */
  image?: string;
  imageAlt?: string;
}) {
  const blobs = BLOBS[index % 5];

  if (image) {
    return (
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-[26px] border border-ink/[0.09] bg-card transition-transform duration-500 ease-out [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:hover:-translate-y-1">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-5 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-rust text-[24px] text-cream shadow-[0_18px_40px_-16px_rgba(133,44,20,0.55)]">
          {icon}
        </span>
      </div>
    );
  }

  return (
    <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-[26px] border border-ink/[0.09] bg-card transition-transform duration-500 ease-out [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:hover:-translate-y-1">
      <svg
        viewBox="0 0 400 360"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={`blur-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
        </defs>
        <g filter={`url(#blur-${index})`}>
          {blobs.map((b, i) => (
            <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} opacity={b.opacity} />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-[168px] w-[168px] items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.05] sm:h-[190px] sm:w-[190px]">
          {RINGS.map((ring, i) => (
            <span
              key={i}
              className="absolute rounded-full border border-rust"
              style={{
                height: `${(ring.r / 190) * 100}%`,
                width: `${(ring.r / 190) * 100}%`,
                opacity: ring.opacity,
              }}
            />
          ))}
          <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-rust text-[32px] text-cream shadow-[0_18px_40px_-16px_rgba(133,44,20,0.55)]">
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
}
