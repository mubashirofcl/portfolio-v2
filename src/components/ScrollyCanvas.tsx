"use client";

import React, { useEffect, useRef } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollyCanvas({ heroRef }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const layoutRef = useRef({
    offsetX: 0,
    offsetY: 0,
    drawWidth: 0,
    drawHeight: 0,
    canvasWidth: 0,
    canvasHeight: 0,
  });
  const totalFrames = 120;

  // Use the shared heroRef for scroll target
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Responsive spring synchronized with Lenis inertia for fluid, lag-free scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.2,
    restDelta: 0.0001,
  });

  const pad = (num: number) => String(num).padStart(3, "0");

  // Fast draw using cached context and precomputed cover dimensions
  const drawFrame = (index: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

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

    const { offsetX, offsetY, drawWidth, drawHeight, canvasWidth, canvasHeight } = layoutRef.current;
    if (!canvasWidth || !canvasHeight) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Preload frames with background decode to eliminate main-thread decoding jank
  useEffect(() => {
    let active = true;
    const loadedImages: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);

    const handleImageLoad = (img: HTMLImageElement, index: number) => {
      if (!active) return;
      if (img.decode) {
        img.decode().catch(() => {}).then(() => {
          if (!active) return;
          const currentProgress = smoothProgress.get();
          const currentFrame = Math.max(0, Math.min(totalFrames - 1, Math.round(currentProgress * (totalFrames - 1))));
          if (index === currentFrame || lastDrawnFrameRef.current === -1) {
            lastDrawnFrameRef.current = index;
            drawFrame(index);
          }
        });
      } else {
        const currentProgress = smoothProgress.get();
        const currentFrame = Math.max(0, Math.min(totalFrames - 1, Math.round(currentProgress * (totalFrames - 1))));
        if (index === currentFrame || lastDrawnFrameRef.current === -1) {
          lastDrawnFrameRef.current = index;
          drawFrame(index);
        }
      }
    };

    // 1. Immediately load frame 0
    const frameZero = new Image();
    frameZero.src = `/sequence/frame_${pad(0)}_delay-0.066s.webp`;
    frameZero.onload = () => {
      loadedImages[0] = frameZero;
      handleImageLoad(frameZero, 0);
    };
    loadedImages[0] = frameZero;

    // 2. Preload remaining frames
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${pad(i)}_delay-0.066s.webp`;
      img.onload = () => handleImageLoad(img, i);
      loadedImages[i] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      active = false;
    };
  }, [smoothProgress]);

  // Set up resize handler, caching context and cover layout geometry
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctxRef.current = canvas.getContext("2d", { alpha: true });

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap DPR to 1.5 to match 1080p source sequence resolution and save >50% GPU fill rate
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const canvasWidth = Math.round(rect.width * dpr);
      const canvasHeight = Math.round(rect.height * dpr);

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const imgWidth = 1920;
      const imgHeight = 1080;
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

      layoutRef.current = {
        offsetX,
        offsetY,
        drawWidth,
        drawHeight,
        canvasWidth,
        canvasHeight,
      };

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
