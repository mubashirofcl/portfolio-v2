"use client";

import React from "react";
import { motion } from "framer-motion";
import DomeGallery from "./DomeGallery";

interface SkillCategory {
  title: string;
  skills: string[];
}

export default function SkillsStack() {
  const categories: SkillCategory[] = [
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux Toolkit", "HTML5 / CSS3"],
    },
    {
      title: "Backend & Database",
      skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Mongoose ODM"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["Docker", "AWS EC2 / S3", "CloudFront CDN", "Nginx", "GitHub Actions", "Vercel"],
    },
  ];

  return (
    <section id="skills" className="bg-[#0a0a0a] py-[100px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Split Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Categorised Technical Index (SEO & Structure) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3 select-none">
              03 / EXPERTISE
            </span>
            <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-6 select-none">
              Tech Stack
            </h2>
            <p className="text-sm sm:text-base text-[#888888] font-sans font-normal max-w-lg mb-10 leading-relaxed select-all">
              A curated index of languages, frameworks, and deployment standards I leverage professionally to deliver production-ready web platforms.
            </p>

            {/* Technical Index List */}
            <div className="space-y-8">
              {categories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border-l border-[#1f1f1f] pl-6 hover:border-accent-highlight transition-colors duration-300"
                >
                  <h3 className="text-xs font-sans font-extrabold tracking-widest text-[#f0f0f0] uppercase mb-3.5 select-none">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] sm:text-xs font-sans text-[#888888] bg-[#111111] border border-[#1f1f1f] px-2.5 py-1 rounded-md hover:text-white hover:border-[#ffffff]/20 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Stunning Interactive 3D Dome Showcase */}
          <div className="lg:col-span-7 w-full relative aspect-square sm:aspect-[4/3] lg:aspect-[16/11] bg-[#111111]/30 rounded-3xl border border-[#1f1f1f]/80 overflow-hidden shadow-2xl group">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-highlight/[0.01] to-[#ffffff]/[0.01] pointer-events-none" />
            
            {/* Visual Instruction Badge */}
            <div className="absolute top-6 right-6 z-10 bg-[#0a0a0a]/80 border border-[#1f1f1f] px-3.5 py-1.5 rounded-full backdrop-blur-md pointer-events-none select-none transition-all duration-500 group-hover:border-accent-highlight/30">
              <span className="text-[9px] tracking-widest font-sans font-bold text-[#888888] uppercase inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-highlight animate-pulse" />
                Drag to explore 3D Sphere
              </span>
            </div>

            {/* Dome Gallery Core Wrapper */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <DomeGallery
                fit={0.8}
                minRadius={600}
                maxVerticalRotationDeg={0}
                segments={34}
                dragDampening={2}
                grayscale={true}
                overlayBlurColor="#0a0a0a"
                imageBorderRadius="24px"
                openedImageBorderRadius="24px"
                openedImageWidth="240px"
                openedImageHeight="240px"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
