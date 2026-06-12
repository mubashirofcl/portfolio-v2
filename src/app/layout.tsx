import type { Metadata } from "next";
import { Sora, Bebas_Neue } from "next/font/google";
import "./globals.css";

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
    default: 'Mubashir Palapadiyan — MERN Stack Developer | Kerala',
    template: '%s | Mubashir Palapadiyan',
  },
  description:
    'Portfolio of Mubashir Palapadiyan (Mubashir PP), a MERN Stack Developer from Wayanad, Kerala. Builds scalable full-stack apps with React, Next.js, Node.js, MongoDB, AWS, and Docker.',
  keywords: [
    'Mubashir Palapadiyan',
    'Mubashir PP',
    'Mubashir MERN Developer',
    'MERN Stack Developer Kerala',
    'Full Stack Developer Wayanad',
    'Next.js Developer India',
    'React Developer Kerala',
    'AWS Developer Kerala',
    'mubashiir.in',
    'Orvyn Labs',
  ],
  authors: [{ name: 'Mubashir Palapadiyan', url: 'https://mubashiir.in' }],
  creator: 'Mubashir Palapadiyan',
  alternates: {
    canonical: 'https://mubashiir.in',
  },
  openGraph: {
    type: 'website',
    url: 'https://mubashiir.in',
    siteName: 'Mubashir Palapadiyan — Portfolio',
    title: 'Mubashir Palapadiyan — MERN Stack Developer',
    description:
      'Full-stack engineer from Kerala specialising in React, Node.js, MongoDB, and cloud deployments. Founder of Orvyn Labs.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mubashir Palapadiyan — MERN Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mubashir Palapadiyan — MERN Stack Developer',
    description:
      'Full-stack engineer from Kerala. React, Node.js, MongoDB, AWS, Docker.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sora.variable} ${bebasNeue.variable} font-sans bg-[#0a0a0a] text-white antialiased`}
      >
        <script
          type="application/ld+json"
          id="person-schema"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

