import React from "react";
import type { Metadata } from "next";
// Since this is a Server Component that needs client-side animation, we might need a client wrapper.
// But we can just use "use client" for the page if we want animations. 
// Wait, metadata MUST be in a Server Component. So we split them or just make the content a client component.
// Let's create the metadata here and import a client component for the content, or just put the metadata here 
// and do not use "use client" at the top, and let child components use framer-motion (or just make a local client component).
// Since the prompt provided metadata to be exported, this file must NOT have "use client" at the top.
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: 'About Mubashir Palapadiyan',
  description:
    'Learn about Mubashir Palapadiyan, a MERN Stack Developer from Wayanad, Kerala. Background, education, skills, and the story behind Orvyn Labs.',
  alternates: {
    canonical: 'https://mubashiir.in/about',
  },
  openGraph: {
    title: 'About Mubashir Palapadiyan — MERN Stack Developer',
    description:
      'MERN Stack Developer from Wayanad, Kerala. BCA graduate, Brototype-trained, founder of Orvyn Labs.',
    url: 'https://mubashiir.in/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const aboutPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mubashir Palapadiyan',
  alternateName: ['Mubashir PP', 'Mubashir Palapadiyan Developer'],
  url: 'https://mubashiir.in/about',
  image: 'https://mubashiir.in/photo.jpg',
  jobTitle: 'MERN Stack Developer',
  description:
    'Full-stack developer from Wayanad, Kerala, specialising in React, Next.js, Node.js, MongoDB, Docker, and AWS deployments.',
  worksFor: {
    '@type': 'Organization',
    name: 'Orvyn Labs',
    url: 'https://mubashiir.in',
  },
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'University of Calicut',
    },
    {
      '@type': 'Organization',
      name: 'Brototype',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wayanad',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://github.com/mubashirofcl',
    'https://linkedin.com/in/mubashirpp',
  ],
  knowsAbout: [
    'React.js', 'Next.js', 'Node.js', 'MongoDB',
    'Express.js', 'Docker', 'AWS EC2', 'AWS S3',
    'Tailwind CSS', 'JWT Authentication', 'REST API',
    'Full Stack Development', 'MERN Stack',
  ],
  email: 'mubashirppofcl@gmail.com',
  telephone: '+919072190088',
};

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white relative flex flex-col">
      <script
        type="application/ld+json"
        id="about-person-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPersonSchema) }}
      />
      <AboutContent />
    </main>
  );
}
