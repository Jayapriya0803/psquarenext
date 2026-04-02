"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function MermaidChart({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });

    if (ref.current) {
      ref.current.innerHTML = `<div class="mermaid">${chart}</div>`;
      mermaid.init(undefined, ref.current);
    }
  }, [chart]); // ✅ stable dependency

  return <div ref={ref} style={{ minHeight: "200px" }} />;
}