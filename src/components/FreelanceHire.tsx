"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function FreelanceHire() {
  const servicesList = [
    "Business Websites",
    "Portfolio Websites",
    "MERN Full Stack Applications",
    "Admin Dashboards",
    "E-commerce Platforms",
    "Landing Pages",
    "Booking Systems",
  ];

  return (
    <section id="hire" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-20 text-left">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            07 / COLLABORATION
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-4 select-none">
            Let&apos;s Build Together
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-sans font-normal max-w-xl">
            Need a website or web application? I help startups, businesses and creators build modern, scalable digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Services list (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 sm:p-10 text-left"
          >
            <h3 className="text-sm font-sans font-bold tracking-[0.15em] text-[#f0f0f0] uppercase mb-6 pb-3 border-b border-[#1f1f1f] select-none">
              Services Offered
            </h3>
            
            <ul className="flex flex-col gap-4 select-all">
              {servicesList.map((service, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-sans font-medium text-[#888888] hover:text-[#e8e8e8] transition-colors">
                  <span className="text-accent-highlight select-none">✦</span>
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT COLUMN: Action Buttons (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col gap-4 w-full text-left"
          >
            {/* Start a Project (Primary Lime Button) */}
            <a
              href="#contact"
              className="inline-flex items-center justify-between text-sm font-sans font-bold uppercase tracking-wider text-[#0a0a0a] bg-accent-highlight border border-accent-highlight rounded-xl px-6 py-4 transition-all duration-300 hover:bg-[#b5e02c] hover:border-[#b5e02c] shadow-[0_4px_14px_rgba(200,245,66,0.15)] select-none"
            >
              Start a Project <ArrowRight size={16} />
            </a>

            {/* WhatsApp Me (Secondary) */}
            <a
              href="https://wa.me/919072190088"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between text-sm font-sans font-bold uppercase tracking-wider text-[#e8e8e8] border border-[#1f1f1f] bg-[#111111] rounded-xl px-6 py-4 transition-all duration-300 hover:border-accent-highlight hover:text-[#ffffff] select-none"
            >
              WhatsApp Me <ArrowRight size={16} />
            </a>

            {/* Send an Email (Secondary) */}
            <a
              href="mailto:mubashirppofcl@gmail.com"
              className="inline-flex items-center justify-between text-sm font-sans font-bold uppercase tracking-wider text-[#e8e8e8] border border-[#1f1f1f] bg-[#111111] rounded-xl px-6 py-4 transition-all duration-300 hover:border-accent-highlight hover:text-[#ffffff] select-none"
            >
              Send an Email <ArrowRight size={16} />
            </a>

            {/* Bottom info text */}
            <div className="flex items-start gap-2.5 mt-6 select-all">
              <MapPin size={14} className="text-accent-highlight mt-0.5 shrink-0" />
              <p className="text-xs font-sans font-medium text-[#888888] leading-relaxed">
                Based in Wayanad, Kerala — Available for remote freelance projects worldwide.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
