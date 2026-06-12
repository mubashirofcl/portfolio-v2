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
      question: "Can you build an entire website from scratch?",
      answer: "Yes, absolutely! I handle the entire process. I design the visual parts you interact with, and I build the hidden systems that store data and keep the website running securely.",
    },
    {
      question: "What technologies do you use?",
      answer: "I primarily use modern, widely-supported tools like React and Next.js for the interface, and Node.js with MongoDB to manage data behind the scenes. This ensures your website is fast and reliable.",
    },
    {
      question: "Can you build a dashboard for me to manage my content?",
      answer: "Yes. I often create secure administrator portals. This allows you to easily manage your own products, track inventory, or update website content without needing to write any code.",
    },
    {
      question: "Will my website be fast and mobile-friendly?",
      answer: "Definitely. Every website I build is designed to look great and work perfectly on smartphones, tablets, and desktop computers. I also optimize images and code so pages load instantly.",
    },
    {
      question: "Do you handle the hosting and domain setup?",
      answer: "Yes, I take care of the technical launch process. I set up secure hosting on reliable cloud platforms and connect your custom domain name so your site is ready for the world to see.",
    },
    {
      question: "Can you integrate payment gateways like Razorpay?",
      answer: "Yes. I have experience setting up secure online payment systems. Whether you are selling products or accepting bookings, I can integrate reliable payment options directly into your platform.",
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
