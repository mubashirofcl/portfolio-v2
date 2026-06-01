"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CursorRevealBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const grid = bgRef.current;
      const glow = glowRef.current;
      const code = codeRef.current;
      
      // Use window coordinates to track properly across long scrolls
      if (grid) {
        grid.style.setProperty("--mx", `${e.clientX}px`);
        grid.style.setProperty("--my", `${e.clientY}px`);
      }
      if (glow) {
        glow.style.setProperty("--mx", `${e.clientX}px`);
        glow.style.setProperty("--my", `${e.clientY}px`);
      }
      if (code) {
        code.style.setProperty("--mx", `${e.clientX}px`);
        code.style.setProperty("--my", `${e.clientY}px`);
      }
    };

    const handleMouseLeave = () => {
      const grid = bgRef.current;
      const glow = glowRef.current;
      const code = codeRef.current;
      if (grid) {
        grid.style.setProperty("--mx", "-9999px");
        grid.style.setProperty("--my", "-9999px");
      }
      if (glow) {
        glow.style.setProperty("--mx", "-9999px");
        glow.style.setProperty("--my", "-9999px");
      }
      if (code) {
        code.style.setProperty("--mx", "-9999px");
        code.style.setProperty("--my", "-9999px");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      
      {/* Layer 1: Subtle lime-green ambient glow following the mouse */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-15"
        style={{
          "--mx": "-9999px",
          "--my": "-9999px",
          background: "radial-gradient(circle 320px at var(--mx) var(--my), rgba(200, 245, 66, 0.01) 0%, rgba(200, 245, 66, 0.002) 50%, rgba(0, 0, 0, 0) 100%)",
        } as React.CSSProperties}
      />

      {/* Layer 2: Glowing neon-line coding image revealed in a circle around the mouse */}
      <div
        ref={codeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-[0.07] mix-blend-lighten"
        style={{
          "--mx": "-9999px",
          "--my": "-9999px",
          backgroundImage: "url('/coding_reveal.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMaskImage: "radial-gradient(circle 240px at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 60px, rgba(255,255,255,0.5) 120px, rgba(255,255,255,0.2) 180px, rgba(255,255,255,0) 240px)",
          maskImage: "radial-gradient(circle 240px at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 60px, rgba(255,255,255,0.5) 120px, rgba(255,255,255,0.2) 180px, rgba(255,255,255,0) 240px)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat"
        } as React.CSSProperties}
      />

      {/* Layer 3: Holographic fine grid that is revealed in a circle around the mouse */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-[0.05]"
        style={{
          "--mx": "-9999px",
          "--my": "-9999px",
          backgroundImage: `
            linear-gradient(to right, rgba(200, 245, 66, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 245, 66, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          WebkitMaskImage: "radial-gradient(circle 220px at var(--mx) var(--my), rgba(255,255,255,1) 0%, rgba(255,255,255,0.75) 25%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 100%)",
          maskImage: "radial-gradient(circle 220px at var(--mx) var(--my), rgba(255,255,255,1) 0%, rgba(255,255,255,0.75) 25%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 100%)",
        } as React.CSSProperties}
      />

    </div>
  );
}
