/* eslint-disable */
// Grainy Carousel — Originkit

"use client";

import { animate } from "framer-motion";
import * as React from "react";
import { useEffect, useRef } from "react";

type Motion = {
  type?: "spring" | "tween" | "keyframes" | "inertia";
  duration?: number;
  ease?: [number, number, number, number];
  delay?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  bounce?: number;
  restSpeed?: number;
  restDelta?: number;
};

const DEFAULT_TRANSITION: Motion = {
  type: "tween",
  duration: 0.5,
  ease: [0, 0, 0.58, 1],
};

export interface CardMeta {
  title?: string;
  badge?: string;
  category?: string;
}

export interface ScrollGroup {
  mode?: "smooth" | "snap";
  drag?: number;
  damping?: number;
  zoom?: number;
}

export interface GrainGroup {
  speed?: number;
  amount?: number;
  scale?: number;
}

export interface GrainyCarouselProps {
  images?: string[];
  metaList?: CardMeta[];
  background?: string;
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  rounded?: number;
  speed?: number;
  scroll?: ScrollGroup;
  grain?: GrainGroup;
  transition?: Motion;
  onCardClick?: (index: number) => void;
  style?: React.CSSProperties;
  className?: string;
}

const DRAG_GAIN_MIN = 0.5;
const DRAG_GAIN_MAX = 2.5;
const CLICK_SLOP = 5;
const SMOOTH_AT_50 = 90;
const SNAP_INTERVAL_AT_50 = 5;
const NOISE_AT_50 = 0.15;
const DAMP_AT_100 = 0.5;
const DEFAULT_CARD_W = 580;
const DEFAULT_CARD_H = 350;
const GRAIN_WIDTH = 1;

const DEFAULT_SCROLL: Required<ScrollGroup> = {
  mode: "smooth",
  drag: 25,
  damping: 60,
  zoom: 0,
};

const DEFAULT_GRAIN: Required<GrainGroup> = {
  speed: 50,
  amount: 12,
  scale: 250,
};

const VERT = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;

uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec2  uResolution;
uniform float uEdgeWidth;
uniform float uNoiseSpeed;
uniform float uGrainScale;
uniform float uGrainAmount;

varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m  = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m * m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p  = p * 2.1 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  float leftBand  = 1.0 - smoothstep(0.0, uEdgeWidth, vUv.x);
  float rightBand = smoothstep(1.0 - uEdgeWidth, 1.0, vUv.x);
  float xMask     = max(leftBand, rightBand);

  if (xMask <= 0.001) {
      gl_FragColor = texture2D(tDiffuse, vUv);
      return;
  }

  float mask = pow(xMask, 3.0) * 3.0;
  float ar = uResolution.x / max(uResolution.y, 1.0);

  float t = uTime * uNoiseSpeed * (uGrainScale * 0.015);

  vec2 noiseUV = vec2(vUv.x * ar, vUv.y) * uGrainScale;

  float dx = fbm(noiseUV + vec2(t, t * 0.5)) * uGrainAmount;
  float dy = fbm(noiseUV + vec2(-t * 0.3, t * 0.8)) * uGrainAmount;

  vec2 warpedUV = clamp(vUv + vec2(dx, dy) * mask, 0.0, 1.0);
  vec4 col = texture2D(tDiffuse, warpedUV);

  float colorDecay = max(smoothstep(1.0, 0.1, mask / 6.0), 0.1);

  gl_FragColor = vec4(col.rgb * colorDecay, col.a);
} `;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
  pct: number,
  meta?: CardMeta,
  isMobile: boolean = false
) {
  const t = Math.max(0, Math.min(100, pct)) / 100;
  const short = Math.min(boxW, boxH);
  const x = boxX + (t * (boxW - short)) / 2;
  const y = boxY + (t * (boxH - short)) / 2;
  const w = boxW - t * (boxW - short);
  const h = boxH - t * (boxH - short);
  const r = isMobile ? 16 : Math.min(22, (t * short) / 2 + 10);

  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
  ctx.clip();

  // Solid dark background so card is never transparent even before image completes
  ctx.fillStyle = "#141414";
  ctx.fillRect(x, y, w, h);

  // Draw underlying screenshot
  if (img && img.complete && img.naturalWidth) {
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = w / h;
    let sx: number;
    let sy: number;
    let sw: number;
    let sh: number;
    if (imgRatio > boxRatio) {
      sh = img.naturalHeight;
      sw = sh * boxRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / boxRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  // Subtle dark gradient vignette for readable text overlay
  const grad = ctx.createLinearGradient(0, y + h * 0.35, 0, y + h);
  grad.addColorStop(0, "rgba(10, 10, 10, 0)");
  grad.addColorStop(0.35, "rgba(10, 10, 10, 0.4)");
  grad.addColorStop(0.75, "rgba(10, 10, 10, 0.88)");
  grad.addColorStop(1, "rgba(10, 10, 10, 0.98)");
  ctx.fillStyle = grad;
  ctx.fillRect(x, y + h * 0.35, w, h * 0.65);

  // Border stroke
  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Card Content Overlay
  if (meta?.title) {
    const pad = isMobile ? 16 : 24;

    // Top Badge Pill
    if (meta.badge) {
      ctx.save();
      const badgeText = meta.badge.toUpperCase();
      ctx.font = isMobile ? "bold 9px sans-serif" : "bold 10px sans-serif";
      const bW = ctx.measureText(badgeText).width + 16;
      const bH = isMobile ? 20 : 24;
      const bX = x + pad;
      const bY = y + (isMobile ? 14 : 20);

      ctx.fillStyle = "rgba(10, 10, 10, 0.75)";
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bX, bY, bW, bH, bH / 2) : ctx.rect(bX, bY, bW, bH);
      ctx.fill();
      ctx.strokeStyle = "rgba(83, 79, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#534fff"; // Electric blue accent matching HalftoneBloom
      ctx.textAlign = "left";
      ctx.fillText(badgeText, bX + 8, bY + (isMobile ? 14 : 16));
      ctx.restore();
    }

    // Bottom Title
    ctx.fillStyle = "#ffffff";
    const titleSize = isMobile ? 18 : 24;
    ctx.font = `bold ${titleSize}px sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(meta.title, x + pad, y + h - (isMobile ? 18 : 24));

    // Bottom-Right Case Study Action Pill
    ctx.save();
    const hintW = isMobile ? 86 : 126;
    const hintH = isMobile ? 24 : 28;
    const hintX = x + w - hintW - pad;
    const hintY = y + h - (isMobile ? 38 : 44);

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(hintX, hintY, hintW, hintH, 6) : ctx.rect(hintX, hintY, hintW, hintH);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = isMobile ? "bold 9px sans-serif" : "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(isMobile ? "VIEW ↗" : "CASE STUDY ↗", hintX + hintW / 2, hintY + (isMobile ? 16 : 18));
    ctx.restore();
  }

  ctx.restore();
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.warn("GrainyCarousel shader:", gl.getShaderInfoLog(s));
  return s;
}

interface Resolved {
  images: string[];
  metaList: CardMeta[];
  mediaKey: string;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  rounded: number;
  mode: "smooth" | "snap";
  dragGain: number;
  smoothRate: number;
  snapInterval: number;
  damping: number;
  zoom: number;
  edgeWidth: number;
  noiseSpeed: number;
  grainAmount: number;
  grainScale: number;
  onCardClick?: (index: number) => void;
}

