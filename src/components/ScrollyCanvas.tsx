"use client";

import React, { useEffect, useRef } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollyCanvas({ heroRef }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const totalFrames = 120;

  // Use the shared heroRef for scroll target
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Physics-based spring smoothing for liquid-smooth canvas scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.0001,
  });

  const pad = (num: number) => String(num).padStart(3, "0");

  // Helper to draw a specific frame on canvas with object-fit: cover logic
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get image or closest loaded fallback to prevent any black/empty frames
    let img = imagesRef.current[index];
    if (!img || !img.complete) {
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = imagesRef.current[index - offset];
        if (index - offset >= 0 && prev?.complete) {
          img = prev;
          break;
        }
        const next = imagesRef.current[index + offset];
        if (index + offset < totalFrames && next?.complete) {
          img = next;
          break;
        }
      }
      if (!img || !img.complete) return;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (!canvasWidth || !canvasHeight) return;

    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    if (!imgWidth || !imgHeight) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Preload frames with immediate priority on the first 10 frames
  useEffect(() => {
    let active = true;
    const loadedImages: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);

    const handleImageLoad = (index: number) => {
      if (!active) return;
      const currentProgress = smoothProgress.get();
      const currentFrame = Math.max(0, Math.min(totalFrames - 1, Math.round(currentProgress * (totalFrames - 1))));
      if (index === currentFrame || lastDrawnFrameRef.current === -1) {
        lastDrawnFrameRef.current = index;
        drawFrame(index);
      }
    };

    // 1. Immediately load frame 0
    const frameZero = new Image();
    frameZero.src = `/sequence/frame_${pad(0)}_delay-0.066s.webp`;
    frameZero.onload = () => {
      loadedImages[0] = frameZero;
      handleImageLoad(0);
    };
    loadedImages[0] = frameZero;

    // 2. Preload remaining frames
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${pad(i)}_delay-0.066s.webp`;
      img.onload = () => handleImageLoad(i);
      loadedImages[i] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      active = false;
    };
  }, [smoothProgress]);

  // Set up resize handler and initial canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 to preserve GPU performance
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const currentProgress = smoothProgress.get();
      const frameIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(currentProgress * (totalFrames - 1))));
      drawFrame(frameIndex);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [smoothProgress]);

  // Sync canvas redraw with spring-smoothed progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // Stop canvas updates completely once scrolled past hero
    if (latest > 1.02) return;

    const frameIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(latest * (totalFrames - 1))));
    if (frameIndex === lastDrawnFrameRef.current) return;
    lastDrawnFrameRef.current = frameIndex;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(frameIndex);
      rafIdRef.current = null;
    });
  });

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-transparent z-10 pointer-events-none">
      {/* Cinematic Transparent Frame Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover will-change-transform"
        style={{ filter: "brightness(0.92) contrast(1.05)" }}
      />
    </div>
  );
}
