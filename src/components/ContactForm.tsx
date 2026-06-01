"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Business Website",
    budget: "Under ₹10K",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          projectType: "Business Website",
          budget: "Under ₹10K",
          message: "",
        });
      } else {
        setErrorMessage(data.error || "Failed to send email. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] py-[120px] px-6 sm:px-12 lg:px-24 border-b border-[#1f1f1f] relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-left">
          <span className="text-[10px] tracking-[0.25em] text-accent-highlight uppercase font-bold font-sans block mb-3">
            09 / COMMUNICATIONS
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-[#f0f0f0] tracking-wider leading-none uppercase mb-4 select-none">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-sans font-normal max-w-xl">
            Open to freelance projects, collaborations and full-time opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Contact Details (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-8 text-left select-all"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#f0f0f0] mb-4 select-none">
                Contact Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-md mb-8 select-none">
                Let&apos;s construct high-performance solutions. Grab my direct coordinates below or shoot an email.
              </p>
            </div>

            {/* List */}
            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex items-center gap-4 bg-[#111111] border border-[#1f1f1f] p-4 rounded-xl hover:border-[#e8e8e8]/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-accent-highlight select-none shrink-0">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-sans font-black text-[#888888]/40 uppercase tracking-widest leading-none mb-1.5 select-none">
                    Email Address
                  </span>
                  <a href="mailto:mubashirppofcl@gmail.com" className="text-xs sm:text-sm font-sans font-semibold text-[#f0f0f0] hover:text-accent-highlight transition-colors">
                    mubashirppofcl@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 bg-[#111111] border border-[#1f1f1f] p-4 rounded-xl hover:border-[#e8e8e8]/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-accent-highlight select-none shrink-0">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-sans font-black text-[#888888]/40 uppercase tracking-widest leading-none mb-1.5 select-none">
                    Phone &amp; WhatsApp
                  </span>
                  <a href="tel:+919072190088" className="text-xs sm:text-sm font-sans font-semibold text-[#f0f0f0] hover:text-accent-highlight transition-colors">
                    +91 9072190088
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 bg-[#111111] border border-[#1f1f1f] p-4 rounded-xl hover:border-[#e8e8e8]/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-accent-highlight select-none shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-sans font-black text-[#888888]/40 uppercase tracking-widest leading-none mb-1.5 select-none">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-sans font-semibold text-[#f0f0f0]">
                    Wayanad, Kerala, India
                  </span>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-4 bg-[#111111] border border-[#1f1f1f] p-4 rounded-xl hover:border-[#e8e8e8]/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-accent-highlight select-none shrink-0">
                  <Globe size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-sans font-black text-[#888888]/40 uppercase tracking-widest leading-none mb-1.5 select-none">
                    Personal Domain
                  </span>
                  <a href="https://mubashiir.in" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-sans font-semibold text-[#f0f0f0] hover:text-accent-highlight transition-colors">
                    mubashiir.in
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7 w-full text-left"
          >
            <div className="bg-[#111111] border border-[#1f1f1f] p-8 sm:p-10 rounded-2xl">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[9px] font-sans font-bold tracking-widest text-[#888888] uppercase select-none">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-accent-highlight focus:ring-1 focus:ring-accent-highlight transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[9px] font-sans font-bold tracking-widest text-[#888888] uppercase select-none">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="johndoe@email.com"
                      className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-accent-highlight focus:ring-1 focus:ring-accent-highlight transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Type Select */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectType" className="text-[9px] font-sans font-bold tracking-widest text-[#888888] uppercase select-none">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-accent-highlight focus:ring-1 focus:ring-accent-highlight transition-all cursor-pointer"
                    >
                      <option value="Business Website">Business Website</option>
                      <option value="MERN App">MERN App</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Budget Select */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="text-[9px] font-sans font-bold tracking-widest text-[#888888] uppercase select-none">
                      Estimated Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-accent-highlight focus:ring-1 focus:ring-accent-highlight transition-all cursor-pointer"
                    >
                      <option value="Under ₹10K">Under ₹10K</option>
                      <option value="₹10K–₹30K">₹10K–₹30K</option>
                      <option value="₹30K+">₹30K+</option>
                      <option value="Let's Discuss">Let&apos;s Discuss</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[9px] font-sans font-bold tracking-widest text-[#888888] uppercase select-none">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your product requirements..."
                    className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-accent-highlight focus:ring-1 focus:ring-accent-highlight transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#0a0a0a] bg-[#e8e8e8] border border-[#e8e8e8] rounded-xl py-4 transition-all duration-300 hover:bg-accent-highlight hover:border-accent-highlight hover:text-[#0a0a0a] disabled:opacity-50 select-none cursor-pointer shadow-[0_4px_14px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_14px_rgba(200,245,66,0.15)]"
                >
                  {isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      <Send size={13} />
                      Send Message &rarr;
                    </>
                  )}
                </button>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-accent-highlight text-center font-medium mt-2"
                  >
                    ✦ Inquiry sent successfully! I will reach out shortly.
                  </motion.div>
                )}

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 text-center font-medium mt-2"
                  >
                    ⚠ {errorMessage}
                  </motion.div>
                )}

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
