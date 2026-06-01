"use client";

import React, { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import TagScroll from "@/components/TagScroll";
import ProfessionalStats from "@/components/ProfessionalStats";
import AboutMe from "@/components/AboutMe";
import ServicesGrid from "@/components/ServicesGrid";
import SkillsStack from "@/components/SkillsStack";
import JourneyTimeline from "@/components/JourneyTimeline";
import Projects from "@/components/Projects";
import OngoingProject from "@/components/OngoingProject";
import EducationCertifications from "@/components/EducationCertifications";
import FreelanceHire from "@/components/FreelanceHire";
import StatsSection from "@/components/StatsSection";
import ResumeDownload from "@/components/ResumeDownload";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import CursorRevealBackground from "@/components/CursorRevealBackground";

export default function Home() {
  // Shared ref controlling the canvas frames and overlays simultaneously
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white relative">
      {/* Hero Scroll System: 500vh scroll space */}
      <div ref={heroRef} style={{ position: "relative", height: "500vh" }}>
        <ScrollyCanvas heroRef={heroRef} />
        <Overlay heroRef={heroRef} />
      </div>

      {/* Trust badges marquee strip */}
      <TagScroll />

      {/* Professional stats card grid */}
      <ProfessionalStats />

      {/* About me split narrative & grid details */}
      <AboutMe />

      {/* Capabilities services grid */}
      <ServicesGrid />

      {/* Tech stack category tags list */}
      <SkillsStack />

      {/* Professional experience vertical timeline */}
      <JourneyTimeline />

      {/* Selected projects alternating case studies */}
      <Projects />

      {/* Current ongoing project details */}
      <OngoingProject />

      {/* Academics & Coursera certification credentials */}
      <EducationCertifications />

      {/* Freelance offerings split panel */}
      <FreelanceHire />

      {/* Animated counter stats section */}
      <StatsSection />

      {/* Curriculum Vitae download anchor callout */}
      <ResumeDownload />

      {/* Direct email & inquiry interactive form */}
      <ContactForm />

      {/* Minimal copyright credit footer */}
      <Footer />

      {/* Sticky viewport floating CTA */}
      <FloatingCTA />

      {/* Global high-tech cursor-reveal overlay grid and glow */}
      <CursorRevealBackground />
    </main>
  );
}

