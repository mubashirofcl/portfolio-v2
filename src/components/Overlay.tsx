"use client";

import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface OverlayProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function Overlay({ heroRef }: OverlayProps) {
  // Bind useScroll to the exact same shared heroRef target
  const { scrollYProgress } = useScroll({
    target: heroRef,
  });

  // PHASE 1: Ghost watermark (0.00 - 0.28)
  const opacityP1 = useTransform(
    scrollYProgress,
    [0.0, 0.1, 0.18, 0.28],
    [1, 1, 1, 0]
  );
  const yP1 = useTransform(scrollYProgress, [0.0, 0.28], [30, -30]);

  // PHASE 2: Name intro block (0.28 - 0.52)
  const opacityP2 = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.44, 0.52],
    [0, 1, 1, 0]
  );
  const yP2 = useTransform(scrollYProgress, [0.28, 0.52], [60, -60]);

  // PHASE 3: Role statement (0.52 - 0.78)
  const opacityP3 = useTransform(
    scrollYProgress,
    [0.52, 0.62, 0.7, 0.78],
    [0, 1, 1, 0]
  );
  const yP3 = useTransform(scrollYProgress, [0.52, 0.78], [60, -60]);

  // PHASE 4: Main headline (0.78 - 1.00)
  const opacityP4 = useTransform(
    scrollYProgress,
    [0.78, 0.88, 0.96, 1.0],
    [0, 1, 1, 0]
  );
  const yP4 = useTransform(scrollYProgress, [0.78, 1.0], [60, -60]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 font-sans">
      {/* PHASE 1 - Ghost Watermark */}
      <motion.div
        style={{
          opacity: opacityP1,
          y: yP1,
          willChange: "opacity, transform",
        }}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none px-6 text-center select-none"
      >
        <h1
          className="text-white/20 sm:text-white/10 tracking-tighter uppercase whitespace-nowrap leading-none select-none"
          style={{
            fontSize: "clamp(3rem, 17vw, 14rem)",
            fontWeight: 900,
          }}
        >
          MUBASHIR.
        </h1>
      </motion.div>

      {/* PHASE 2 - Name Intro Block */}
      <motion.div
        style={{
          opacity: opacityP2,
          y: yP2,
          willChange: "opacity, transform",
        }}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none px-6 text-center select-none"
      >
        <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-accent uppercase font-bold mb-4">
          I Build Scalable Full-Stack Apps
        </span>
        <h2
          className="text-white tracking-tighter leading-none font-extrabold mb-6"
          style={{
            fontSize: "clamp(2rem, 8vw, 9rem)",
            letterSpacing: "-0.04em",
          }}
        >
          MUBASHIR
          PALAPADIYAN
        </h2>
        <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.05em] sm:tracking-[0.1em] text-white/50 uppercase font-medium max-w-xs sm:max-w-none">
          MERN Stack Developer &middot; Cloud Integrations &middot; Kerala, India
        </span>
      </motion.div>

      {/* PHASE 3 - Role Statement */}
      <motion.div
        style={{
          opacity: opacityP3,
          y: yP3,
          willChange: "opacity, transform",
        }}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none px-6 text-center select-none"
      >
        <h2
          className="text-white leading-[1.1] sm:leading-[1.05] tracking-tight font-bold whitespace-pre-line"
          style={{
            fontSize: "clamp(1.4rem, 6vw, 7rem)",
            letterSpacing: "-0.03em",
          }}
        >
          MERN Stack Developer &<br />
          Full-Stack Engineer.
        </h2>
      </motion.div>

      {/* PHASE 4 - Main Headline */}
      <motion.div
        style={{
          opacity: opacityP4,
          y: yP4,
          willChange: "opacity, transform",
        }}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none px-6 text-center select-none"
      >
      </motion.div>
    </div>
  );
}
