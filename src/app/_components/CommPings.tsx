"use client";

import { useEffect, useRef, useState } from "react";

const PING_SITES = [
  { x: 94.0, y: 11.5 },
  { x: 89.5, y: 18.0 },
  { x: 84.8, y: 25.5 },
  { x: 81.6, y: 33.5 },
  { x: 81.3, y: 42.8 },
  { x: 87.1, y: 52.1 },
  { x: 89.0, y: 60.9 },
  { x: 95.6, y: 35.7 },
];

interface PingItem {
  id: number;
  x: number;
  y: number;
}

export default function CommPings({ intervalMs = 1800 }: { intervalMs?: number }) {
  const [items, setItems] = useState<PingItem[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    function spawn() {
      const site = PING_SITES[Math.floor(Math.random() * PING_SITES.length)];
      const id = ++counter.current;
      setItems((prev) => [...prev, { id, ...site }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((p) => p.id !== id));
      }, 1700);
    }
    spawn();
    const id = setInterval(spawn, intervalMs + Math.random() * 400);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div className="pings">
      {items.map((p) => (
        <div key={p.id} className="ping" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
      ))}
    </div>
  );
}
