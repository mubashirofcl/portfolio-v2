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
  title: "Mubashir PP — Full Stack MERN Developer | Next.js Portfolio",
  description: "Production-focused MERN Stack Developer specializing in full-stack web applications, Next.js, MongoDB, REST APIs, JWT authentication, AWS deployment, and freelance web development. Based in Kerala, India.",
  keywords: [
    "Mubashir PP",
    "Mubashir MERN Developer",
    "Full Stack Developer Kerala",
    "Next.js Developer India",
    "MERN Stack Developer Portfolio",
    "Freelance Web Developer India",
    "MongoDB Express React Node Developer",
    "React Developer Kerala",
    "Node.js Developer India",
    "AWS Developer Kerala",
    "Full Stack Developer Wayanad"
  ],
  authors: [{ name: "Mubashir PP", url: "https://mubashiir.in" }],
  creator: "Mubashir PP",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://mubashiir.in",
    title: "Mubashir PP — Full Stack MERN Developer",
    description: "Production-focused MERN Stack Developer — full-stack apps, AWS deployment, freelance development.",
    siteName: "Mubashir PP Portfolio",
    images: [{ url: "https://mubashiir.in/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubashir PP — Full Stack MERN Developer",
    description: "MERN Stack Developer from Kerala building scalable web applications.",
    images: ["https://mubashiir.in/og-image.png"]
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://mubashiir.in"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mubashir PP",
  "url": "https://mubashiir.in",
  "jobTitle": "Full Stack MERN Developer",
  "worksFor": { "@type": "Organization", "name": "Orvyn Labs" },
  "address": { 
    "@type": "PostalAddress", 
    "addressLocality": "Wayanad", 
    "addressRegion": "Kerala", 
    "addressCountry": "IN" 
  },
  "email": "mubashirppofcl@gmail.com",
  "telephone": "+919072190088",
  "sameAs": [
    "https://github.com/mubashirofcl",
    "https://linkedin.com/in/mubashirpp"
  ],
  "knowsAbout": ["MERN Stack", "Next.js", "React", "Node.js", "MongoDB", "AWS", "Docker", "REST APIs", "JWT Authentication"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sora.variable} ${bebasNeue.variable} font-sans bg-[#0a0a0a] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

