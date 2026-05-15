"use client";

import { useEffect, useState } from "react";

export function useJSTClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const jst = new Date(now.getTime() + (now.getTimezoneOffset() + 9 * 60) * 60000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: now,
    jstString: `${pad(jst.getHours())}:${pad(jst.getMinutes())}:${pad(jst.getSeconds())}`,
    jstDate: `${jst.getFullYear()}.${pad(jst.getMonth() + 1)}.${pad(jst.getDate())}`,
  };
}

const LUNAR_CYCLE = 29.530588853;
const KNOWN_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14, 0);

export function moonPhaseFraction(date = new Date()): number {
  const elapsed = (date.getTime() - KNOWN_NEW_MOON_MS) / 86400000;
  const phase = ((elapsed % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
  return phase / LUNAR_CYCLE;
}

export function moonPhaseName(f: number): string {
  if (f < 0.03 || f > 0.97) return "NEW MOON";
  if (f < 0.22) return "WAXING CRESCENT";
  if (f < 0.28) return "FIRST QUARTER";
  if (f < 0.47) return "WAXING GIBBOUS";
  if (f < 0.53) return "FULL MOON";
  if (f < 0.72) return "WANING GIBBOUS";
  if (f < 0.78) return "LAST QUARTER";
  return "WANING CRESCENT";
}

export function useTypewriter(
  text: string,
  { speed = 70, startDelay = 200 }: { speed?: number; startDelay?: number } = {}
) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let cancelled = false;
    const start = setTimeout(function tick() {
      if (cancelled) return;
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i++;
        setTimeout(tick, speed + (Math.random() * 50 - 25));
      } else {
        setDone(true);
      }
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { text: out, done };
}
