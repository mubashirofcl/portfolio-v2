"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
}

function StatCounterCard({ target, suffix, label }: StatItemProps) {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const increment = target / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div
      ref={elementRef}
      className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 flex flex-col justify-center min-h-[180px] group transition-all duration-300 hover:border-accent-highlight/40 hover:bg-[#141414]"
    >
      {/* Animated Counter with Bebas Neue font */}
      <span className="text-6xl sm:text-7xl font-display text-[#f0f0f0] tracking-wider leading-none mb-3 group-hover:text-white transition-colors duration-300 select-all">
        {count.toLocaleString()}
        <span className="text-accent-highlight">{suffix}</span>
      </span>

      {/* Label in Sora font */}
      <span className="text-xs sm:text-sm font-sans font-medium text-[#888888] tracking-wide leading-relaxed group-hover:text-[#e8e8e8] transition-colors duration-300 uppercase">
        {label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const statsList = [
    { target: 3, suffix: "+", label: "Projects Completed" },
    { target: 10, suffix: "+", label: "Technologies Mastered" },
    { target: 1, suffix: "", label: "Live Client Deployment" },
    { target: 1000, suffix: "+", label: "Hours of Development" },
  ];

  return (
    <section className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsList.map((stat, idx) => (
            <StatCounterCard
              key={idx}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
