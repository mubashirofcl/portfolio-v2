"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Globe,
  ShoppingCart,
  Cpu,
  Cloud,
  Gauge,
} from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServicesGrid() {
  const services: ServiceItem[] = [
    {
      title: "Full-Stack MERN Architecture",
      description: "Architecting scalable web applications using React.js frontends and robust Node.js backends. Delivering end-to-end MERN stack solutions.",
      icon: <Layers className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "Next.js Web Development",
      description: "Building blazing-fast, SEO-optimized, and highly responsive Next.js websites tailored to elevate your brand and drive business conversions.",
      icon: <Globe className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "Custom E-Commerce Platforms",
      description: "Developing secure e-commerce systems with custom payment gateway integrations, seamless checkout flows, and comprehensive admin dashboards.",
      icon: <ShoppingCart className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "REST APIs & Database Design",
      description: "Designing secure REST APIs and structuring high-performance MongoDB databases to ensure data integrity and seamless cross-platform integration.",
      icon: <Cpu className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "AWS & Docker Deployment",
      description: "Deploying applications on reliable cloud infrastructures like AWS using Docker containers for CI/CD pipelines and maximum scalability.",
      icon: <Cloud className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "Technical SEO & Optimization",
      description: "Optimizing Core Web Vitals, implementing semantic HTML, and improving load times to help your application rank higher on search engines.",
      icon: <Gauge className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
  ];

  return (
    <section id="services" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-left">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            02 / CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-4 select-none">
            What I Do
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-sans font-normal max-w-xl">
            End-to-end development — from architecture to deployment.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="group bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 flex flex-col justify-between h-full min-h-[220px] transition-all duration-300 hover:border-accent-highlight hover:bg-[#141414] hover:shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#1f1f1f] flex items-center justify-center mb-6 group-hover:border-accent-highlight/30 transition-all select-none">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-sans font-bold text-[#f0f0f0] tracking-wide mb-3 select-all">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-sm text-[#888888] font-sans font-normal leading-relaxed group-hover:text-[#e8e8e8]/80 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
