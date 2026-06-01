"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  target: number;
  suffix: string;
  label: string;
}

function StatCounter({ target, suffix, label }: StatCounterProps) {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={elementRef} className="flex flex-col">
      <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tighter leading-none mb-3">
        {count}
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="text-xs sm:text-sm text-white/50 uppercase tracking-[0.12em] font-semibold leading-relaxed">
        {label}
      </span>
    </div>
  );
}

export default function AboutMeSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative z-20 bg-[#0d0d0d] py-24 md:py-32 px-6 sm:px-12 lg:px-24 border-b border-white/5 overflow-hidden"
    >
      {/* Decorative ambient background glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-accent/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-12 items-start">
        {/* LEFT COLUMN: Animated Stats Counters (40% width / 4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4 grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-y-16"
        >
          <StatCounter target={3} suffix="+" label="Projects Completed" />
          <StatCounter target={40} suffix="%" label="Query Optimization" />
          <StatCounter target={60} suffix="%" label="CDN Media Speedup" />
          <StatCounter target={2} suffix="+" label="Live Production Deployments" />
        </motion.div>

        {/* RIGHT COLUMN: Cinematic Story Text (60% width / 6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs tracking-[0.25em] text-accent uppercase font-bold block mb-3">
              ENGINEERING PRINCIPLES
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              From BCA Student to<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent/90">
                Production-Grade Developer
              </span>
            </h2>
            <div className="h-[2px] w-20 bg-accent mt-6" />
          </div>

          {/* Body Paragraphs */}
          <div className="flex flex-col gap-6 text-white/70 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            <p>
              Every great engineering journey begins with solving real problems. For Mubashir PP,
              a passion for logic and architecture was sparked during his Bachelor of Computer Applications (BCA) 
              studies at the University of Calicut. Tinkering with technical systems quickly transitioned into 
              building full-stack applications that connect robust server APIs with responsive user interfaces.
            </p>
            <p>
              Driven to refine his skills to professional standards, Mubashir entered Brototype&apos;s intensive, 
              production-focused 1-year MERN training program in Kerala. Here, he mastered industry-grade code 
              architectures (such as the Service/Repository pattern), query optimizations, secure authentication 
              lifecycles, and advanced database models. To put these skills into practice immediately, he founded 
              Orvyn Labs, a freelance practice dedicated to delivering bespoke web platforms directly to local clients.
            </p>
            <p>
              Bridging database performance with cloud orchestration, Mubashir excels at building scalable production 
              environments using Docker, Nginx, and AWS systems (EC2, S3, CloudFront). Whether configuring custom 
              DNS zones for luxury resort platforms like azuraresorts.in or implementing Razorpay transaction gateways 
              and Gemini API chatbot integrations, the mission is always to deliver secure, efficient, and robust web applications:{" "}
              <strong className="text-white font-medium">
                Building scalable systems with clean architecture, from initial concept to high-performance live production.
              </strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
