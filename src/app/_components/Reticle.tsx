"use client";

import { useEffect, useRef, useState } from "react";

export default function Reticle({
  frameRef,
}: {
  frameRef: React.RefObject<HTMLDivElement | null>;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    const read = readRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      el!.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (frameRef.current && read) {
        const r = frameRef.current.getBoundingClientRect();
        const u = (e.clientX - r.left) / r.width;
        const v = (e.clientY - r.top) / r.height;
        const lat = (8.5 + (v - 0.5) * 12).toFixed(3);
        const lon = (31.4 + (u - 0.5) * 18).toFixed(3);
        read.textContent = `LAT ${lat}°N   LON ${lon}°E`;
      }
      setOn(true);
    }
    function onLeave() {
      setOn(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [frameRef]);

  return (
    <div ref={elRef} className={"reticle " + (on ? "on" : "")}>
      <svg viewBox="0 0 80 80" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1">
        <circle cx="40" cy="40" r="22" />
        <circle cx="40" cy="40" r="2" fill="rgba(255,255,255,0.9)" stroke="none" />
        <line x1="40" y1="6" x2="40" y2="20" />
        <line x1="40" y1="60" x2="40" y2="74" />
        <line x1="6" y1="40" x2="20" y2="40" />
        <line x1="60" y1="40" x2="74" y2="40" />
        <path d="M14 14 L22 22" />
        <path d="M66 14 L58 22" />
        <path d="M14 66 L22 58" />
        <path d="M66 66 L58 58" />
      </svg>
      <div ref={readRef} className="read">
        LAT 8.500°N   LON 31.400°E
      </div>
    </div>
  );
}
