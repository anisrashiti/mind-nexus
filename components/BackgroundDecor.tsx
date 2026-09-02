"use client";

import { useEffect, useState } from "react";

const WIDTH = 1600;
const HEIGHT = 900;
/* Rendered height of one mesh band. The band count is derived from the page
 * height so the mesh keeps going for the whole document instead of sitting
 * parked in the first viewport. */
const BAND_PX = 760;
const BAND_PX_SM = 520;
const INITIAL_BANDS = 2;

const FLOAT_CLASSES = ["bg-decor-float-a", "bg-decor-float-b", "bg-decor-float-c"];
const MESH_FLOAT_CLASSES = [
  "bg-decor-float-mesh-1",
  "bg-decor-float-mesh-2",
  "bg-decor-float-mesh-3",
];

type Point = { x: number; y: number };
type Line = { x1: number; y1: number; x2: number; y2: number };

function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function buildMeshLayer(
  rand: () => number,
  opts: {
    count: number;
    xRange: [number, number];
    yRange: [number, number];
    maxDist: number;
    maxNeighbors: number;
  }
): { points: Point[]; lines: Line[] } {
  const points: Point[] = Array.from({ length: opts.count }, () => ({
    x: opts.xRange[0] + rand() * (opts.xRange[1] - opts.xRange[0]),
    y: opts.yRange[0] + rand() * (opts.yRange[1] - opts.yRange[0]),
  }));

  const lines: Line[] = [];
  const seen = new Set<string>();

  points.forEach((p, i) => {
    const neighbors = points
      .map((q, j) => ({ j, d: distance(p, q) }))
      .filter(({ j, d }) => j !== i && d <= opts.maxDist)
      .sort((a, b) => a.d - b.d)
      .slice(0, opts.maxNeighbors);

    neighbors.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) return;
      seen.add(key);
      lines.push({ x1: p.x, y1: p.y, x2: points[j].x, y2: points[j].y });
    });
  });

  return { points, lines };
}

/** One band of decor. The seed varies per band so the mesh never repeats. */
function buildBand(seed: number) {
  const rand = mulberry32(seed);

  const layers = [
    // wide, sparse, faintest — background layer
    {
      ...buildMeshLayer(rand, {
        count: 22,
        xRange: [0, WIDTH],
        yRange: [40, HEIGHT - 40],
        maxDist: 260,
        maxNeighbors: 2,
      }),
      lineClass: "stroke-ink/[0.045]",
      nodeClass: "fill-ink/[0.12]",
      keyNodeClass: "fill-rust/[0.18]",
      radius: 1.6,
      keyRadius: 2.4,
    },
    // diagonal mid band, medium density/opacity
    {
      ...buildMeshLayer(rand, {
        count: 17,
        xRange: [100, WIDTH - 100],
        yRange: [220, 620],
        maxDist: 210,
        maxNeighbors: 2,
      }),
      lineClass: "stroke-rust/[0.07]",
      nodeClass: "fill-ink/[0.18]",
      keyNodeClass: "fill-rust/[0.28]",
      radius: 2,
      keyRadius: 2.8,
    },
    // small tight cluster, most visible but still subtle
    {
      ...buildMeshLayer(rand, {
        count: 11,
        xRange: [WIDTH * 0.62, WIDTH * 0.94],
        yRange: [520, HEIGHT - 30],
        maxDist: 170,
        maxNeighbors: 3,
      }),
      lineClass: "stroke-ink/[0.09]",
      nodeClass: "fill-ink/[0.22]",
      keyNodeClass: "fill-rust/[0.32]",
      radius: 2.2,
      keyRadius: 3.2,
    },
  ];

  const scatterDots = Array.from({ length: 46 }, (_, i) => ({
    x: rand() * WIDTH,
    y: rand() * HEIGHT,
    r: 1 + rand() * 1.6,
    opacity: 0.05 + rand() * 0.1,
    rust: rand() > 0.55,
    floatClass: FLOAT_CLASSES[i % FLOAT_CLASSES.length],
    delay: -(rand() * 14),
  }));

  return { layers, scatterDots };
}

const bandCache = new Map<number, ReturnType<typeof buildBand>>();

function getBand(index: number) {
  const seed = 42 + index * 7919;
  let band = bandCache.get(seed);
  if (!band) {
    band = buildBand(seed);
    bandCache.set(seed, band);
  }
  return band;
}

function MeshBand({ index }: { index: number }) {
  const { layers, scatterDots } = getBand(index);
  // The two rings from the original top-of-page decor, alternating sides so
  // they read as one continuous treatment down the page.
  const ringOnLeft = index % 2 === 0;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="block h-[520px] w-full sm:h-[760px]"
    >
      {ringOnLeft ? (
        <circle
          cx="150"
          cy="130"
          r="230"
          className="fill-none stroke-rust/[0.05]"
          strokeWidth="1.2"
        />
      ) : (
        <circle
          cx="1480"
          cy="770"
          r="260"
          className="fill-none stroke-ink/[0.04]"
          strokeWidth="1.2"
        />
      )}

      {layers.map((layer, li) => (
        <g key={li} className={MESH_FLOAT_CLASSES[li % MESH_FLOAT_CLASSES.length]}>
          {layer.lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              className={layer.lineClass}
              strokeWidth="1"
            />
          ))}
          {layer.points.map((p, i) => {
            const isKey = i % 4 === 0;
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={isKey ? layer.keyRadius : layer.radius}
                className={isKey ? layer.keyNodeClass : layer.nodeClass}
              />
            );
          })}
        </g>
      ))}

      {scatterDots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={d.rust ? "var(--color-rust)" : "var(--color-ink)"}
          opacity={d.opacity}
          className={d.floatClass}
          style={{ animationDelay: `${d.delay}s` }}
        />
      ))}
    </svg>
  );
}

export default function BackgroundDecor() {
  const [bands, setBands] = useState(INITIAL_BANDS);

  useEffect(() => {
    function measure() {
      const bandPx = window.matchMedia("(min-width: 640px)").matches
        ? BAND_PX
        : BAND_PX_SM;
      const pageHeight = document.documentElement.scrollHeight;
      setBands(Math.max(INITIAL_BANDS, Math.ceil(pageHeight / bandPx) + 1));
    }

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {Array.from({ length: bands }, (_, i) => (
        <MeshBand key={i} index={i} />
      ))}
    </div>
  );
}
