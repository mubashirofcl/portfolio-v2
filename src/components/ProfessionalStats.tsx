"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  number: string;
  label: string;
}

export default function ProfessionalStats() {
  const stats: StatItem[] = [
    { number: "3+", label: "Full Stack Projects" },
    { number: "10+", label: "Technologies" },
    { number: "1", label: "Live Client Deployment" },
    { number: "AWS", label: "Production Systems" },
  ];

  return (
    <section className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 flex flex-col justify-center min-h-[180px] group transition-all duration-300 hover:border-[#e8e8e8]/20 hover:bg-[#141414] hover:shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
            >
              {/* Stat number in display font (Bebas Neue) */}
              <span className="text-6xl sm:text-7xl font-display text-[#f0f0f0] tracking-wider leading-none mb-4 transition-colors duration-300 group-hover:text-white select-all">
                {stat.number}
              </span>
              
              {/* Label in body font (Sora) */}
              <span className="text-xs sm:text-sm font-sans font-medium text-[#888888] tracking-wide leading-relaxed transition-colors duration-300 group-hover:text-[#e8e8e8]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
