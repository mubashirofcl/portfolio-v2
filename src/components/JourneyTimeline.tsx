"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  details: string[];
}

export default function JourneyTimeline() {
  const experiences: ExperienceItem[] = [
    {
      role: "MERN Stack Developer Trainee",
      company: "Brototype — Industry-grade Full-Stack Training Program",
      duration: "Jan 2024 – Present | Kerala",
      details: [
        "Production-focused MERN stack training with real-world architecture standards",
        "Built and deployed 3+ full-stack projects covering auth, payments, and cloud infrastructure",
        "Expertise developed: Service/Repository pattern, CI/CD, AWS deployment, scalable MongoDB schemas",
      ],
    },
    {
      role: "Freelance Web Developer",
      company: "Orvyn Labs (Self-Founded)",
      duration: "Jan 2024 – Present",
      details: [
        "Founded freelance development practice handling full end-to-end web solutions",
        "Delivered Azura Resorts (azuraresorts.in) as a live production project",
        "Manages client requirements, UI/UX, development, and deployment independently",
      ],
    },
  ];

  return (
    <section id="experience" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-left">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            04 / CHRONOLOGY
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-4 select-none">
            Experience
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-sans font-normal max-w-xl">
            My professional journey.
          </p>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-[#1f1f1f] ml-2 md:ml-48 pl-6 md:pl-12 flex flex-col gap-16">
          
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              className="relative group text-left"
            >
              {/* Timeline Dot Marker */}
              <div className="absolute -left-[32px] md:-left-[56px] top-1.5 w-[16px] h-[16px] rounded-full bg-[#0a0a0a] border-2 border-[#1f1f1f] flex items-center justify-center transition-all duration-300 group-hover:border-accent-highlight">
                <div className="w-1.5 h-1.5 rounded-full bg-[#888888] transition-colors duration-300 group-hover:bg-accent-highlight" />
              </div>

              {/* Date Column (Absolutely positioned on desktop on the left side of the vertical timeline line) */}
              <div className="md:absolute md:right-[calc(100%+64px)] md:top-1.5 md:text-right mb-3 md:mb-0 select-none whitespace-nowrap">
                <span className="text-xs font-sans font-semibold tracking-wider text-[#888888] group-hover:text-accent-highlight transition-colors duration-300">
                  {exp.duration}
                </span>
              </div>

              {/* Content block */}
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 transition-all duration-300 hover:border-[#e8e8e8]/20 hover:bg-[#141414] hover:shadow-[0_8px_30px_rgb(0,0,0,0.8)]">
                {/* Role Title */}
                <h3 className="text-lg sm:text-xl font-sans font-bold text-[#f0f0f0] tracking-wide mb-1.5 select-all">
                  {exp.role}
                </h3>
                
                {/* Company Label */}
                <span className="text-xs sm:text-sm font-sans font-medium text-[#888888] tracking-wide block mb-6 select-all">
                  {exp.company}
                </span>

                {/* Details list */}
                <ul className="flex flex-col gap-3 font-sans text-xs sm:text-sm text-[#888888] leading-relaxed">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <span className="text-accent-highlight mt-1 select-none text-[10px]">✦</span>
                      <span className="group-hover:text-[#e8e8e8]/95 transition-colors select-all">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
