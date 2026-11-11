import type { Metadata } from "next";
import { Sora, Bebas_Neue } from "next/font/google";
import "./globals.css";
import ElectricCursor from "@/components/ElectricCursor";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mubashiir.in'),
  title: {
    default: 'Mubashir PP — Full Stack Developer & AI Engineering Mentor | Kerala',
    template: '%s | Mubashir PP',
  },
  description:
    'Mubashir PP is a Full-Stack MERN Developer and AI Engineering Mentor at HACA, Calicut, and founder of Orvyn Labs. Production experience in React, Next.js, Node.js, PostgreSQL, Docker, AWS, and RAG pipelines.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  keywords: [
    'Mubashir PP',
    'Mubashir Palapadiyan',
    'Full Stack Developer Kerala',
    'MERN Stack Developer',
    'AI Engineering Mentor',
    'HACA Calicut',
    'Backend Developer Node.js',
    'Frontend Developer Next.js',
    'Wayanad Kerala Developer',
    'Orvyn Labs',
    'mubashiir.in',
  ],
  authors: [{ name: 'Mubashir PP', url: 'https://mubashiir.in' }],
  creator: 'Mubashir PP',
  alternates: {
    canonical: 'https://mubashiir.in',
  },
  openGraph: {
    type: 'website',
    url: 'https://mubashiir.in',
    siteName: 'Mubashir PP — Portfolio',
    title: 'Mubashir PP — Full Stack Developer & AI Engineering Mentor',
    description:
      'Full-stack engineer and AI mentor from Kerala. Specializing in React, Next.js, Node.js, PostgreSQL, Docker, AWS EC2, and RAG pipelines.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mubashir PP — Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mubashir PP — Full Stack Developer & AI Engineering Mentor',
    description:
      'Full-stack engineer & AI mentor from Kerala. React, Next.js, Node.js, PostgreSQL, AWS, Docker, RAG pipelines.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mubashir Palapadiyan',
  alternateName: ['Mubashir PP', 'Mubashir Palapadiyan Developer'],
  url: 'https://mubashiir.in',
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

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mubashir Palapadiyan - Portfolio',
  url: 'https://mubashiir.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://mubashiir.in/?s={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Mubashir Palapadiyan - Freelance Web Developer',
  image: 'https://mubashiir.in/photo.jpg',
  url: 'https://mubashiir.in',
  telephone: '+919072190088',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wayanad',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  priceRange: '$$'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${bebasNeue.variable} font-sans bg-[#0a0a0a] text-white antialiased`}
      >
        <script
          type="application/ld+json"
          id="schema-markup"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, websiteSchema, professionalServiceSchema]) }}
        />
        {children}
        <ElectricCursor
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 99990,
            pointerEvents: "none",
          }}
        />
      </body>
    </html>
  );
}

