<h2 align="center"> ⚛ Mubashir PP – Premium Developer Portfolio </h2>

<h4 align="center">
  A high-performance, dark-themed interactive developer portfolio showcasing full-stack capabilities, fluid animations, and systems engineering.
</h4>

<p align="center">
  <a href="https://mubashiir.in" target="_blank">
    <img src="https://img.shields.io/badge/🔗 Live Portfolio-c8f542?style=for-the-badge&logo=google-chrome&logoColor=black">
  </a>
</p>

---

## 📖 About the Project

This is the source code for the personal portfolio of **Mubashir PP**, a Full-Stack Engineer and MERN Stack Developer. 
The application is designed with a premium, sleek dark monochrome aesthetic using lime green (`#c8f542`) accents. 

Built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **GSAP**, it delivers micro-animations, interactive visual roadmaps, a background music controller, and high-performance scrolling logic without layout thrashing.

---

## 🛠️ Tech Stack & Key Libraries

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS (Custom monochrome and lime HSL variables)
- **Animations**: Framer Motion & GSAP (GreenSock) for high-performance scroll transitions
- **Scroll Physics**: Lenis (Smooth scroll setup)
- **Mail Integration**: Nodemailer (Secure SMTP transporter with fallback routes)
- **Interactive Gestures**: `@use-gesture/react`

---

## ✨ Features

### 🚀 High-Performance Canvas Scroll (60 FPS)
- Built-in `ScrollyCanvas` that caches drawn frames (`lastDrawnFrameRef`) and offsets to prevent layout thrashing and keep rendering speeds locked at 60 FPS even on lower-end devices.

### 🎵 Autoplay Background Music
- Auto-playing ambient track (`VAX - Fireproof`) bypassing modern browser autoplay restrictions via user interaction triggers.
- Custom pill-shaped toggler styled symmetrically matching the **"Hire Me"** button, featuring a dynamic visual equalizer/music wave SVG indicator driven by Framer Motion.

### 🗺️ Curved Snaking Timeline
- A visual horizontal-to-vertical snaking timeline built with SVG bezier paths tracking milestones from BCA graduation to Orvyn Labs' foundation.

### 📧 SMTP Contact Integration
- A functional, direct contact routing system integrated with **Nodemailer** supporting secure SSL SMTP dispatch and local simulation fallbacks if credentials are not configured.

### 📊 Real-Time Project Tracker
- A dedicated **Ongoing Project** section featuring specs, client scopes, and dynamic live progress visual bars for **InvoiceGen Premium** (Emerald PMS Resort Suite).

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mubashirofcl/portfolio-v2.git
cd portfolio-v2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🏗️ Folder Structure

```
├── public/                  # Static assets (3D canvas frame sequences, mockups, pdfs)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/     # SMTP mail submission route
│   │   ├── layout.tsx       # Core page wrapper, font preloading, and SEO tags
│   │   └── page.tsx         # Main entry point aggregating sections
│   ├── components/          # Reusable custom interactive elements
│   │   ├── FloatingCTA.tsx  # Music player control & Hire Me actions
│   │   ├── JourneyTimeline.ts # Curved snaking SVG journey roadmap
│   │   ├── ScrollyCanvas.tsx # Preloaded WebP frame sequences
│   │   ├── OngoingProject.tsx# Real-time ongoing project details section
│   │   └── ...
│   └── ...
```

---

## 🌐 Connect with Me

- **Website**: [mubashiir.in](https://mubashiir.in)
- **LinkedIn**: [linkedin.com/in/mubashirpp](https://linkedin.com/in/mubashirpp)
- **GitHub**: [github.com/mubashirofcl](https://github.com/mubashirofcl)
- **Email**: [mubashirppofcl@gmail.com](mailto:mubashirppofcl@gmail.com)
- **Agency**: [Orvyn Labs](https://github.com/orvynlabs)

---
<p align="center">Designed with intention • Built with passion</p>
