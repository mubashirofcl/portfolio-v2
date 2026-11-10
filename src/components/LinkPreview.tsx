/* eslint-disable */
// Link Preview — Originkit

"use client";

import React, { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface ImageValue {
  src: string;
  srcSet?: string;
  alt?: string;
}

export interface LinkPreviewProps {
  title: string;
  link?: string;
  imageMode?: "original" | "custom";
  customImage?: ImageValue;
  previewWidth?: number;
  previewHeight?: number;
  radius?: number;
  shadow?: boolean;
  shadowColor?: string;
  textColor?: string;
  underlineColor?: string;
  placement?: "top" | "bottom";
  align?: "center" | "left" | "right";
  font?: CSSProperties;
  style?: CSSProperties;
  className?: string;
}

// Resolve the website's own representative image (og:image) for external links
function originalImage(link?: string): string | undefined {
  if (!link) return undefined;
  return `https://api.microlink.io/?url=${encodeURIComponent(link)}&embed=image.url`;
}

export default function LinkPreview(props: LinkPreviewProps) {
  const {
    title = "About",
    link = "/about",
    imageMode = "custom",
    customImage = {
      src: "/portfolio-img.png",
      alt: "About Mubashir",
    },
    previewWidth = 320,
    previewHeight = 180,
    radius = 16,
    shadow = true,
    shadowColor = "rgba(0,0,0,0.5)",
    textColor = "#e8e8e8",
    underlineColor = "transparent",
    placement = "bottom",
    align = "right",
    font,
    style,
    className,
  } = props;

  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.6 });
  const translateX = useTransform(springX, [0, 1], [-25, 25]);

  const onMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / Math.max(1, rect.width);
    x.set(Math.max(0, Math.min(1, ratio)));
  };

  const imgSrc =
    imageMode === "custom"
      ? customImage?.src || "/portfolio-img.png"
      : originalImage(link) || "/portfolio-img.png";
  const imgSrcSet = imageMode === "custom" ? customImage?.srcSet : undefined;

  // Placement calculation
  const isTop = placement === "top";
  const positionStyles: CSSProperties = isTop
    ? { bottom: "calc(100% + 14px)" }
    : { top: "calc(100% + 14px)" };

  // Alignment calculation
  if (align === "right") {
    positionStyles.right = 0;
  } else if (align === "left") {
    positionStyles.left = 0;
  } else {
    positionStyles.left = "50%";
    positionStyles.marginLeft = -previewWidth / 2;
  }

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width: "auto",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
    >
      <Link
        href={link || "/about"}
        style={{
          color: textColor,
          textDecoration: underlineColor !== "transparent" ? "underline" : "none",
          textDecorationColor: underlineColor,
          textUnderlineOffset: "0.22em",
          textDecorationThickness: "1.5px",
          whiteSpace: "nowrap",
          cursor: "pointer",
          transition: "color 0.2s ease",
          ...font,
        }}
        className="hover:text-accent-highlight transition-colors"
      >
        {title}
      </Link>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: isTop ? 12 : -12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isTop ? 8 : -8, scale: 0.96 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
            }}
            style={{
              position: "absolute",
              ...positionStyles,
              x: align === "center" ? translateX : 0,
              width: previewWidth,
              height: previewHeight,
              borderRadius: radius,
              overflow: "hidden",
              background: "#111111",
              boxShadow: shadow
                ? `0 20px 40px ${shadowColor}, 0 0 20px rgba(83, 79, 255, 0.15)`
                : "none",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            <img
              src={imgSrc}
              srcSet={imgSrcSet}
              alt={customImage?.alt || title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              draggable={false}
            />

            {/* Subtle Gradient & Badge overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 14,
                right: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#534fff",
                  fontFamily: "var(--font-sora), sans-serif",
                }}
              >
                ✦ Explore Biography
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                mubashiir.in/about ↗
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

