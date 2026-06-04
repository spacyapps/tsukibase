"use client";

import { useEffect, useState } from "react";
import Starfield from "../_components/Starfield";
import ViewportRedirect from "@/components/ViewportRedirect";
import "./mobile.css";

function useJSTTime() {
  function fmt() {
    const d = new Date();
    const jst = new Date(d.getTime() + (d.getTimezoneOffset() + 540) * 60000);
    return `${jst.getHours()}:${String(jst.getMinutes()).padStart(2, "0")} JST`;
  }
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function MobilePage() {
  const time = useJSTTime();

  useEffect(() => {
    document.body.classList.add("mobile-page");
    return () => document.body.classList.remove("mobile-page");
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100svh", background: "#05060a", overflow: "hidden" }}>
      {/* Send genuinely wide viewports back to the desktop stage. */}
      <ViewportRedirect to="/" query="(min-width: 1025px)" />
      <div
        className="mobile-sky"
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#05060a" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/scene.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "calc(70% + 75px) center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)",
            pointerEvents: "none",
          }}
        />
        <Starfield density={0.61} />
      </div>

      <main
        style={{
          position: "relative",
          minHeight: "100svh",
          paddingTop: "clamp(80px, 18vh, 180px)",
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          className="mobile-notif"
          role="status"
          aria-live="polite"
          style={{
            width: "100%",
            maxWidth: 380,
            borderRadius: 22,
            background: "rgba(22, 24, 30, 0.72)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(22px) saturate(140%)",
            WebkitBackdropFilter: "blur(22px) saturate(140%)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            padding: "12px 14px 14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 10 }}>
            <div
              aria-hidden="true"
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "radial-gradient(120% 80% at 30% 30%, #1a1d26 0%, #0b0c12 100%)",
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                flexShrink: 0,
              } as React.CSSProperties}
            >
              <svg viewBox="0 0 24 24" width="22" height="22">
                <defs>
                  <radialGradient id="moon-grad" cx="35%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#f4f5f7" />
                    <stop offset="100%" stopColor="#9ea2ab" />
                  </radialGradient>
                </defs>
                <circle cx="12" cy="12" r="9" fill="url(#moon-grad)" />
                <circle cx="15.5" cy="12" r="8" fill="#0b0c12" />
              </svg>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", color: "#f5f5f3" }}>
                TSUKIBASE
              </span>
              <span style={{ fontFamily: "var(--jp)", fontSize: 11, letterSpacing: "0.18em", color: "#ff4a1c" }}>
                月基地
              </span>
            </div>

            <span
              suppressHydrationWarning
              style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 500, color: "rgba(245,245,243,0.42)", letterSpacing: "0.02em", flexShrink: 0 }}
            >
              {time}
            </span>
          </div>

          <div style={{ padding: "2px 2px 0" }}>
            <div
              className="mobile-title"
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "#f5f5f3", letterSpacing: "-0.005em", marginBottom: 4 }}
            >
              Live feed active
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.42, color: "rgba(245,245,243,0.62)" }}>
              Monitoring Japan from the Sea of Tranquillity. 384,400&nbsp;km away.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
