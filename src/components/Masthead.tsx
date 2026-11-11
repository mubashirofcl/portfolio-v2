/* eslint-disable */
// Masthead Reveal — Originkit

"use client"

/**
 * Masthead — the wordmark set as a full-width masthead, letters rising out of a baseline mask one
 * at a time as the load passes each letter's share, over a hairline rule that draws across with
 * the progress and a small three-digit count.
 * Each letter is triggered by progress but then rises on its own 1.1s curve, so a surge sends a
 * run of letters up in quick succession and a stall leaves the word half set.
 * Reveal: the letters leave through the top of the mask, then the sheet folds up from the bottom.
 * Usage: pin over the page (Position Fixed, 100% × 100%). Loops on the canvas; in preview/live it
 * plays once, waits for the real page load, reveals, then fades out.
 */
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MutableRefObject } from "react"

// Framer's editing canvas does not exist outside Framer: this build always
// renders in a real browser. Same values the live preview runs under.
const RenderTarget = {
    current: () => "preview",
    hasRestrictions: () => false,
    canvas: "canvas",
    export: "export",
    preview: "preview",
    thumbnail: "thumbnail",
}

// ── editorial-kit v1 ──
type EdPhase = "loading" | "reveal" | "page"
interface EdFrame {
    /** Seconds since this run started. */
    t: number
    dt: number
    /** Load progress 0..1 — simulated on the canvas, held back by the real load in preview. */
    progress: number
    /** Reveal 0..1, 0 until the load completes. */
    reveal: number
    phase: EdPhase
    /** Root size in CSS px (offsetWidth / offsetHeight, so canvas zoom never leaks in). */
    w: number
    h: number
}
interface EdScene {
    revealS: number
    reset?(): void
    frame(f: EdFrame): void
}
interface EdOptions {
    /** Minimum seconds the load phase plays, even when the page is already loaded. */
    minTime: number
    onComplete?: () => void
}
interface FramerFont {
    fontFamily?: string
    fontWeight?: number | string
    fontStyle?: string
    fontSize?: number | string
    lineHeight?: number | string
    letterSpacing?: number | string
}

const ED_HOLD_S = 1.8
const ED_FADE_S = 0.35
const HERO_FONT = 'var(--font-sora), "Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
const ED_SERIF = HERO_FONT
const ED_SANS = HERO_FONT

function edRand(seed: number): () => number {
    let a = seed >>> 0
    return function () {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/** Simulated load: seeded asset chunks landing at uneven times; exactly 1 at loadS. */
function edLoadCurve(seed: number, loadS: number): (t: number) => number {
    const r = edRand(seed)
    const k = Math.min(1, loadS / 4.4)
    const chunks: { size: number; start: number; len: number }[] = []
    let total = 0
    for (let i = 0; i < 7; i++) {
        const size = 0.4 + r() * 1.2
        chunks.push({ size, start: r() * 0.78 * loadS, len: (0.25 + r() * 0.9) * k })
        total += size
    }
    chunks.push({ size: total * 0.12, start: loadS - 0.45 * k, len: 0.45 * k })
    total *= 1.12
    return (t) => {
        if (t >= loadS) return 1
        let p = 0
        for (const c of chunks) {
            const x = Math.min(1, Math.max(0, (t - c.start) / Math.max(1e-3, c.len)))
            p += c.size * x * x * (3 - 2 * x)
        }
        return Math.min(0.999, p / total)
    }
}

/** Real document load, 0..1. Images and fonts pull it up; the window load event finishes it. */
function edRealLoad(): number {
    if (typeof document === "undefined") return 1
    if (document.readyState === "complete") return 1
    const imgs = document.images
    let done = 0
    for (let i = 0; i < imgs.length; i++) if (imgs[i].complete) done++
    const frac = imgs.length ? done / imgs.length : 1
    const fonts = document.fonts && document.fonts.status === "loaded" ? 1 : 0
    return Math.min(0.95, 0.15 + 0.6 * frac + 0.2 * fonts)
}

const edClamp = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x)
/** 0..1 across the window [a, b] of x. */
const edSeg = (x: number, a: number, b: number): number => edClamp((x - a) / Math.max(1e-6, b - a))
const edLerp = (a: number, b: number, t: number): number => a + (b - a) * t
const edOutExpo = (x: number): number => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x))
const edOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3)
const edInCubic = (x: number): number => x * x * x
const edInOutCubic = (x: number): number => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const edInOutQuart = (x: number): number => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)
const edPad = (n: number, digits: number): string => String(Math.round(n)).padStart(digits, "0")

/** Font control → inline style using the hero section font in bold uppercase. */
function edFont(font: FramerFont | undefined, fallbackFamily: string = HERO_FONT): CSSProperties {
    const f = font || {}
    return {
        fontFamily: f.fontFamily || fallbackFamily,
        fontWeight: f.fontWeight ?? 800,
        fontStyle: f.fontStyle || "normal",
        letterSpacing: f.letterSpacing ?? "-0.04em",
        lineHeight: f.lineHeight ?? 1,
        textTransform: "uppercase",
    }
}

