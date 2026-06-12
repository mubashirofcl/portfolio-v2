"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code2, Briefcase, Building2, Globe } from "lucide-react";

export default function AboutMe() {
  const infoCards = [
    { 
      label: "Location", 
      value: "Wayanad, Kerala", 
      icon: <MapPin className="w-4 h-4 text-accent-highlight" /> 
    },
    { 
      label: "Degree", 
      value: "BCA — University of Calicut", 
      icon: <GraduationCap className="w-4 h-4 text-accent-highlight" /> 
    },
    { 
      label: "Focus", 
      value: "Full Stack MERN", 
      icon: <Code2 className="w-4 h-4 text-accent-highlight" /> 
    },
    { 
      label: "Freelance", 
      value: "Available", 
      icon: <Briefcase className="w-4 h-4 text-accent-highlight" /> 
    },
    { 
      label: "Studio", 
      value: "Orvyn Labs", 
      icon: <Building2 className="w-4 h-4 text-accent-highlight" /> 
    },
    { 
      label: "Portfolio", 
      value: "mubashiir.in", 
      icon: <Globe className="w-4 h-4 text-accent-highlight" /> 
    },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/mubashirofcl", handle: "github.com/mubashirofcl" },
    { name: "LinkedIn", url: "https://linkedin.com/in/mubashirpp", handle: "linkedin.com/in/mubashirpp" },
    { name: "Email", url: "mailto:mubashirppofcl@gmail.com", handle: "mubashirppofcl@gmail.com" },
  ];

  return (
    <section id="about" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-16">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            01 / PROFILE
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase select-none">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Narrative text blocks (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base text-[#888888] font-sans font-normal leading-relaxed text-left"
          >
            <p className="text-[#f0f0f0] font-medium text-base sm:text-lg">
              Hi, I&apos;m Mubashir Palapadiyan! I&apos;m a passionate web developer based in Wayanad, Kerala, specializing in building complete, user-friendly applications.
            </p>
            <p>
              Through my studio, Orvyn Labs, I partner with clients to bring their ideas to life. I handle everything from designing the initial interface to launching the final product on reliable servers. My goal is to create digital experiences that look great and work flawlessly behind the scenes.
            </p>
            <p>
              Whether you need a sleek business website or a complex e-commerce platform, I focus on writing clean code and delivering solutions that truly help your business grow.
            </p>
            
            <div className="mt-2">
              <a href="/about" className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-accent-highlight hover:text-[#f0f0f0] transition-colors">
                Full story →
              </a>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap gap-4 mt-8 select-none">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#1f1f1f] rounded-xl px-4 py-2.5 bg-[#111111] text-xs font-semibold text-[#888888] tracking-wider transition-all duration-300 hover:border-accent-highlight hover:text-[#ffffff] hover:bg-[#141414]"
                >
                  <span className="text-accent-highlight">✦</span>
                  <span className="text-[#f0f0f0]">{link.name}:</span>
                  <span className="opacity-75">{link.handle}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: Mini Info Cards 2x3 Grid (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
          >
            {infoCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-center min-h-[90px] group transition-all duration-300 hover:border-[#e8e8e8]/20 hover:bg-[#141414]"
              >
                <div className="flex items-center gap-2 mb-1.5 select-none">
                  {card.icon}
                  <span className="text-xs text-[#888888] font-sans font-medium uppercase tracking-wider block">
                    {card.label}
                  </span>
                </div>
                <span className="text-sm font-sans font-semibold text-[#f0f0f0] tracking-wide select-all">
                  {card.value}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
