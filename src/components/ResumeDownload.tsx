"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";

export default function ResumeDownload() {
  return (
    <section id="resume" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-4xl mx-auto text-center relative flex flex-col items-center">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent-highlight/[0.01] filter blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          {/* Subtitle tag */}
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-4 select-none">
            08 / CURRICULUM
          </span>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-6">
            Want the full picture?
          </h2>

          {/* Supporting short text */}
          <p className="text-sm sm:text-base text-[#888888] font-sans font-normal leading-relaxed max-w-xl mx-auto mb-10 select-all">
            View or download my updated resume — skills, projects, experience and architecture thinking.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 select-none">
            {/* Live View Button */}
            <a
              href="/resume/Resume_MERN_Stack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#0a0a0a] bg-[#e8e8e8] px-8 py-4 rounded-xl border border-[#e8e8e8] transition-all duration-300 hover:bg-accent-highlight hover:border-accent-highlight hover:text-[#0a0a0a] shadow-[0_4px_14px_rgba(255,255,255,0.05)] w-full sm:w-auto justify-center"
            >
              <Eye size={14} />
              Live View PDF
            </a>

            {/* Download Button */}
            <a
              href="/resume/Resume_MERN_Stack.pdf"
              download="Mubashir_PP_Resume.pdf"
              className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#e8e8e8] border border-[#1f1f1f] bg-[#0a0a0a] px-8 py-4 rounded-xl transition-all duration-300 hover:border-accent-highlight hover:text-[#ffffff] w-full sm:w-auto justify-center"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
