"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

interface Project {
  title: string;
  badge: string;
  isClientProject?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  stack: string;
  description: string;
  bullets: string[];
  featureTags: string[];
  imageSrc: string;
}

export default function Projects() {
  const projectsList: Project[] = [
    {
      title: "NEXTZEN",
      badge: "Full Stack E-commerce",
      liveUrl: "https://nextzen.mubashiir.in",
      githubUrl: "https://github.com/mubashirofcl",
      stack: "React.js · Node.js · MongoDB · AWS · Docker",
      description: "A complete, high-performance e-commerce platform built to handle seamless shopping experiences. It includes advanced product variations, secure checkout, and an intelligent AI chatbot.",
      bullets: [
        "Secure user logins and dedicated management dashboards for administrators.",
        "Optimized database searches so products load incredibly fast for users.",
        "Hosted on reliable cloud servers ensuring fast image loading and smooth performance."
      ],
      featureTags: ["JWT Auth", "RBAC", "Admin Dashboard", "Razorpay", "Google OAuth", "AWS", "CI/CD", "Chatbot", "Wishlist", "Cart"],
      imageSrc: "/nextzen_mockup.webp",
    },
    {
      title: "AZURA RESORTS",
      badge: "Live Client Project ✦",
      isClientProject: true,
      liveUrl: "https://azuraresorts.in",
      githubUrl: "https://github.com/mubashirofcl",
      stack: "Next.js · Tailwind CSS · Framer Motion · Vercel",
      description: "A premium, beautifully animated website designed for a luxury resort in Wayanad. The goal was to provide visitors with a visually stunning and smooth browsing experience.",
      bullets: [
        "Fluid scrolling and elegant animations that create a premium feel.",
        "Fully responsive design that looks perfect on phones, tablets, and desktops.",
        "Securely launched with a custom domain and fast global hosting."
      ],
      featureTags: ["Client Project", "Next.js", "Framer Motion", "Vercel", "Glassmorphism", "Custom Domain", "SEO"],
      imageSrc: "/azura_mockup.webp",
    },
    {
      title: "QUICKMEDI",
      badge: "Full Stack — Hybrid Architecture",
      githubUrl: "https://github.com/mubashirofcl",
      stack: "React.js · Node.js · Python · MongoDB",
      description: "An innovative platform that helps users find available medicines at nearby pharmacies in real-time by analyzing their medical prescriptions.",
      bullets: [
        "Connects a user-friendly frontend to a custom-built pharmacy data system.",
        "Provides fast, reliable search results to help users get what they need quickly.",
        "Designed with clean, modular code to easily add more pharmacies in the future."
      ],
      featureTags: ["Hybrid Architecture", "Python Backend", "MERN", "Real-time", "Prescription Search"],
      imageSrc: "/quickmedi_mockup.webp",
    },
  ];

  return (
    <section id="projects" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-24 text-left">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            05 / SELECTED WORKS
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-4 select-none">
            Projects
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-sans font-normal max-w-xl">
            Production systems and real deployments.
          </p>
        </div>

        {/* Case Studies Rows (ScrollStack Layout) */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={120}
          baseScale={0.9}
          itemScale={0.03}
          itemStackDistance={35}
          stackPosition="15%"
          scaleEndPosition="5%"
        >
          {projectsList.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <ScrollStackItem
                key={idx}
                itemClassName="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center p-5 sm:p-10 lg:p-12 text-left"
              >
                
                {/* Visual Column Order - Alternating on desktop */}
                <div className={`lg:col-span-7 w-full relative ${!isEven ? "lg:order-last" : ""}`}>
                  {/* Subtle blur background backing */}
                  <div className="absolute inset-0 bg-[#c8f542]/[0.01] filter blur-[80px] pointer-events-none rounded-2xl" />

                  {/* Frame */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a] shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:border-white/10 group flex items-center justify-center">
                    <Image
                      src={project.imageSrc}
                      alt={`${project.title} Interface Mockup`}
                      width={1200}
                      height={750}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03] select-none"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Narrative Detail Column */}
                <div className="lg:col-span-5 flex flex-col justify-center text-left">
                  {/* Badge */}
                  <div className="mb-4">
                    {project.isClientProject ? (
                      <span className="inline-block text-[9px] font-sans font-extrabold tracking-widest text-[#0a0a0a] bg-accent-highlight uppercase px-3 py-1 rounded-full select-none">
                        {project.badge}
                      </span>
                    ) : (
                      <span className="inline-block text-[9px] font-sans font-bold tracking-widest text-[#888888] border border-[#1f1f1f] bg-[#0a0a0a] uppercase px-3 py-1 rounded-full select-none">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-3 select-all">
                    {project.title}
                  </h3>

                  {/* Stack details */}
                  <div className="mb-5">
                    <span className="text-[10px] sm:text-xs font-sans font-medium text-accent-highlight tracking-wide select-all">
                      {project.stack}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#888888] font-normal mb-3 max-w-lg select-all">
                    {project.description}
                  </p>

                  <ul className="list-disc pl-4 text-xs sm:text-sm text-[#888888] leading-relaxed font-normal mb-6 max-w-lg select-all space-y-1">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  {/* Feature tag pills */}
                  <div className="flex flex-wrap gap-1.5 mb-8 select-all">
                    {project.featureTags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-sans font-medium text-[#888888] border border-[#1f1f1f] bg-[#0a0a0a]/50 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap gap-4 items-center justify-start select-none">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#0a0a0a] bg-[#e8e8e8] px-5 py-3 rounded-xl transition-all duration-300 hover:bg-accent-highlight hover:text-[#0a0a0a]"
                      >
                        {project.isClientProject ? "Live Site" : "Live Demo"} <ArrowUpRight size={14} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#e8e8e8] border border-[#1f1f1f] bg-[#0a0a0a] px-5 py-3 rounded-xl transition-all duration-300 hover:border-accent-highlight hover:text-[#ffffff]"
                      >
                        GitHub <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>

              </ScrollStackItem>
            );
          })}
        </ScrollStack>

      </div>
    </section>
  );
}

