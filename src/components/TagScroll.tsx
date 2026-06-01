"use client";

import React from "react";

export default function TagScroll() {
  const trustBadges = [
    "✦ Full Stack MERN Development",
    "✦ Real Client Deployments",
    "✦ AWS Cloud Architecture",
    "✦ Production-Grade Systems",
    "✦ Freelance Available",
    "✦ CI/CD & Docker Pipelines",
    "✦ Next.js & React Frontend",
    "✦ JWT Auth & RBAC Systems",
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
