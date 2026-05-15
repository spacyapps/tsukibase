"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Starfield from "./_components/Starfield";
import Reticle from "./_components/Reticle";
import CommPings from "./_components/CommPings";
import TelemetryTicker from "./_components/TelemetryTicker";
import BootOverlay from "./_components/BootOverlay";
import PhaseGlyph from "./_components/PhaseGlyph";
import {
  useJSTClock,
  useTypewriter,
  moonPhaseFraction,
  moonPhaseName,
} from "./_components/hooks";

export default function Home() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [booting, setBooting] = useState(false);
  const { jstString, jstDate, date: now } = useJSTClock();

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const f = frameRef.current;
      if (!f) return;
      const r = f.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      f.style.setProperty("--px", px.toFixed(3));
      f.style.setProperty("--py", py.toFixed(3));
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const tw = useTypewriter("ようこそ、月\n基地へ", { speed: 130, startDelay: 500 });
  const phaseFrac = useMemo(() => moonPhaseFraction(now), [now]);
  const phaseStr = useMemo(() => moonPhaseName(phaseFrac), [phaseFrac]);

  const [solar, setSolar] = useState(97.2);
  useEffect(() => {
    const id = setInterval(() => {
      setSolar((v) => {
        const next = v + (Math.random() - 0.5) * 0.6;
        return Math.max(94.5, Math.min(99.4, next));
      });
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const [signalLevel, setSignalLevel] = useState(4);
  useEffect(() => {
    const id = setInterval(() => {
      setSignalLevel(3 + Math.floor(Math.random() * 2));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="stage">
      <div className="frame" ref={frameRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src="/scene.png" alt="" />

        <div className="knockout" aria-hidden="true">
          <div className="ko-top" />
          <div className="ko-top-fade" />
          <div className="ko-hero" />
          <div className="ko-bot" />
          <div className="ko-bot-fade" />
        </div>

        <Starfield density={1} />
        <div className="lantern" />
        <CommPings intervalMs={2200} />

        <header className="topbar">
          <div className="brand">
            <span className="word">TSUKIBASE</span>
            <span className="kanji">月基地</span>
          </div>
          <nav className="nav">
            <a href="#status" data-en="BASE STATUS" data-jp="基地状況"></a>
            <a href="#earth" data-en="EARTH VIEW" data-jp="地球眺望"></a>
            <a href="#log" data-en="LOG" data-jp="記録"></a>
            <a href="#mission" data-en="MISSION" data-jp="使命">
              <span className="dot"></span>
            </a>
          </nav>
        </header>

        <section className="hero">
          <div className="eyebrow">
            <span className="pip" /> LIVE · SEA OF TRANQUILLITY · 静の海
          </div>
          <h1>
            {tw.text}
            {!tw.done && <span className="caret" />}
          </h1>
          <p className="sub">Welcome to Tsukibase · Lunar Observation Post</p>
          <p className="desc">
            Monitoring Japan from the Sea of Tranquillity.
            <br />
            Live feed active · {(384400).toLocaleString()} km away.
          </p>
          <div className="coords">
            <span>OBS <b>8.500°N</b></span>
            <span>LON <b>31.400°E</b></span>
            <span>JST <b suppressHydrationWarning>{jstString}</b></span>
            <span>DATE <b suppressHydrationWarning>{jstDate}</b></span>
          </div>
          <button
            className="cta"
            onClick={(e) => {
              e.preventDefault();
              setBooting(true);
            }}
          >
            <span>ENTER BASE</span>
            <span className="jp">入基地</span>
          </button>
          <div className="signal-row">
            <span>UPLINK</span>
            <div className="signal-bars">
              {[1, 2, 3, 4].map((i) => (
                <i key={i} className={i <= signalLevel ? "on" : ""} />
              ))}
            </div>
            <span>· {signalLevel === 4 ? "EXCELLENT" : "GOOD"}</span>
          </div>
        </section>

        <TelemetryTicker intervalMs={1500} />

        <footer className="statusbar">
          <div className="left">
            <span className="group">
              <PhaseGlyph fraction={phaseFrac} />
              LUNAR CYCLE: <b>{phaseStr}</b>
            </span>
          </div>
          <div className="right">
            <span className="group">
              FEED: <b suppressHydrationWarning>{jstString} JST</b>
            </span>
            <span className="sep" />
            <span className="group">
              TEMP: <b>-173°C</b>
            </span>
            <span className="sep" />
            <span className="group solar">
              SOLAR ARRAY:
              <div className="bar">
                <i style={{ width: `${(solar - 90) / 10 * 100}%` }} />
              </div>
              <b>{solar.toFixed(1)}%</b>
            </span>
          </div>
        </footer>

        <Reticle frameRef={frameRef} />
        <BootOverlay active={booting} onDone={() => setBooting(false)} />
      </div>
    </div>
  );
}