function resolve(p: GrainyCarouselProps): Resolved {
  const scroll = { ...DEFAULT_SCROLL, ...p.scroll };
  const grain = { ...DEFAULT_GRAIN, ...p.grain };
  const images = p.images && p.images.length ? p.images : [];
  const metaList = p.metaList || [];
  const speed = p.speed ?? 155;
  return {
    images,
    metaList,
    mediaKey: images.join("|"),
    cardWidth: Math.max(1, Math.round(p.cardWidth ?? DEFAULT_CARD_W)),
    cardHeight: Math.max(1, Math.round(p.cardHeight ?? DEFAULT_CARD_H)),
    gap: p.gap ?? 20,
    rounded: p.rounded ?? 8,
    mode: scroll.mode,
    dragGain:
      DRAG_GAIN_MIN +
      (Math.max(0, Math.min(100, scroll.drag)) / 100) *
        (DRAG_GAIN_MAX - DRAG_GAIN_MIN),
    smoothRate: (speed / 50) * SMOOTH_AT_50,
    snapInterval:
      speed <= 0 ? Infinity : SNAP_INTERVAL_AT_50 * (50 / speed),
    damping: (Math.max(1, Math.min(100, scroll.damping)) / 100) * DAMP_AT_100,
    zoom: Math.max(0, Math.min(100, scroll.zoom)) / 100,
    edgeWidth: GRAIN_WIDTH,
    noiseSpeed: (grain.speed / 50) * NOISE_AT_50,
    grainAmount: Math.max(0, Math.min(100, grain.amount)) / 100,
    grainScale: grain.scale,
    onCardClick: p.onCardClick,
  };
}

