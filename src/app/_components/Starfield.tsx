"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  s: number;
  hue: "warm" | "cool";
};

export default function Starfield({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    const stars: Star[] = [];

    function resize() {
      const rect = c!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c!.width = rect.width * dpr;
      c!.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      const count = Math.floor((rect.width * rect.height) / 5500 * density);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height * 0.85,
          r: Math.random() * 1.2 + 0.2,
          a: Math.random(),
          s: 0.6 + Math.random() * 1.6,
          hue: Math.random() < 0.08 ? "warm" : "cool",
        });
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    let t0 = performance.now();
    function frame(t: number) {
      const dt = (t - t0) / 1000;
      t0 = t;
      const rect = c!.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const s of stars) {
        s.a += dt * s.s;
        const alpha = (Math.sin(s.a) + 1) / 2 * 0.85 + 0.15;
        ctx.beginPath();
        ctx.fillStyle = s.hue === "warm"
          ? `rgba(255, 200, 150, ${alpha})`
          : `rgba(220, 230, 255, ${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.0) {
          ctx.beginPath();
          ctx.fillStyle = s.hue === "warm"
            ? `rgba(255, 200, 150, ${alpha * 0.18})`
            : `rgba(200, 220, 255, ${alpha * 0.18})`;
          ctx.arc(s.x, s.y, s.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className="stars" />;
}
