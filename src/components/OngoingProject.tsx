"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, CheckCircle2, Circle, AlertCircle } from "lucide-react";

export default function OngoingProject() {
  const techStack = [
    "React Native",
    "Expo SDK 54",
    "SQLite",
    "React / Vite",
    "Supabase",
    "PostgreSQL",
    "WebSockets",
    "Tailwind CSS",
  ];

  const milestones = [
    { title: "Offline-First SQLite Database Engine", status: "completed" },
    { title: "Supabase Live Real-Time Backup Sync", status: "completed" },
    { title: "Multi-Image WhatsApp Marketing Dispatcher", status: "completed" },
    { title: "Excel/PDF Parameterized Reporting Engine", status: "completed" },
    { title: "Background Sync (Expo TaskManager) & Heartbeats", status: "ongoing" },
  ];

  return (
    <section id="ongoing" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-left">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            05B / ACTIVE PIPELINE
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-4 select-none">
            Ongoing Project
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-sans font-normal max-w-xl">
            Currently in active engineering inside the Orvyn Labs workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Project Details (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            {/* Live Indicator Badges */}
            <div className="flex items-center gap-2 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-highlight opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-highlight"></span>
              </span>
              <span className="text-[10px] font-sans font-bold tracking-widest text-accent-highlight uppercase">
                Active Codebase Syncing
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#f0f0f0] tracking-wide mb-4">
                InvoiceGen Premium (Emerald PMS Suite)
              </h3>
              <p className="text-sm sm:text-base text-[#888888] font-sans leading-relaxed mb-6">
                An offline-first Property Management System (PMS) and professional billing engine tailored for boutique resorts and homestays. It bridges a high-performance cross-platform React Native mobile client for local operations with a comprehensive, real-time synced React Web Admin Panel for remote dashboard analytics, backup auditing, and targeted broadcasts.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 select-none mb-4">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-[#e8e8e8] bg-[#111111] border border-[#1f1f1f] rounded-lg px-3 py-1.5 hover:border-accent-highlight/40 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Current Technical Focus Highlight Card */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 relative overflow-hidden group hover:border-[#e8e8e8]/20 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 text-[#888888]/20 group-hover:text-accent-highlight/10 transition-colors select-none">
                <Cpu size={40} />
              </div>
              <h4 className="text-xs sm:text-sm font-sans font-bold text-[#f0f0f0] tracking-wider uppercase mb-2 flex items-center gap-2 select-none">
                <AlertCircle size={14} className="text-accent-highlight" />
                Current Technical Challenge
              </h4>
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed select-all">
                Configuring Expo TaskManager for background auto-syncs and implementing real-time heartbeats in the mobile client. Listening for administrative force-backup commands via Supabase Real-time Channels to trigger instantaneous database uploads.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Progress & Milestones (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 w-full text-left"
          >
            <div className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-2xl flex flex-col gap-8">
              
              {/* Progress Gauge */}
              <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between select-none">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#888888] uppercase">
                    Project Progress (v3.0.0)
                  </span>
                  <span className="text-3xl font-display text-accent-highlight tracking-wider leading-none">
                    95%
                  </span>
                </div>
                {/* Progress Bar Track */}
                <div className="h-2 w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="h-full bg-accent-highlight rounded-full shadow-[0_0_10px_rgba(200,245,66,0.5)]"
                  />
                </div>
              </div>

              {/* Milestones List */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-sans font-bold tracking-widest text-[#888888] uppercase mb-1 select-none">
                  Development Milestones
                </h4>
                <div className="flex flex-col gap-3.5">
                  {milestones.map((milestone, idx) => {
                    const isCompleted = milestone.status === "completed";
                    const isOngoing = milestone.status === "ongoing";
                    
                    return (
                      <div key={idx} className="flex items-center gap-3 select-none">
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-accent-highlight shrink-0" />
                        ) : isOngoing ? (
                          <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent-highlight opacity-50"></span>
                            <Circle size={14} className="text-accent-highlight relative fill-[#111111]" />
                          </span>
                        ) : (
                          <Circle size={14} className="text-[#888888]/40 shrink-0" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-sans ${
                            isCompleted
                              ? "text-[#e8e8e8]/90 line-through decoration-[#1f1f1f] decoration-2"
                              : isOngoing
                              ? "text-accent-highlight font-semibold"
                              : "text-[#888888]/50"
                          }`}
                        >
                          {milestone.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
