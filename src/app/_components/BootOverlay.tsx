"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "» tsukibase.boot v4.12.0",
  "» handshake → DEEP-SPACE-NET ............ OK",
  "» auth → key 0xTSK-月-2026 ................ OK",
  "» calibrating optical array ............... OK",
  "» locking on 35.6764°N 139.6500°E .......... OK",
  "» streaming live feed ...................... ▮▮▮▮▮",
  "» transmission established. stand by.",
];

export default function BootOverlay({
  active,
  onDone,
}: {
  active: boolean;
  onDone: () => void;
}) {
  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState(0);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!active) {
      setShown(0);
      setProgress(0);
      return;
    }
    setShown(0);
    setProgress(0);
    let i = 0;
    const ids: ReturnType<typeof setTimeout>[] = [];
    function next() {
      i++;
      setShown(i);
      if (i < BOOT_LINES.length) {
        ids.push(setTimeout(next, 280 + Math.random() * 180));
      } else {
        ids.push(setTimeout(() => setProgress(100), 80));
      }
    }
    ids.push(setTimeout(next, 120));
    return () => ids.forEach(clearTimeout);
  }, [active]);

  function dismiss() {
    onDoneRef.current();
  }

  return (
    <div className={"boot " + (active ? "on" : "")} onClick={dismiss}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="ttl">▸ ENTER BASE · INITIALIZING</div>
        <pre>
          {BOOT_LINES.slice(0, shown).map((l, i) => (
            <div key={i}>
              {l.includes("OK") ? (
                <>
                  <b>{l.replace(/ ?OK$/, "")}</b>
                  <span style={{ color: "#6ad8a8" }}> OK</span>
                </>
              ) : (
                l
              )}
            </div>
          ))}
        </pre>
        <div className="bar-row">
          <span>LINK</span>
          <div className="bar">
            <i style={{ width: progress + "%" }} />
          </div>
          <span>{progress}%</span>
        </div>
        {progress === 100 && (
          <button className="boot-close" onClick={dismiss}>
            CLOSE · 閉じる
          </button>
        )}
      </div>
    </div>
  );
}
