"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import VenomButton from "./VenomButton";

interface FloatingCTAProps {
  loaderDone?: boolean;
}

const TARGET_VOLUME = 0.25;
const FADE_IN_MS = 700;
const INTERACTION_EVENTS = [
  "pointerdown",
  "pointerup",
  "mousedown",
  "mouseup",
  "touchstart",
  "touchend",
  "click",
  "keydown",
] as const;

export default function FloatingCTA({ loaderDone = true }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [awaitingGesture, setAwaitingGesture] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicBtnRef = useRef<HTMLButtonElement | null>(null);
  const loaderDoneRef = useRef(loaderDone);
  const hasManuallyPausedRef = useRef(false);
  const isUnlockingRef = useRef(false);
  const isAudioUnlockedRef = useRef(false);
  const isAttemptInFlightRef = useRef(false);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Position settings:
  // Height of Venom HIRE ME button is 44px. Bottom spacing is 24px (bottom-6).
  // When HIRE ME is visible, the music button slides up to bottom-[80px] (80px = 24px + 44px + 12px gap)
  const musicButtonBottom = isVisible ? "80px" : "24px";

  const cancelFade = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeInVolume = useCallback(
    (audio: HTMLAudioElement, target = TARGET_VOLUME, durationMs = FADE_IN_MS) => {
      cancelFade();
      const startVol = 0.02;
      audio.volume = startVol;
      const startTime = Date.now();

      fadeIntervalRef.current = setInterval(() => {
        if (audio.paused) {
          cancelFade();
          return;
        }
        const elapsed = Math.max(0, Date.now() - startTime);
        const progress = Math.min(1, elapsed / durationMs);
        // Smooth ease-out curve for volume fade-in
        const eased = 1 - Math.pow(1 - progress, 3);
        const nextVol = Math.max(0, Math.min(1, startVol + (target - startVol) * eased));
        audio.volume = nextVol;

        if (progress >= 1) {
          audio.volume = target;
          cancelFade();
        }
      }, 25);
    },
    [cancelFade]
  );

  const attemptPlayAfterLoaderRef = useRef<() => void>(() => {});

  useEffect(() => {
    // 1. Initialize local preloaded audio element on mount for zero-latency playback
    const audio = new Audio("/audio/bg-music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = TARGET_VOLUME;
    audio.load();
    audioRef.current = audio;

    let listenersActive = false;

    const removeInteractionListeners = () => {
      if (!listenersActive) return;
      listenersActive = false;
      INTERACTION_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, handleUserInteraction, true);
      });
    };

    const addInteractionListeners = () => {
      if (listenersActive) return;
      listenersActive = true;
      INTERACTION_EVENTS.forEach((evt) => {
        window.addEventListener(evt, handleUserInteraction, {
          capture: true,
          passive: true,
        });
      });
    };

    const syncPlaying = () => {
      if (!isUnlockingRef.current) {
        setIsPlaying(true);
        setAwaitingGesture(false);
      }
    };

    const syncPaused = () => {
      if (!isUnlockingRef.current) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("play", syncPlaying);
    audio.addEventListener("playing", syncPlaying);
    audio.addEventListener("pause", syncPaused);
    audio.addEventListener("ended", syncPaused);

    const attemptPlayAfterLoader = () => {
      if (!loaderDoneRef.current || hasManuallyPausedRef.current) return;

      if (!audio.paused) {
        audio.muted = false;
        setIsPlaying(true);
        setAwaitingGesture(false);
        removeInteractionListeners();
        return;
      }

      if (isAttemptInFlightRef.current) return;
      isAttemptInFlightRef.current = true;
      isUnlockingRef.current = false;
      audio.muted = false;
      audio.volume = 0.02;

      audio
        .play()
        .then(() => {
          isAttemptInFlightRef.current = false;
          if (hasManuallyPausedRef.current) {
            audio.pause();
            return;
          }
          setIsPlaying(true);
          setAwaitingGesture(false);
          fadeInVolume(audio, TARGET_VOLUME, FADE_IN_MS);
          removeInteractionListeners();
        })
        .catch(() => {
          isAttemptInFlightRef.current = false;
          audio.volume = TARGET_VOLUME;
          if (loaderDoneRef.current && !hasManuallyPausedRef.current) {
            setAwaitingGesture(true);
          }
          // Keep capture listeners armed until a qualifying user activation resolves play()
          addInteractionListeners();
        });
    };

    attemptPlayAfterLoaderRef.current = attemptPlayAfterLoader;

    // Silently unlock audio element if user taps/clicks while Masthead loader is visible
    const unlockDuringLoader = () => {
      if (
        loaderDoneRef.current ||
        hasManuallyPausedRef.current ||
        isAudioUnlockedRef.current ||
        isUnlockingRef.current ||
        isAttemptInFlightRef.current ||
        !audio.paused
      ) {
        return;
      }

      isUnlockingRef.current = true;
      audio.muted = true;

      audio
        .play()
        .then(() => {
          isAudioUnlockedRef.current = true;
          if (!loaderDoneRef.current) {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = false;
            isUnlockingRef.current = false;
          } else {
            // Loader finished right as silent unlock resolved: transition directly to audible playback
            isUnlockingRef.current = false;
            audio.muted = false;
            if (!hasManuallyPausedRef.current) {
              setIsPlaying(true);
              setAwaitingGesture(false);
              fadeInVolume(audio, TARGET_VOLUME, FADE_IN_MS);
              removeInteractionListeners();
            } else {
              audio.pause();
            }
          }
        })
        .catch(() => {
          audio.muted = false;
          isUnlockingRef.current = false;
        });
    };

    function handleUserInteraction(e: Event) {
      if (hasManuallyPausedRef.current) return;

      // Let toggleMusic handle clicks on the FloatingCTA music button itself
      if (
        musicBtnRef.current &&
        e.target instanceof Node &&
        musicBtnRef.current.contains(e.target)
      ) {
        return;
      }

      if (!loaderDoneRef.current) {
        unlockDuringLoader();
      } else {
        attemptPlayAfterLoader();
      }
    }

    const handleMastheadComplete = () => {
      loaderDoneRef.current = true;
      attemptPlayAfterLoader();
    };

    // Arm capture listeners immediately so early gestures unlock and post-loader gestures start playback
    addInteractionListeners();
    window.addEventListener("masthead:complete", handleMastheadComplete);

    // If component mounts when loader is already complete (e.g., pages without loader), attempt play right away
    if (loaderDoneRef.current) {
      attemptPlayAfterLoader();
    }

    // Scroll listener for the "Hire Me" button visibility
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelFade();
      removeInteractionListeners();
      window.removeEventListener("masthead:complete", handleMastheadComplete);
      window.removeEventListener("scroll", handleScroll);
      audio.removeEventListener("play", syncPlaying);
      audio.removeEventListener("playing", syncPlaying);
      audio.removeEventListener("pause", syncPaused);
      audio.removeEventListener("ended", syncPaused);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
      isAudioUnlockedRef.current = false;
      isUnlockingRef.current = false;
      isAttemptInFlightRef.current = false;
    };
  }, [cancelFade, fadeInVolume]);

  // Trigger autoplay as soon as React state notifies loader completion
  useEffect(() => {
    loaderDoneRef.current = loaderDone;
    if (loaderDone) {
      attemptPlayAfterLoaderRef.current();
    }
  }, [loaderDone]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying || !audio.paused) {
      hasManuallyPausedRef.current = true;
      cancelFade();
      audio.pause();
      setIsPlaying(false);
      setAwaitingGesture(false);
    } else {
      hasManuallyPausedRef.current = false;
      isUnlockingRef.current = false;
      audio.muted = false;
      audio.volume = 0.02;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setAwaitingGesture(false);
          fadeInVolume(audio, TARGET_VOLUME, 450);
        })
        .catch((err) => {
          audio.volume = TARGET_VOLUME;
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
        ref={musicBtnRef}
        onClick={toggleMusic}
        animate={{ bottom: musicButtonBottom }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`fixed right-[26px] z-50 w-[100px] h-[40px] rounded-full bg-[#111111]/90 backdrop-blur-md border text-accent-highlight hover:border-accent-highlight/40 flex items-center justify-center hover:scale-[1.03] transition-all select-none cursor-pointer ${
          awaitingGesture && !isPlaying
            ? "border-accent-highlight/50 shadow-[0_0_24px_rgba(83,79,255,0.28)]"
            : "border-[#1f1f1f] shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
        }`}
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

      {/* Floating Venom Hire Me Button */}
      <VenomButton
        label="HIRE ME"
        gooColor="#120883"
        textColor="#FFFFFF"
        size={44}
        cursor="native"
        autoplay={false}
        active={isVisible}
        onClick={handleHireClick}
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "min(440px, 100vw)",
          height: "min(380px, 100vh)",
          zIndex: 45,
          pointerEvents: "none",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0px)" : "translateY(14px)",
          transition: "opacity 280ms ease, transform 280ms ease",
        }}
        buttonStyle={{
          position: "absolute",
          bottom: 24,
          right: 24,
        }}
      />
    </>
  );
}
