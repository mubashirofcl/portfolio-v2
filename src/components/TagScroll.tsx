"use client";

import React from "react";

export default function TagScroll() {
  const trustBadges = [
    "✦ Full Stack MERN & Next.js",
    "✦ AI Engineering & RAG Pipelines",
    "✦ MERN & AI Mentor at HACA",
    "✦ Live Client Platforms (BIG4 & Azura)",
    "✦ Microservices & Distributed Systems",
    "✦ AWS EC2, S3 & Docker CI/CD",
    "✦ MongoDB Atlas & PostgreSQL Prisma",
    "✦ Open to Relocation",
  ];

  // Repeat badges multiple times to ensure a seamless infinite scrolling effect on all viewport sizes
  const items = [...trustBadges, ...trustBadges, ...trustBadges, ...trustBadges];

  return (
    <section className="bg-[#111111] py-6 overflow-hidden flex items-center border-y border-[#1f1f1f] select-none relative z-20">
      <div className="flex overflow-x-hidden w-full no-scrollbar relative">
        <div className="animate-marquee-left flex gap-6 whitespace-nowrap">
          {items.map((badge, idx) => (
            <div
              key={idx}
              className="text-[#e8e8e8] text-xs sm:text-sm font-sans tracking-wider border border-[#1f1f1f] rounded-full px-6 py-2.5 bg-[#0a0a0a]/50 backdrop-blur-sm transition-all duration-300 hover:border-[#e8e8e8]/30 hover:text-[#ffffff]"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
