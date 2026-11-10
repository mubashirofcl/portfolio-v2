"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye, FileText, CheckCircle2 } from "lucide-react";

interface ResumeVariant {
  id: string;
  role: string;
  tagline: string;
  filename: string;
  downloadName: string;
  skills: string[];
}

export default function ResumeDownload() {
  const resumeVariants: ResumeVariant[] = [
    {
      id: "fullstack",
      role: "Full Stack Developer",
      tagline: "MERN Stack, Next.js, Microservices, RAG Pipelines & Cloud Deployment",
      filename: "/resume/Resume_MERN_Stack.pdf",
      downloadName: "Mubashir_PP_Full_Stack_Resume.pdf",
      skills: ["React.js", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "Docker", "AWS", "RAG Pipelines"],
    },
    {
      id: "backend",
      role: "Backend Developer",
      tagline: "Node.js, Express, Microservices Architecture, RabbitMQ, Docker & AWS",
      filename: "/resume/Resume_Backend_Developer.pdf",
      downloadName: "Mubashir_PP_Backend_Developer_Resume.pdf",
      skills: ["Node.js", "Express.js", "JWT Token Rotation", "MongoDB Aggregations", "Prisma ORM", "Microservices", "EC2 CI/CD"],
    },
    {
      id: "frontend",
      role: "Frontend Developer",
      tagline: "React.js, Next.js, TanStack Query, Redux Toolkit, Tailwind CSS & Framer Motion",
      filename: "/resume/Resume_Frontend_Developer.pdf",
      downloadName: "Mubashir_PP_Frontend_Developer_Resume.pdf",
      skills: ["React.js", "Next.js 16", "TanStack Query", "Redux Toolkit", "Framer Motion", "Tailwind CSS", "Vercel"],
    },
    {
      id: "mentor",
      role: "AI Mentor cum Developer",
      tagline: "HACA Mentor, Full-Stack Curricula, RAG Architecture & Evaluation Labs",
      filename: "/resume/Resume_AI_Mentor_Developer.pdf",
      downloadName: "Mubashir_PP_AI_Mentor_Developer_Resume.pdf",
      skills: ["AI Engineering", "RAG Pipelines", "Gemini API", "Groq Llama 3.3", "Vector Search", "MERN Mentoring"],
    },
  ];

  const [activeVariant, setActiveVariant] = useState<ResumeVariant>(resumeVariants[0]);

  return (
    <section id="resume" className="bg-transparent py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-5xl mx-auto text-center relative flex flex-col items-center">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent-highlight/[0.015] filter blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          {/* Subtitle tag */}
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-4 select-none">
            08 / CURRICULUM VITAE
          </span>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-6">
            Tailored Resumes
          </h2>

          {/* Supporting short text */}
          <p className="text-sm sm:text-base text-[#888888] font-sans font-normal leading-relaxed max-w-xl mx-auto mb-10 select-all">
            Select a tailored profile below to review verified production achievements, architectural decisions, and credentials targeted to specific engineering requirements.
          </p>

          {/* Variant Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 w-full max-w-3xl mx-auto select-none">
            {resumeVariants.map((variant) => {
              const isSelected = activeVariant.id === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariant(variant)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#141414] border-accent-highlight shadow-[0_0_20px_rgba(83,79,255,0.2)]"
                      : "bg-[#111111] border-[#1f1f1f] hover:border-[#333] hover:bg-[#141414]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FileText size={16} className={isSelected ? "text-accent-highlight" : "text-[#666]"} />
                    {isSelected && <CheckCircle2 size={14} className="text-accent-highlight" />}
                  </div>
                  <span className={`text-xs font-sans font-bold tracking-wide ${isSelected ? "text-white" : "text-[#888]"}`}>
                    {variant.role}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Variant Preview Card */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-10 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 pb-5 border-b border-[#1f1f1f]">
              <div>
                <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-accent-highlight block mb-1">
                  Active Document Target
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-wide">
                  Mubashir PP — {activeVariant.role}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#666] bg-[#0a0a0a] px-3 py-1 rounded-md border border-[#1f1f1f]">
                PDF Document &middot; 2026
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#888] font-sans leading-relaxed mb-6">
              {activeVariant.tagline}
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {activeVariant.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] font-sans font-medium text-[#aaa] bg-[#0a0a0a] border border-[#1f1f1f] px-2.5 py-1 rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 select-none">
              {/* Live View Button */}
              <a
                href={activeVariant.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#0a0a0a] bg-[#e8e8e8] px-6 py-3.5 rounded-xl border border-[#e8e8e8] transition-all duration-300 hover:bg-accent-highlight hover:border-accent-highlight hover:text-white w-full sm:w-auto justify-center"
              >
                <Eye size={14} />
                Live View PDF
              </a>

              {/* Download Button */}
              <a
                href={activeVariant.filename}
                download={activeVariant.downloadName}
                className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#e8e8e8] border border-[#1f1f1f] bg-[#0a0a0a] px-6 py-3.5 rounded-xl transition-all duration-300 hover:border-accent-highlight hover:text-[#ffffff] w-full sm:w-auto justify-center"
              >
                <Download size={14} />
                Download ({activeVariant.role})
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
