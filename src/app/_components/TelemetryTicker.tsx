"use client";

import { useEffect, useRef, useState } from "react";
import { useJSTClock } from "./hooks";

const TELEMETRY_POOL = [
  { type: "ok",   t: "DEEP-SPACE LINK NOMINAL · 384,400 KM" },
  { type: "ok",   t: "EARTH ALBEDO · 0.367 · STABLE" },
  { type: "info", t: "OPTICAL ARRAY TRACKING HONSHU 鳥居" },
  { type: "acc",  t: "UPLINK → HONSHU NODE　信号良好" },
  { type: "info", t: "REGOLITH TEMP -173.4°C ▾ 0.2" },
  { type: "ok",   t: "PHOTOVOLTAIC ARRAY @ 97.2%" },
  { type: "warn", t: "MICROMETEOROID PROX · 412 KM ▾" },
  { type: "info", t: "TORII LANTERN · LUMINANCE 88 CD" },
  { type: "acc",  t: "FEED → tsukibase://obs/12-83-Δ" },
  { type: "ok",   t: "GYRO LOCK · ROLL 0.001° PITCH 0.003°" },
  { type: "info", t: "TRANQUILLITATIS BASIN · NIGHT-2" },
  { type: "warn", t: "SOLAR WIND 412 KM/S · MILD" },
  { type: "ok",   t: "CRYO COOLANT LOOP A · -195°C" },
  { type: "acc",  t: "上り信号 受信良好" },
  { type: "info", t: "STAR-TRACKER LOCK · CASSIOPEIA" },
  { type: "ok",   t: "BUS VOLTAGE 28.04 V · NOMINAL" },
];

interface LogLine {
  id: number;
  type: string;
  t: string;
  ts: string;
}

export default function TelemetryTicker({ intervalMs = 1400 }: { intervalMs?: number }) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const { jstString } = useJSTClock();
  const jstRef = useRef(jstString);
  jstRef.current = jstString;
  const counter = useRef(0);

  useEffect(() => {
    function push() {
      const pick = TELEMETRY_POOL[Math.floor(Math.random() * TELEMETRY_POOL.length)];
      setLines((prev) => {
        const next = [...prev, { id: ++counter.current, ...pick, ts: jstRef.current }];
        return next.slice(-4);
      });
    }
    push(); push(); push();
    const id = setInterval(push, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div className="telemetry">
      <div className="head">
        <span>OBSERVATION LOG</span>
        <span className="live">
          <span className="pip"></span>LIVE
        </span>
      </div>
      <div className="lines">
        {lines.map((ln) => (
          <div key={ln.id} className="ln">
            <span className="t">[{ln.ts}]</span>
            <span className={ln.type}>{ln.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
