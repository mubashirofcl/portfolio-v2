"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const workflowSteps: WorkflowStep[] = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "Gathering and detailing technical expectations, business goals, user pathways, and feature specifications end-to-end.",
    },
    {
      step: "02",
      title: "Planning & Architecture",
      description: "Modeling scalable MongoDB schemas, structural folder setups (Service/Repository patterns), security flows, and DevOps routing.",
    },
    {
      step: "03",
      title: "UI Implementation",
      description: "Translating wireframes into responsive Next.js/React layouts utilizing Tailwind CSS, Lenis smooth scroll, and Framer Motion.",
    },
    {
      step: "04",
      title: "Backend Development",
      description: "Constructing robust Node.js and Express.js servers, designing efficient REST APIs, and implementing JWT token rotation middleware.",
    },
    {
      step: "05",
      title: "API Integration",
      description: "Connecting responsive client layouts to active endpoints using TanStack Query for optimal caching, state synchronization, and speed.",
    },
    {
      step: "06",
      title: "Testing & Optimization",
      description: "Validating systems, resolving duplicate index conflicts, caching query pathways, and auditing mobile responsive breakpoints.",
    },
    {
      step: "07",
      title: "Deployment & Release",
      description: "Containerizing processes with Docker, routing DNS propagation via Hostinger/Vercel, and configuring AWS CloudFront CDN load times.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="workflow"
      className="relative z-20 bg-[#0d0d0d] py-24 md:py-32 px-6 sm:px-12 lg:px-24 border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Divider */}
        <div className="border-t border-white/10 w-full mb-16 pt-8 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            Development Process
          </h2>
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-extrabold select-none">
            05 &middot; WORKFLOW
          </span>
        </div>

        {/* Workflow Horizontal/Vertical Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6"
        >
          {workflowSteps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="bg-[#121212] border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-full relative group transition-all duration-300 hover:border-white/10 hover:bg-[#161616]"
            >
              {/* Step number on top-right */}
              <div className="absolute top-4 right-6 text-[10px] font-black text-white/20 select-none group-hover:text-white/40 transition-colors">
                {step.step}
              </div>

              <div className="pt-4">
                {/* Title */}
                <h3 className="text-xs sm:text-sm font-black text-white mb-3 tracking-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-[10px] sm:text-xs leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
