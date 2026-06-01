"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function QuoteReveal() {
  return (
    <section className="relative z-20 bg-[#0d0d0d] py-32 px-6 sm:px-12 lg:px-24 border-b border-white/5 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        
        {/* Subtle horizontal side lines on top */}
        <div className="flex items-center justify-center gap-4 mb-10 select-none opacity-40">
          <div className="h-[1px] w-8 sm:w-12 bg-white" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] text-white uppercase font-extrabold">
            PHILOSOPHY
          </span>
          <div className="h-[1px] w-8 sm:w-12 bg-white" />
        </div>

        <ScrollReveal
          baseOpacity={0.08}
          enableBlur
          baseRotation={1.5}
          blurStrength={6}
        >
          When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! When he ate a soup made out of a poisonous mushroom? No! A man dies when he is forgotten!
        </ScrollReveal>
        
      </div>
    </section>
  );
}
