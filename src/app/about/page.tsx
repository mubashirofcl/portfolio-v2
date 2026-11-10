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
  title: 'About Mubashir Palapadiyan — Full-Stack Developer & AI Mentor',
  description:
    'Learn about Mubashir Palapadiyan (Mubashir PP), a Full-Stack MERN Developer and AI Engineering Mentor at HACA, Calicut, and founder of Orvyn Labs. Architecture background, education, live client platforms, and skills.',
  alternates: {
    canonical: 'https://mubashiir.in/about',
  },
  openGraph: {
    title: 'About Mubashir Palapadiyan — Full-Stack Developer & AI Engineering Mentor',
    description:
      'Full-Stack Developer & AI Mentor at HACA, founder of Orvyn Labs. Production experience in React, Next.js, Node.js, PostgreSQL, Docker, AWS, and RAG pipelines.',
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
  jobTitle: 'Full-Stack MERN Developer & AI Engineering Mentor',
  description:
    'Full-stack developer and AI engineering mentor from Wayanad, Kerala (open to relocation), specialising in React, Next.js, Node.js, PostgreSQL, MongoDB, Docker, AWS deployments, and RAG pipelines.',
  worksFor: [
    {
      '@type': 'Organization',
      name: 'HACA',
    },
    {
      '@type': 'Organization',
      name: 'Orvyn Labs',
      url: 'https://mubashiir.in',
    },
  ],
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
    'Express.js', 'PostgreSQL', 'Prisma ORM', 'Docker',
    'AWS EC2', 'AWS S3', 'CloudFront CDN', 'Tailwind CSS',
    'JWT Authentication', 'REST API', 'Microservices',
    'RAG Pipelines', 'Google Gemini API', 'Groq Llama 3.3',
    'Vector Search', 'Full Stack Development', 'MERN Stack',
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
