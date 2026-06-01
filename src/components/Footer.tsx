"use client";

import React from "react";
import { Mail } from "lucide-react";

// Lightweight, responsive, and compile-safe SVG brand icon components
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    width="18"
    height="18"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
    width="18"
    height="18"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
    { label: "Resume", href: "#resume" },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] pt-16 pb-8 px-6 sm:px-12 lg:px-24 select-none relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        
        {/* LEFT COLUMN: Identity info */}
        <div className="flex flex-col text-left">
          <span className="text-lg font-sans font-bold text-[#f0f0f0] tracking-wide select-all">
            Mubashir PP
          </span>
          <span className="text-xs font-sans text-[#888888] tracking-wide mt-1 select-all">
            Full Stack MERN Developer
          </span>
        </div>

        {/* CENTER COLUMN: Quick Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 select-all">
          {quickLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs font-sans font-semibold text-[#888888] hover:text-accent-highlight transition-colors duration-300 uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT COLUMN: Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/mubashirofcl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#111111] border border-[#1f1f1f] flex items-center justify-center text-[#888888] hover:border-accent-highlight hover:text-accent-highlight transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <GithubIcon />
          </a>
          <a
            href="https://linkedin.com/in/mubashirpp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#111111] border border-[#1f1f1f] flex items-center justify-center text-[#888888] hover:border-accent-highlight hover:text-accent-highlight transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon />
          </a>
          <a
            href="mailto:mubashirppofcl@gmail.com"
            className="w-10 h-10 rounded-xl bg-[#111111] border border-[#1f1f1f] flex items-center justify-center text-[#888888] hover:border-accent-highlight hover:text-accent-highlight transition-all duration-300"
            aria-label="Send Direct Email"
          >
            <Mail size={18} />
          </a>
        </div>

      </div>

      {/* BOTTOM LINE: Credit & Copyright */}
      <div className="max-w-7xl mx-auto border-t border-[#1f1f1f] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-sans text-[#888888]/50 tracking-wider">
        <span>
          Built with Next.js &middot; Deployed on Vercel
        </span>
        <span className="select-all">
          &copy; 2025 Mubashir PP
        </span>
      </div>
    </footer>
  );
}
