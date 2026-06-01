"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Do you build full-stack applications?",
      answer: "Yes. I construct production-focused, end-to-end full-stack applications, managing everything from UI styling components to data models, custom middleware, API routes, and cloud configurations.",
    },
    {
      question: "Do you work with the MERN stack?",
      answer: "Absolutely. My core operational stack is the MERN architecture: MongoDB (for database collections and aggregation analytics), Express.js (backend middleware frameworks), React.js (responsive presentation pages), and Node.js (high-performance runtime engines).",
    },
    {
      question: "Can you build scalable admin systems?",
      answer: "Yes. In my NextZen e-commerce project, I architected separate, highly secure Admin and User portals that include role-based access controls, inventory trackers, variant editing, and order lifecycle trackers.",
    },
    {
      question: "Do you deploy production-ready projects?",
      answer: "Yes. I deploy live client platforms (such as azuraresorts.in) to production. My pipeline uses Docker containers, Nginx reverse proxy configurations, Certbot SSL certifications, and AWS services (EC2, S3, CloudFront CDN) to ensure high availability.",
    },
    {
      question: "Can you optimize application performance?",
      answer: "Yes. I specialize in backend database optimization (indexing collections, using normalized schema pipelines) which has cut database delays by ~40%. I also set up AWS S3 bucket systems integrated with CloudFront CDN distributions, reducing average media load times by over 60%.",
    },
    {
      question: "Do you build responsive websites?",
      answer: "Yes. Every frontend experience I design is completely responsive, ensuring optimal rendering and fluid layout transitions across all desktop, tablet, and mobile viewport devices.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative z-20 bg-[#0d0d0d] py-24 md:py-32 px-6 sm:px-12 lg:px-24 border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header Divider */}
        <div className="border-t border-white/10 w-full mb-16 pt-8 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-extrabold select-none">
            06 &middot; FAQS
          </span>
        </div>

        {/* FAQ Accordions Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          {faqData.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-white/15"
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left text-white select-none focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold tracking-wide">
                    {faq.question}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-colors">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {/* Answer Content Dropdown */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-white/50 text-xs sm:text-sm leading-relaxed border-t border-white/[0.03] pt-4 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
