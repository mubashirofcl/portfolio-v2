"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GrainyCarousel from "./GrainyCarousel";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    width="14"
    height="14"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const projectsList: Project[] = [
    {
      title: "NEXTZEN",
      badge: "Production E-Commerce & AI RAG",
      liveUrl: "https://nextzen.mubashiir.in",
      githubUrl: "https://github.com/mubashirofcl",
      stack: "React.js · Node.js · MongoDB · AWS EC2 · Docker · Gemini API · Groq",
      description: "Architected a production-grade MERN e-commerce platform with dedicated Admin and User systems, variant management across 10+ product categories, cart, wishlist, full order lifecycle, and an integrated RAG chatbot.",
      bullets: [
        "Engineered JWT authentication with access/refresh token rotation, HttpOnly cookie storage, Google OAuth, and RBAC securing 2 distinct user roles across all API routes.",
        "Designed a normalized MongoDB schema with aggregation pipelines for derived fields; resolved duplicate index issues, slashing query response time by ~40%.",
        "Built the full payment backend integrating Razorpay with signature verification alongside COD, wallet, refund logic, and coupon engine.",
        "Deployed backend via Docker on AWS EC2 with Nginx reverse proxy and SSL; configured AWS S3 and CloudFront CDN cutting average media load time by over 60%.",
        "Built a RAG product chatbot using Google Gemini API and Groq (Llama 3.3) connected to live MongoDB catalog data with custom glassmorphism chat UI.",
      ],
      featureTags: ["React.js", "Node.js", "MongoDB", "AWS EC2", "Docker", "Nginx", "Razorpay", "JWT Rotation", "RAG Chatbot", "CloudFront CDN"],
      imageSrc: "/nextzen_mockup.webp",
    },
    {
      title: "BIG4 TILES & SANITARY",
      badge: "Live Client Platform ✦",
      isClientProject: true,
      liveUrl: "https://big4.co.in",
      stack: "Next.js · Express.js · PostgreSQL · Prisma ORM · WebSockets · Turborepo · Cloudinary",
      description: "Delivered engineering and production support for a live Turborepo monorepo with Next.js storefront and admin applications, Express & WebSocket backend, and Neon PostgreSQL database.",
      bullets: [
        "Diagnosed and resolved a silent lead-loss bug that was dropping 100% of contact form submissions, restoring critical business client inquiries.",
        "Remediated exposed production database credentials, conflicting ISR cache configurations, and complex Prisma transaction errors prior to launch.",
        "Investigated and fixed multi-cause production deployment failure: missing Suspense boundaries, Next.js prerendering regression, and stale build cache.",
        "Reviewed AI-agent-generated code across the codebase, identifying and securing critical database, API, and cloud deployment vulnerabilities.",
      ],
      featureTags: ["Client Project", "Turborepo Monorepo", "Next.js", "Neon PostgreSQL", "Prisma ORM", "Express.js", "WebSockets", "Cloudinary"],
      imageSrc: "/big4_mockup.webp",
    },
    {
      title: "AZURA RESORTS",
      badge: "Live Client Project ✦",
      isClientProject: true,
      liveUrl: "https://azuraresorts.in",
      stack: "Next.js · Tailwind CSS · Framer Motion · React Lenis · Vercel",
      description: "Designed and developed a fully responsive luxury resort website for a hospitality client in Wayanad, handling the complete project independently from initial design to live production deployment.",
      bullets: [
        "Implemented fluid Framer Motion animations and React Lenis smooth scrolling, achieving sub-second interactions and a premium aesthetic.",
        "Built responsive, mobile-first layouts with Tailwind CSS, ensuring smooth rendering across mobile, tablet, and widescreen desktop displays.",
        "Managed production deployment on Vercel, configuring custom domain DNS with Hostinger and automated HTTPS setup for a zero-downtime go-live.",
      ],
      featureTags: ["Client Project", "Next.js", "Framer Motion", "Tailwind CSS", "Vercel", "Hostinger DNS", "SEO Optimized", "Responsive UI"],
      imageSrc: "/azura_mockup.webp",
    },
    {
      title: "ASKMYCV",
      badge: "AI Engineering & RAG Evaluation",
      githubUrl: "https://github.com/mubashirofcl",
      stack: "RAG Pipeline · Google Gemini API · Groq (Llama 3.3) · Vector Search · Evaluation Lab",
      description: "Engineered an intelligent RAG-based CV evaluation pipeline with an automated evaluation lab that benchmarks and scores extraction quality and match results against ground-truth data.",
      bullets: [
        "Built a dense retrieval RAG pipeline using vector embeddings and similarity search to ground candidate evaluations in factual resume text without hallucinations.",
        "Integrated multi-LLM orchestration utilizing Google Gemini API for structured semantic extraction and Groq (Llama 3.3) for high-throughput evaluation.",
        "Constructed an automated evaluation lab scoring model outputs against human-verified ground-truth datasets to quantify accuracy, precision, and recall.",
      ],
      featureTags: ["RAG Pipeline", "Google Gemini API", "Groq Llama 3.3", "Vector Search", "Evaluation Lab", "Embeddings", "Benchmarks"],
      imageSrc: "/askmycv_mockup.webp",
    },
    {
      title: "QUICKMEDI",
      badge: "Full Stack — Hybrid Architecture",
      githubUrl: "https://github.com/mubashirofcl",
      stack: "React.js · Node.js · Python · MongoDB · REST APIs",
      description: "A full-stack medicine availability search platform that locates real-time prescription medicine availability across nearby pharmacies with clear service boundaries.",
      bullets: [
        "Designed a hybrid MERN and Python architecture separating the React presentation layer, Node.js middleware, and Python data service.",
        "Developed a Python service simulating pharmacy management APIs, returning mock stock and pricing data across multiple pharmacy locations.",
        "Built the React frontend with prescription input flows, asynchronous data fetching via REST APIs, loading skeletons, and resilient error boundaries.",
      ],
      featureTags: ["Hybrid Architecture", "Node.js Middleware", "Python Data Service", "React.js", "MongoDB", "REST APIs", "Search Engine"],
      imageSrc: "/quickmedi_mockup.webp",
    },
  ];

  const projectImages = projectsList.map((p) => p.imageSrc);
  const projectMeta = projectsList.map((p) => ({
    title: p.title,
    badge: p.badge,
  }));

  // Handle ESC key to close modal & Arrow keys for quick switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProjectIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedProjectIndex((prev) => (prev !== null ? (prev === 0 ? projectsList.length - 1 : prev - 1) : null));
      } else if (e.key === "ArrowRight") {
        setSelectedProjectIndex((prev) => (prev !== null ? (prev === projectsList.length - 1 ? 0 : prev + 1) : null));
      }
    };

    if (selectedProjectIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProjectIndex, projectsList.length]);

  const activeProject = selectedProjectIndex !== null ? projectsList[selectedProjectIndex] : null;

  return (
    <section
      id="projects"
      className="bg-transparent py-20 sm:py-28 border-b border-[#1f1f1f] relative z-20 overflow-hidden w-full min-h-screen flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full mb-8 sm:mb-12 text-left">
        <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
          05 / SELECTED WORKS
        </span>
        <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-3 select-none">
          Projects
        </h2>
        <p className="text-sm sm:text-base text-[#888888] font-sans font-normal max-w-xl">
          Production systems and client deployments. Drag, scroll, or click any card for details.
        </p>
      </div>

      {/* Full-Screen Edge-to-Edge Grainy Carousel with Transparent Background & Auto-Scroll */}
      <div className="w-full h-[420px] sm:h-[540px] lg:h-[640px] relative bg-transparent">
        <GrainyCarousel
          images={projectImages}
          metaList={projectMeta}
          background="transparent"
          cardWidth={660}
          cardHeight={400}
          gap={28}
          speed={58}
          scroll={{
            mode: "smooth",
            drag: 25,
            damping: 60,
            zoom: 0,
          }}
          grain={{
            speed: 45,
            amount: 14,
            scale: 240,
          }}
          onCardClick={(index) => setSelectedProjectIndex(index)}
        />
      </div>

      {/* Project Selector Pills */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 select-none">
          {projectsList.map((project, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedProjectIndex(idx)}
              className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-[#1f1f1f] bg-[#0c0c0c]/70 hover:bg-[#181818] text-[#888888] hover:text-white hover:border-accent-highlight transition-all duration-300"
            >
              ✦ {project.title}
            </button>
          ))}
        </div>

        <div className="text-[11px] font-sans text-[#666666] tracking-wide select-none hidden sm:block">
          Auto-scrolling &middot; Click any card to inspect details
        </div>
      </div>

      {/* SIMPLE & STANDARD PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setSelectedProjectIndex(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#111111] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f] bg-[#141414]">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-sans font-bold tracking-wider text-accent-highlight uppercase px-2.5 py-1 rounded bg-accent-highlight/10 border border-accent-highlight/20">
                    {activeProject.badge}
                  </span>
                  <span className="text-xs font-sans text-[#777777]">
                    {String((selectedProjectIndex ?? 0) + 1).padStart(2, "0")} / {String(projectsList.length).padStart(2, "0")}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProjectIndex(null)}
                  className="w-8 h-8 rounded-lg bg-[#1c1c1c] hover:bg-[#252525] border border-[#2a2a2a] flex items-center justify-center text-[#aaaaaa] hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5">
                {/* Image */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#222222] bg-[#0a0a0a]">
                  <Image
                    src={activeProject.imageSrc}
                    alt={activeProject.title}
                    width={900}
                    height={506}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Title & Stack */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-wide mb-1.5">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs font-sans text-accent-highlight font-medium">
                    {activeProject.stack}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm font-sans text-[#cccccc] leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#888888]">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#aaaaaa] leading-relaxed">
                        <span className="text-accent-highlight font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeProject.featureTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-sans font-medium text-[#888888] bg-[#181818] border border-[#262626] px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer with Actions */}
              <div className="px-6 py-4 border-t border-[#1f1f1f] bg-[#141414] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProjectIndex((prev) => (prev !== null ? (prev === 0 ? projectsList.length - 1 : prev - 1) : 0))}
                    className="text-xs font-sans font-semibold text-[#888888] hover:text-white px-3 py-1.5 rounded bg-[#181818] border border-[#262626] transition-colors"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setSelectedProjectIndex((prev) => (prev !== null ? (prev === projectsList.length - 1 ? 0 : prev + 1) : 0))}
                    className="text-xs font-sans font-semibold text-[#888888] hover:text-white px-3 py-1.5 rounded bg-[#181818] border border-[#262626] transition-colors"
                  >
                    Next →
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#e8e8e8] hover:text-white px-4 py-2 rounded-lg bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#444444] transition-all"
                    >
                      <GithubIcon />
                      <span>Code</span>
                    </a>
                  )}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-black bg-white hover:bg-accent-highlight hover:text-white px-4 py-2 rounded-lg transition-all"
                    >
                      <span>{activeProject.isClientProject ? "Visit Site" : "Live Demo"}</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
