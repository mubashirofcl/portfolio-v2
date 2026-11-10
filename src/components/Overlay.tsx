"use client";

import React from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import LinkPreview from "./LinkPreview";

interface OverlayProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function Overlay({ heroRef }: OverlayProps) {
  // Bind useScroll to the exact same shared heroRef target
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Physics-based spring smoothing for overlay transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0001,
  });

  // PHASE 1: Ghost watermark (0.00 - 0.28)
  const opacityP1 = useTransform(
    smoothProgress,
    [0.0, 0.08, 0.2, 0.3],
    [1, 1, 0.8, 0]
  );
  const yP1 = useTransform(smoothProgress, [0.0, 0.3], [0, -40]);

  // PHASE 2: Name intro block (0.24 - 0.62)
  const opacityP2 = useTransform(
    smoothProgress,
    [0.24, 0.36, 0.52, 0.64],
    [0, 1, 1, 0]
  );
  const yP2 = useTransform(smoothProgress, [0.24, 0.64], [50, -50]);

  // PHASE 3: Role statement (0.58 - 0.94)
  const opacityP3 = useTransform(
    smoothProgress,
    [0.58, 0.7, 0.84, 0.96],
    [0, 1, 1, 0]
  );
  const yP3 = useTransform(smoothProgress, [0.58, 0.96], [50, -40]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 font-sans">
      
      {/* Global Navigation */}
      <nav className="absolute top-0 left-0 w-full p-6 sm:p-8 flex justify-end pointer-events-auto z-50">
        <LinkPreview
          title="About"
          link="/about"
          customImage={{
            src: "/photo.jpg",
            alt: "Mubashir Palapadiyan — Biography & Background",
          }}
          previewWidth={300}
          previewHeight={170}
          radius={14}
          placement="bottom"
          align="right"
          textColor="#e8e8e8"
          underlineColor="transparent"
          font={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "var(--font-sora), sans-serif",
          }}
        />
      </nav>

      {/* PHASE 1 - Ghost Watermark */}
      <motion.div
        style={{
          opacity: opacityP1,
          y: yP1,
          willChange: "opacity, transform",
        }}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none px-6 text-center select-none"
      >
        <div
          aria-hidden="true"
          className="text-white/20 sm:text-white/10 tracking-tighter uppercase whitespace-nowrap leading-none select-none"
          style={{
            fontSize: "clamp(3rem, 17vw, 14rem)",
            fontWeight: 900,
          }}
        >
          MUBASHIR.
        </div>
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
          I Build Scalable Full-Stack Systems &amp; AI Apps That Ship
        </span>
        <h1
          className="text-white tracking-tighter leading-none font-extrabold mb-6"
          style={{
            fontSize: "clamp(2rem, 8vw, 9rem)",
            letterSpacing: "-0.04em",
          }}
        >
          MUBASHIR
          PALAPADIYAN
        </h1>
        <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.05em] sm:tracking-[0.1em] text-white/60 uppercase font-medium max-w-xs sm:max-w-none">
          Full Stack MERN Developer &bull; AI Engineering Mentor &bull; Kerala, India &bull; Open to Relocation
        </span>
      </motion.div>

      {/* PHASE 3 - Role Statement & Tech Focus */}
      <motion.div
        style={{
          opacity: opacityP3,
          y: yP3,
          willChange: "opacity, transform",
        }}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none px-6 text-center select-none"
      >
        <h2
          className="text-white leading-[1.1] sm:leading-[1.05] tracking-tight font-bold whitespace-pre-line mb-6"
          style={{
            fontSize: "clamp(1.5rem, 6vw, 6.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Full-Stack Developer &amp;<br />
          AI Engineering Mentor.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md sm:max-w-xl">
          {["React.js & Next.js", "Node.js & Microservices", "PostgreSQL & Prisma", "AWS & Docker", "RAG Pipelines"].map((tech, idx) => (
            <span
              key={idx}
              className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-wider text-[#aaa] bg-[#111111]/80 border border-[#1f1f1f] px-3 py-1.5 rounded-full"
            >
              <span className="text-accent-highlight">✦</span> {tech}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
