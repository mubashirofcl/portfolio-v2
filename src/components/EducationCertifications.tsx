"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function EducationCertifications() {
  return (
    <section id="education" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-20 text-left">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            06 / ACADEMICS & CREDENTIALS
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-4 select-none">
            Education
          </h2>
        </div>

        {/* Side by Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1 — Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 flex flex-col justify-between min-h-[260px] group transition-all duration-300 hover:border-[#e8e8e8]/20 hover:bg-[#141414]"
          >
            <div>
              <span className="text-[9px] font-sans font-extrabold tracking-widest text-[#888888] uppercase block mb-3 select-none">
                Academic Degree
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#f0f0f0] tracking-wide mb-2 select-all">
                Bachelor of Computer Applications (BCA)
              </h3>
              <span className="text-xs sm:text-sm font-sans font-medium text-[#888888] tracking-wide block mb-6 select-all">
                University of Calicut &middot; Aug 2022 – May 2025
              </span>
            </div>

            <div className="border-t border-[#1f1f1f] pt-6 flex flex-wrap gap-x-8 gap-y-3 select-all">
              <div className="flex flex-col">
                <span className="text-[9px] font-sans font-black tracking-widest text-[#888888]/40 uppercase mb-0.5 select-none">
                  CGPA Metric
                </span>
                <span className="text-sm font-sans font-bold text-accent-highlight">
                  6.83 (B+)
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-sans font-black tracking-widest text-[#888888]/40 uppercase mb-0.5 select-none">
                  Credit Systems
                </span>
                <span className="text-sm font-sans font-bold text-[#e8e8e8]">
                  Total Credits: 140 (NSS — 4 Credits)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Certification */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 flex flex-col justify-between min-h-[260px] group transition-all duration-300 hover:border-[#e8e8e8]/20 hover:bg-[#141414]"
          >
            <div>
              <span className="text-[9px] font-sans font-extrabold tracking-widest text-[#888888] uppercase block mb-3 select-none">
                Professional Certification
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#f0f0f0] tracking-wide mb-2 select-all">
                Foundations of Coding Full-Stack
              </h3>
              <span className="text-xs sm:text-sm font-sans font-medium text-[#888888] tracking-wide block mb-6 select-all">
                Microsoft &middot; Coursera &middot; April 2026
              </span>
            </div>

            <div className="border-t border-[#1f1f1f] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col select-all">
                <span className="text-[9px] font-sans font-black tracking-widest text-[#888888]/40 uppercase mb-0.5 select-none">
                  Credential ID
                </span>
                <span className="text-xs font-mono font-medium text-[#888888]">
                  RYXAW17HITHH
                </span>
              </div>

              <a
                href="https://coursera.org/verify/RYXAW17HITHH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#0a0a0a] bg-[#e8e8e8] px-4 py-2.5 rounded-xl transition-all duration-300 hover:bg-accent-highlight hover:text-[#0a0a0a] select-none"
              >
                Verify Link <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