/** Root style every editorial loader shares: fixed full-screen overlay. */
function edRootStyle(style: CSSProperties | undefined): CSSProperties {
    return {
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999,
        overflow: "hidden",
        // Type is sized in container units (cqw / cqh / cqmin) so it scales with the overlay.
        containerType: "size",
        isolation: "isolate",
        pointerEvents: "auto",
        ...style,
    }
}

const useEdLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

/**
 * Runs one scene for the component's lifetime. The scene and options are read from refs
 * every frame, so the effect never re-runs on a prop change. The first frame is drawn in a
 * layout effect, before the browser paints, so there is never a frame of unstyled structure.
 */
function useEditorialLoader(
    rootRef: MutableRefObject<HTMLDivElement | null>,
    sceneRef: MutableRefObject<EdScene>,
    optsRef: MutableRefObject<EdOptions>
) {
    useEdLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return
        const onCanvas = RenderTarget.current() === RenderTarget.canvas
        const reduced =
            typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

        let w = root.offsetWidth
        let h = root.offsetHeight
        let t = 0
        let progress = 0
        let revealAt = -1
        let finished = false
        let loadS = 1
        let curve = edLoadCurve(7, 1)

        const draw = (dt: number) => {
            const revealS = reduced ? 0.4 : sceneRef.current.revealS
            const reveal = revealAt < 0 ? 0 : edClamp((t - revealAt) / revealS)
            const phase: EdPhase = revealAt < 0 ? "loading" : reveal < 1 ? "reveal" : "page"
            try {
                sceneRef.current.frame({ t, dt, progress, reveal, phase, w, h })
            } catch (e) {
                console.error(e)
            }
        }
        const restart = () => {
            loadS = reduced ? 0.6 : Math.max(0.5, optsRef.current.minTime)
            curve = edLoadCurve(7, loadS)
            t = 0
            progress = 0
            revealAt = -1
            const s = sceneRef.current
            s.reset && s.reset()
        }
        restart()
        draw(0)

        const ro = new ResizeObserver(() => {
            w = root.offsetWidth
            h = root.offsetHeight
            if (!finished) draw(0)
        })
        ro.observe(root)

        let raf = 0
        let last = -1
        const tick = (now: number) => {
            const dt = last < 0 ? 0 : Math.min(0.05, (now - last) / 1000)
            last = now
            t += dt
            const revealS = reduced ? 0.4 : sceneRef.current.revealS
            if (revealAt < 0) {
                // The real load only ever holds the simulated curve back, never pushes it on.
                const target = onCanvas ? curve(t) : Math.min(curve(t), edRealLoad())
                progress = target >= 1 ? 1 : Math.min(target, progress + dt * 1.5)
                if (progress >= 1 && t >= loadS) revealAt = t
            }
            draw(dt)
            if (revealAt >= 0 && t - revealAt >= revealS) {
                if (onCanvas) {
                    if (t - revealAt >= revealS + ED_HOLD_S) {
                        restart()
                        draw(0)
                    }
                } else {
                    finished = true
                    root.style.transition = `opacity ${ED_FADE_S}s ease`
                    root.style.opacity = "0"
                    root.style.pointerEvents = "none"
                    window.setTimeout(() => {
                        root.style.visibility = "hidden"
                    }, ED_FADE_S * 1000)
                    optsRef.current.onComplete && optsRef.current.onComplete()
                    return
                }
            }
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
        }
    }, [])
}
// ── /editorial-kit ──

const REVEAL_S = 1.6
const PAPER = "#EEEAE3"
const INK = "#151412"
/** Seconds one letter takes to rise once the load has reached it. */
const RISE_S = 1.1
/** Letter travel, % of its own line box — clears the mask with room for descenders. */
const TRAVEL = 130

interface Props {
    minTime?: number
    text?: string
    font?: FramerFont
    background?: string
    textColor?: string
    onComplete?: () => void
    style?: CSSProperties
}

