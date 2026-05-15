"use client";

export default function PhaseGlyph({ fraction }: { fraction: number }) {
  const size = 12;
  const f = fraction;
  let bright: "right" | "left";
  let coverage: number;
  if (f < 0.5) {
    bright = "right";
    coverage = 1 - f * 2;
  } else {
    bright = "left";
    coverage = (f - 0.5) * 2;
  }
  const r = size / 2;
  const ellipseCx = +(bright === "right" ? r - r * (1 - coverage) : r + r * (1 - coverage)).toFixed(3);
  const ellipseRx = +(r * coverage).toFixed(3);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ marginRight: 6 }}>
      <defs>
        <clipPath id="moonClip">
          <circle cx={r} cy={r} r={r} />
        </clipPath>
      </defs>
      <g clipPath="url(#moonClip)">
        <circle cx={r} cy={r} r={r} fill="#d7d8da" />
        <ellipse
          cx={ellipseCx}
          cy={r}
          rx={ellipseRx}
          ry={r}
          fill="#0a0b10"
        />
        <rect
          x={bright === "right" ? 0 : r}
          y={0}
          width={r}
          height={size}
          fill="#0a0b10"
        />
      </g>
      <circle cx={r} cy={r} r={r - 0.5} fill="none" stroke="rgba(255,255,255,0.2)" />
    </svg>
  );
}
