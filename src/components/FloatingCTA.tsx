"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasManuallyPausedRef = useRef(false);

  // Position settings:
  // Height of Hire Me button is ~42px. Bottom spacing is 24px (bottom-6).
  // When Hire Me is visible, the music button slides up to bottom-[78px] (78px = 24px + 42px + 12px gap)
  const musicButtonBottom = isVisible ? "78px" : "24px";

  useEffect(() => {
    // 1. Initialize audio element on mount for SSR compliance
    const audio = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/VAX%20-%20Fireproof%20Feat%20Teddy%20Sky.mp3");
    audio.loop = true;
    audio.volume = 0.25; // Subtle ambient volume
    audioRef.current = audio;

    // 2. Playback activation mechanism
    const attemptPlay = () => {
      if (hasManuallyPausedRef.current) return;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          removeInteractionListeners();
        })
        .catch(() => {
          // Keep waiting for user interactions if browser blocks autoplay
        });
    };

    const handleInteraction = () => {
      attemptPlay();
    };

    const addInteractionListeners = () => {
      window.addEventListener("click", handleInteraction, { once: true });
      window.addEventListener("scroll", handleInteraction, { once: true });
      window.addEventListener("touchstart", handleInteraction, { once: true });
      window.addEventListener("keydown", handleInteraction, { once: true });
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    // Attempt direct play
    attemptPlay();

    // Set up listeners for the first user interaction to bypass autoplay blocks
    addInteractionListeners();

    // Scroll listener for the "Hire Me" button visibility
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      removeInteractionListeners();
      window.removeEventListener("scroll", handleScroll);
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      hasManuallyPausedRef.current = true;
    } else {
      hasManuallyPausedRef.current = false;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback failed:", err);
        });
    }
  };

  const handleHireClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants for the music wave bars
  const barVariants = {
    playing: (duration: number) => ({
      scaleY: [0.3, 1.0, 0.3],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
      },
    }),
    paused: {
      scaleY: 0.3,
    },
  };

  return (
    <>
      {/* Background Music Control Button */}
      <motion.button
        onClick={toggleMusic}
        animate={{ bottom: musicButtonBottom }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed right-7 z-50 w-[100px] h-[40px] rounded-full bg-[#111111]/90 backdrop-blur-md border border-[#1f1f1f] text-accent-highlight hover:border-accent-highlight/40 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:scale-[1.03] transition-all select-none cursor-pointer"
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {/* Animated Music Wave Bars */}
        <div className="flex items-end justify-center gap-[2.5px] h-[14px] w-[18px] select-none">
          <motion.span
            variants={barVariants}
            animate={isPlaying ? "playing" : "paused"}
            custom={0.6}
            className="w-[2px] h-full bg-accent-highlight origin-bottom rounded-full"
          />
          <motion.span
            variants={barVariants}
            animate={isPlaying ? "playing" : "paused"}
            custom={0.8}
            className="w-[2px] h-full bg-accent-highlight origin-bottom rounded-full"
          />
          <motion.span
            variants={barVariants}
            animate={isPlaying ? "playing" : "paused"}
            custom={0.5}
            className="w-[2px] h-full bg-accent-highlight origin-bottom rounded-full"
          />
          <motion.span
            variants={barVariants}
            animate={isPlaying ? "playing" : "paused"}
            custom={0.7}
            className="w-[2px] h-full bg-accent-highlight origin-bottom rounded-full"
          />
        </div>
      </motion.button>

      {/* Floating Hire Me Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.a
            href="#contact"
            onClick={handleHireClick}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center text-xs font-sans font-bold uppercase tracking-wider text-[#0a0a0a] bg-accent-highlight rounded-full px-6 py-3.5 shadow-[0_8px_30px_rgba(200,245,66,0.3)] hover:bg-[#b5e02c] hover:scale-[1.03] transition-all select-none"
          >
            Hire Me
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