function __OriginkitBase_Masthead(props: Props) {
    const { minTime = 2.2, text = "MUBASHIR.", font, background = "#0a0a0a", textColor = "#FFFFFF", style } = props
    const upperText = (text || "MUBASHIR.").toUpperCase()
    const chars = Array.from(upperText)

    const rootRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const measureRef = useRef<HTMLSpanElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const ruleRef = useRef<HTMLDivElement>(null)
    const metaRef = useRef<HTMLDivElement>(null)
    const countRef = useRef<HTMLSpanElement>(null)
    const charRefs = useRef<(HTMLSpanElement | null)[]>([])
    charRefs.current.length = chars.length
    /** Time each letter was reached by the load, -1 until then. */
    const reached = useRef<number[]>([])

    // Lock page scroll while preloader is active, release when finished
    useEffect(() => {
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = prevOverflow
        }
    }, [])

    const handleComplete = () => {
        document.body.style.overflow = ""
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("masthead:complete"))
        }
        if (props.onComplete) props.onComplete()
    }

    const optsRef = useRef<EdOptions>({ minTime })
    optsRef.current = { minTime, onComplete: handleComplete }
    const sceneRef = useRef<EdScene>({ revealS: REVEAL_S, frame() {} })
    sceneRef.current = {
        revealS: REVEAL_S,
        reset() {
            reached.current = []
        },
        frame({ t, progress, reveal, w, h }) {
            const n = chars.length
            const at = reached.current
            if (at.length !== n) {
                at.length = n
                at.fill(-1)
            }
            // Fit the word inside the 5cqw/5cqw insets (already ~90% of w), leaving another 90%
            // of slack inside THAT box — not 90% of the full root — so equal breathing room
            // survives on both sides instead of the glyphs running edge to edge on one of them.
            const m = measureRef.current
            const line = lineRef.current
            if (m && line && m.offsetWidth > 0) {
                const px = `${Math.min((100 * 0.81 * w) / m.offsetWidth, 0.42 * h).toFixed(1)}px`
                if (line.style.fontSize !== px) line.style.fontSize = px
            }
            const stagger = Math.min(0.035, 0.3 / n)
            for (let i = 0; i < n; i++) {
                if (at[i] < 0 && t > 0.15 && progress >= (i / n) * 0.9) at[i] = t
                const el = charRefs.current[i]
                if (!el) continue
                const rise = at[i] < 0 ? 0 : edOutExpo(edSeg(t - at[i], 0, RISE_S))
                const exit = edInCubic(edSeg(reveal, i * stagger, i * stagger + 0.3))
                el.style.transform = `translateY(${(1 - rise) * TRAVEL - exit * TRAVEL}%)`
            }
            const rule = ruleRef.current
            if (rule) rule.style.transform = `scaleX(${progress})`
            const count = countRef.current
            const digits = edPad(progress * 100, 3)
            if (count && count.textContent !== digits) count.textContent = digits
            const meta = metaRef.current
            if (meta) meta.style.opacity = String(edOutCubic(edSeg(t, 0.1, 0.8)) * (1 - edSeg(reveal, 0, 0.2)))
            const panel = panelRef.current
            if (panel) panel.style.clipPath = `inset(0 0 ${100 * edInOutQuart(edSeg(reveal, 0.35, 1))}% 0)`
        },
    }
    useEditorialLoader(rootRef, sceneRef, optsRef)

    const type = edFont(font, ED_SERIF)
    return (
        <div ref={rootRef} style={edRootStyle(style)}>
            <span
                ref={measureRef}
                aria-hidden="true"
                style={{ position: "absolute", left: 0, top: 0, visibility: "hidden", whiteSpace: "pre", ...type, fontSize: 100 }}
            >
                {upperText}
            </span>
            <div ref={panelRef} style={{ position: "absolute", inset: 0, background, color: textColor }}>
                <div style={{ position: "absolute", left: "5cqw", right: "5cqw", top: "50%", transform: "translateY(-50%)" }}>
                    <div
                        ref={lineRef}
                        aria-label={upperText}
                        style={{
                            ...type,
                            fontSize: "18cqw",
                            whiteSpace: "nowrap",
                            padding: "0.12em 0",
                            display: "flex",
                            justifyContent: "center",
                            clipPath: "inset(0 -10% 0 -10%)",
                            textTransform: "uppercase",
                        }}
                    >
                        <div style={{ display: "inline-block" }}>
                            {chars.map((c, i) => (
                                <span
                                    key={i}
                                    aria-hidden="true"
                                    ref={(el) => {
                                        charRefs.current[i] = el
                                    }}
                                    style={{ display: "inline-block", transform: `translateY(${TRAVEL}%)` }}
                                >
                                    {c === " " ? "\u00A0" : c}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div ref={metaRef} style={{ opacity: 0 }}>
                        <div style={{ position: "relative", height: 1, marginTop: "2.2cqh" }}>
                            <div style={{ position: "absolute", inset: 0, background: textColor, opacity: 0.16 }} />
                            <div
                                ref={ruleRef}
                                style={{ position: "absolute", inset: 0, background: textColor, transformOrigin: "0 50%", transform: "scaleX(0)" }}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "1.6cqh",
                                fontFamily: type.fontFamily,
                                fontWeight: 600,
                                fontSize: "max(11px, 1.6cqh)",
                                letterSpacing: "0.08em",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            <span ref={countRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const __originkitPresetProps = {
  "background": "#0a0a0a",
  "textColor": "#FFFFFF",
  "text": "MUBASHIR.",
  "minTime": 2.2,
};

export default function Masthead(props: Partial<Props> & Record<string, unknown>) {
  return <__OriginkitBase_Masthead {...(__originkitPresetProps as Partial<Props>)} {...props} />;
}

