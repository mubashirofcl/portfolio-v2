"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail } from "lucide-react";

export default function AboutContent() {
  const [imgError, setImgError] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skills = [
    "React", "Next.js", "Node.js", "MongoDB", "Docker", "AWS", "Tailwind", "JWT", "Razorpay", "Gemini API"
  ];

  return (
    <div className="flex-1 flex items-center justify-center py-24 px-6 sm:px-12 lg:px-24">
      <motion.div 
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Left Column: Photo */}
        <motion.div variants={fadeInUp} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-sm overflow-hidden flex items-center justify-center bg-[#111111]" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
            {!imgError ? (
              <Image 
                src="/photo.jpg" 
                alt="Mubashir Palapadiyan" 
                fill 
                className="object-cover"
                onError={() => setImgError(true)}
                priority
              />
            ) : (
              <div className="text-center p-6 flex flex-col items-center justify-center text-[#555]">
                <span className="text-sm">Photo Placeholder</span>
                <span className="text-[10px] mt-2">Add /public/photo.jpg</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Bio */}
        <motion.div variants={fadeInUp} className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            ABOUT ME
          </span>
          <h1 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-2">
            Mubashir Palapadiyan
          </h1>
          <h2 className="text-sm sm:text-base text-[#888888] font-sans font-medium mb-8 uppercase tracking-wide">
            MERN Stack Developer · Wayanad, Kerala
          </h2>

          <div className="space-y-5 text-sm sm:text-base text-[#aaaaaa] font-sans font-light leading-relaxed mb-10 max-w-2xl">
            <p>
              Hi, I&apos;m Mubashir! I am a passionate web developer who loves turning great ideas into fully functioning, beautiful websites. Through my freelance studio, Orvyn Labs, I partner with businesses to build everything from engaging landing pages to complex online stores.
            </p>
            <p>
              My journey started with a Bachelor&apos;s degree in Computer Applications from the University of Calicut, followed by an intensive hands-on training program at Brototype. There, I gained practical experience building secure platforms, integrating payment gateways, and safely launching websites onto the internet.
            </p>
            <p>
              I believe in writing clean code and creating designs that are genuinely easy for people to use. Whether you need to launch a brand new idea or improve an existing platform, I am dedicated to delivering high-quality results. I am currently open to exciting freelance projects and full-time opportunities.
            </p>
          </div>

          {/* Stats Row */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-5 rounded-xl bg-[#111111]/40" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex flex-col">
              <span className="text-2xl font-display text-white mb-1">3+</span>
              <span className="text-[10px] text-[#666] uppercase tracking-wider font-bold">Projects Shipped</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display text-white mb-1">2+</span>
              <span className="text-[10px] text-[#666] uppercase tracking-wider font-bold">Years Building</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display text-white mb-1">10+</span>
              <span className="text-[10px] text-[#666] uppercase tracking-wider font-bold">Tech Stack</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display text-white mb-1">1</span>
              <span className="text-[10px] text-[#666] uppercase tracking-wider font-bold">Live Client</span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center mb-10">
            <Link href="/#projects" className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#0a0a0a] bg-[#e8e8e8] px-6 py-3.5 rounded-xl transition-all duration-300 hover:bg-accent-highlight hover:text-[#0a0a0a]">
              View My Work <ArrowUpRight size={14} />
            </Link>
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#e8e8e8] border border-[#1f1f1f] bg-[#0a0a0a] px-6 py-3.5 rounded-xl transition-all duration-300 hover:border-accent-highlight hover:text-[#ffffff]">
              Download Resume <Download size={14} />
            </Link>
            <Link href="/#contact" className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#e8e8e8] border border-[#1f1f1f] bg-[#0a0a0a] px-6 py-3.5 rounded-xl transition-all duration-300 hover:border-[#444] hover:text-[#ffffff]">
              Get In Touch <Mail size={14} />
            </Link>
          </motion.div>

          {/* Skills Pills */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="text-[10px] font-sans font-medium text-[#888888] border border-[#1f1f1f] bg-[#0a0a0a]/50 px-3 py-1.5 rounded-md select-none">
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
}
