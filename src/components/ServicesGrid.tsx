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
      title: "Full-Stack Development",
      description: "I build complete web applications from the ground up, ensuring a smooth experience for users and a solid, reliable foundation behind the scenes.",
      icon: <Layers className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "Client & Business Websites",
      description: "I create beautiful, fast, and responsive websites tailored to your brand, helping you connect with your audience and grow your business.",
      icon: <Globe className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "E-Commerce Solutions",
      description: "I set up secure online stores with easy-to-use shopping carts, safe payment gateways, and straightforward admin dashboards to manage products.",
      icon: <ShoppingCart className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "Secure Data & Systems",
      description: "I develop secure backend systems that protect user data, manage logins safely, and connect your app to other essential services smoothly.",
      icon: <Cpu className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "Cloud Deployment",
      description: "I ensure your application is hosted securely on modern cloud platforms so it stays fast, online, and available as your user base grows.",
      icon: <Cloud className="w-6 h-6 text-[#f0f0f0] group-hover:text-accent-highlight transition-colors" />,
    },
    {
      title: "Performance Optimization",
      description: "I fine-tune websites so they load instantly and rank well on search engines, providing a seamless browsing experience on any device.",
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