export default function GrainyCarousel(props: GrainyCarouselProps) {
  const p = resolve(props);
  const background = props.background ?? "transparent";

  const hostRef = useRef<HTMLDivElement>(null);
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLCanvasElement>(null);

  const transitionRef = useRef(props.transition ?? DEFAULT_TRANSITION);
  transitionRef.current = props.transition ?? DEFAULT_TRANSITION;

  const propsRef = useRef(p);
  propsRef.current = p;

  useEffect(() => {
    const host = hostRef.current;
    const canvas = glCanvasRef.current;
    const fallback = fallbackRef.current;
    if (!host || !canvas || !fallback) return;

    const strip = document.createElement("canvas");
    const stripCtx = strip.getContext("2d");

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    });

    let prog: WebGLProgram | null = null;
    let tex: WebGLTexture | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uResolution: WebGLUniformLocation | null = null;
    let uEdgeWidth: WebGLUniformLocation | null = null;
    let uNoiseSpeed: WebGLUniformLocation | null = null;
    let uGrainScale: WebGLUniformLocation | null = null;
    let uGrainAmount: WebGLUniformLocation | null = null;
    let posBuf: WebGLBuffer | null = null;
    let uvBuf: WebGLBuffer | null = null;
    let hasGL = false;

    if (gl) {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        hasGL = true;
        gl.useProgram(prog);
        const verts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
        posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(prog, "position");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
        uvBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
        gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
        const aUv = gl.getAttribLocation(prog, "uv");
        gl.enableVertexAttribArray(aUv);
        gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
        uTime = gl.getUniformLocation(prog, "uTime");
        uResolution = gl.getUniformLocation(prog, "uResolution");
        uEdgeWidth = gl.getUniformLocation(prog, "uEdgeWidth");
        uNoiseSpeed = gl.getUniformLocation(prog, "uNoiseSpeed");
        uGrainScale = gl.getUniformLocation(prog, "uGrainScale");
        uGrainAmount = gl.getUniformLocation(prog, "uGrainAmount");
        tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      }
    }
    canvas.style.opacity = hasGL ? "1" : "0";
    fallback.style.opacity = hasGL ? "0" : "1";

    let loaded: HTMLImageElement[] = [];
    let mediaKey = "";
    const buildMedia = () => {
      mediaKey = propsRef.current.mediaKey;
      loaded = propsRef.current.images.map((src) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        return img;
      });
    };
    buildMedia();

    let vw = 1;
    let vh = 1;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = Math.max(1, host.clientWidth);
      vh = Math.max(1, host.clientHeight);
      const bw = Math.round(vw * dpr);
      const bh = Math.round(vh * dpr);
      for (const c of [canvas, fallback, strip]) {
        c.width = bw;
        c.height = bh;
      }
      if (gl && hasGL) gl.viewport(0, 0, bw, bh);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let scrollX = 0;
    let snapAnim: { stop: () => void } | null = null;
    const stopSnap = () => {
      snapAnim?.stop();
      snapAnim = null;
    };
    let targetX = 0;
    let snapTimer = 0;
    let itemWidth = 1;
    let centerOffset = 0;
    let currentDrawW = 1;
    let currentDrawH = 1;

    const drag = { active: false, id: -1, last: 0, x0: 0, y0: 0, click: true, isDraggingX: false };

    const onDown = (e: PointerEvent) => {
      drag.active = true;
      stopSnap();
      drag.id = e.pointerId;
      drag.last = e.clientX;
      drag.x0 = e.clientX;
      drag.y0 = e.clientY;
      drag.click = true;
      drag.isDraggingX = false;
    };

    const onMove = (e: PointerEvent) => {
      if (!drag.active || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0;
      const dy = e.clientY - drag.y0;

      if (!drag.isDraggingX) {
        if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
          drag.isDraggingX = true;
        } else if (Math.abs(dy) > 8) {
          // Natural vertical scrolling - release horizontal carousel drag
          drag.active = false;
          return;
        }
      }

      if (drag.isDraggingX) {
        targetX -= (e.clientX - drag.last) * propsRef.current.dragGain;
        drag.last = e.clientX;
        snapTimer = 0;
      }
      if (Math.abs(dx) > CLICK_SLOP || Math.abs(dy) > CLICK_SLOP) {
        drag.click = false;
      }
    };

    const onUp = (e: PointerEvent) => {
      if (!drag.active || e.pointerId !== drag.id) return;
      drag.active = false;
      if (!loaded.length || itemWidth <= 0) return;
      const current = Math.round((targetX + centerOffset) / itemWidth);
      if (drag.click) {
        const hostRect = host.getBoundingClientRect();
        const clickX = e.clientX - hostRect.left;
        const clickY = e.clientY - hostRect.top;
        const steps = Math.round((clickX - vw / 2) / itemWidth);
        targetX = (current + steps) * itemWidth - centerOffset;
        snapTimer = 0;

        // Determine which card was clicked
        const total = Math.max(1, loaded.length * itemWidth);
        let wrapped = scrollX % total;
        if (wrapped < 0) wrapped += total;
        const startX = -wrapped;
        const relX = clickX - startX;
        const rawIdx = Math.floor(relX / itemWidth);
        const cardOffset = ((relX % itemWidth) + itemWidth) % itemWidth;
        const cardY = (vh - currentDrawH) / 2;
        const isMobile = vw < 640;
        const padY = isMobile ? 30 : 0;

        if (cardOffset <= currentDrawW && clickY >= cardY - padY && clickY <= cardY + currentDrawH + padY) {
          const projectIndex = ((rawIdx % loaded.length) + loaded.length) % loaded.length;
          propsRef.current.onCardClick?.(projectIndex);
        }
      } else if (propsRef.current.mode === "snap") {
        targetX = current * itemWidth - centerOffset;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (propsRef.current.mode === "smooth")
        targetX += e.deltaX || e.deltaY;
    };

    let isHovered = false;
    const onEnter = () => { isHovered = true; };
    const onLeave = () => { isHovered = false; };
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);

    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    host.addEventListener("wheel", onWheel, { passive: true });

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const c = propsRef.current;

      if (c.mediaKey !== mediaKey) buildMedia();

      // Responsive card scale for mobile / small displays
      const isMobile = vw < 640;
      const isTablet = vw >= 640 && vw < 1024;

      const maxW = isMobile
        ? Math.min(340, vw - 36)
        : isTablet
        ? Math.min(520, vw * 0.85)
        : Math.min(c.cardWidth, vw * 0.9);

      const drawW = Math.max(260, Math.round(maxW));
      const drawH = isMobile
        ? Math.round(drawW * 0.62)
        : Math.round(drawW * (c.cardHeight / c.cardWidth));
      currentDrawW = drawW;
      currentDrawH = drawH;

      itemWidth = drawW + (isMobile ? 18 : c.gap);
      const total = Math.max(1, loaded.length * itemWidth);
      centerOffset = (vw - drawW) / 2;
      const roundedPct = c.rounded;

      // On mobile, the edge grain dissolution must be subtle (6-8%)
      // so cards are clearly visible and not masked out of view
      const edge = isMobile ? 0.08 : Math.min(0.2, (drawW / vw) * 0.25);

      if (!drag.active && !isHovered && loaded.length) {
        if (c.mode === "smooth") {
          targetX += c.smoothRate * dt;
        } else if (Number.isFinite(c.snapInterval)) {
          snapTimer += dt;
          if (snapTimer >= c.snapInterval) {
            const current = Math.round((targetX + centerOffset) / itemWidth);
            targetX = (current + 1) * itemWidth - centerOffset;
            snapTimer = 0;
            const from = scrollX;
            const delta = targetX - from;
            stopSnap();
            snapAnim = animate(0, 1, {
              ...transitionRef.current,
              onUpdate: (val: number) => {
                scrollX = from + delta * val;
              },
              onComplete: () => {
                snapAnim = null;
              },
            });
          }
        }
      }

      if (!snapAnim) {
        const lf = 1 - Math.pow(1 - c.damping, dt * 60);
        scrollX += (targetX - scrollX) * lf;
      }

      let visualScale = 1;
      if (c.mode === "snap" && c.zoom > 0) {
        const nearest =
          Math.round((scrollX + centerOffset) / itemWidth) * itemWidth - centerOffset;
        let ratio = Math.min(Math.abs(scrollX - nearest) / (itemWidth / 2), 1);
        ratio = ratio * ratio * (3 - 2 * ratio);
        visualScale = 1 - ratio * c.zoom;
      }

      if (stripCtx) {
        stripCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stripCtx.clearRect(0, 0, vw, vh);
        if (loaded.length) {
          stripCtx.save();
          if (visualScale !== 1) {
            stripCtx.translate(vw / 2, vh / 2);
            stripCtx.scale(visualScale, visualScale);
            stripCtx.translate(-vw / 2, -vh / 2);
          }
          const y = (vh - drawH) / 2;
          let wrapped = scrollX % total;
          if (wrapped < 0) wrapped += total;
          let x = -wrapped;
          const leftBound = -vw * 1.5;
          const rightBound = vw * 2.5;
          while (x < rightBound) {
            for (let i = 0; i < loaded.length; i++) {
              const px = x + i * itemWidth;
              if (px + drawW > leftBound && px < rightBound) {
                drawCover(
                  stripCtx,
                  loaded[i],
                  px,
                  y,
                  drawW,
                  drawH,
                  roundedPct,
                  c.metaList[i],
                  isMobile
                );
              }
            }
            x += total;
          }
          stripCtx.restore();
        }
      }

      if (gl && hasGL) {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, strip);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uTime, now * 0.001);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uEdgeWidth, edge);
        gl.uniform1f(uNoiseSpeed, c.noiseSpeed);
        gl.uniform1f(uGrainScale, c.grainScale);
        gl.uniform1f(uGrainAmount, c.grainAmount);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else {
        const fb = fallback.getContext("2d");
        if (fb) {
          fb.setTransform(1, 0, 0, 1, 0, 0);
          fb.clearRect(0, 0, fallback.width, fallback.height);
          fb.drawImage(strip, 0, 0);
        }
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      stopSnap();
      ro.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      host.removeEventListener("wheel", onWheel);
      if (gl && hasGL) {
        if (tex) gl.deleteTexture(tex);
        if (posBuf) gl.deleteBuffer(posBuf);
        if (uvBuf) gl.deleteBuffer(uvBuf);
        if (prog) gl.deleteProgram(prog);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={props.className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        cursor: "grab",
        touchAction: "pan-y",
        background,
        ...props.style,
      }}
    >
      <canvas
        ref={glCanvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <canvas
        ref={fallbackRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

