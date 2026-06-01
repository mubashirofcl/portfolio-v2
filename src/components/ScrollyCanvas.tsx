"use client";

import React, { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollyCanvas({ heroRef }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const totalFrames = 120;

  // Use the shared heroRef for scroll target
  const { scrollYProgress } = useScroll({
    target: heroRef,
  });

  const pad = (num: number) => String(num).padStart(3, "0");

  // Helper to draw a specific frame on canvas with object-fit: cover logic
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image aspect ratio
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image aspect ratio
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Preload all 120 frames in the background
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];

    const handleImageLoad = (index: number) => {
      if (!active) return;
      const currentProgress = scrollYProgress.get();
      const currentFrame = Math.min(totalFrames - 1, Math.floor(currentProgress * totalFrames));
      if (index === currentFrame) {
        drawFrame(index);
      }
    };

    const handleImageError = (index: number, e: string | Event) => {
      console.error(`Failed to load frame ${index}:`, e);
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Match the sequence filenames in /public/sequence
      img.src = `/sequence/frame_${pad(i)}_delay-0.066s.webp`;
      img.onload = () => handleImageLoad(i);
      img.onerror = (e) => handleImageError(i, e);
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      active = false;
    };
  }, [scrollYProgress]);

  // Set up resize handler and initial canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Force drawing of initial scroll position frame
      const currentProgress = scrollYProgress.get();
      const frameIndex = Math.min(totalFrames - 1, Math.floor(currentProgress * totalFrames));
      drawFrame(frameIndex);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing and draw

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress]);

  // Sync canvas redraw with scroll progress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(totalFrames - 1, Math.floor(latest * totalFrames));
    if (frameIndex === lastDrawnFrameRef.current) return;
    lastDrawnFrameRef.current = frameIndex;
    requestAnimationFrame(() => drawFrame(frameIndex));
  });

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Cinematic Frame Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{ filter: "brightness(0.85) contrast(1.05)" }}
      />

      {/* Subtle overlay gradient to blend nicely with subsequent sections */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none opacity-80" />
    </div>
  );
}
