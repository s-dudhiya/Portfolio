import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import coderDarkImg from "@/assets/coder-workspace-dark.png";
import coderLightImg from "@/assets/coder-workspace-light.png";
import { useTheme } from "@/hooks/use-theme";
import { Terminal } from "./Terminal";

const pythonCode = [
  "import time",
  "",
  "coffee = True",
  "ideas = []",
  "",
  "def build():",
  '     ideas.append("solve problems")',
  '     ideas.append("build products")',
  "",
  "while coffee:",
  "     build()",
  "     time.sleep(0.5)",
  "",
  'print("Building something meaningful...")',
];

function HeroMonitorTyping() {
  const reduceMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setLineIndex(pythonCode.length);
      setCharIndex(0);
      return;
    }

    if (lineIndex >= pythonCode.length) {
      const restart = window.setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, 5200);

      return () => window.clearTimeout(restart);
    }

    const currentLine = pythonCode[lineIndex];
    const lineComplete = charIndex >= currentLine.length;
    const delay = lineComplete
      ? currentLine.length === 0
        ? 210
        : 430
      : 28 + ((charIndex + lineIndex) % 4) * 13;

    const timer = window.setTimeout(() => {
      if (lineComplete) {
        setLineIndex((value) => value + 1);
        setCharIndex(0);
      } else {
        setCharIndex((value) => value + 1);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, lineIndex, reduceMotion]);

  const visibleLines = reduceMotion
    ? pythonCode
    : [
        ...pythonCode.slice(0, lineIndex),
        lineIndex < pythonCode.length ? pythonCode[lineIndex].slice(0, charIndex) : "",
      ];

  return (
    <div className="hero-monitor-code" aria-hidden="true">
      {visibleLines.map((line, index) => (
        <span className="hero-type-line" key={`${index}-${line}`}>
          <span className="hero-line-number">{String(index + 1).padStart(2, "0")}</span>
          <span>{line || "\u00a0"}</span>
        </span>
      ))}
      <span className="hero-monitor-cursor" />
    </div>
  );
}

export function Hero() {
  const { theme } = useTheme();
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const depthX = useMotionValue(0);
  const depthY = useMotionValue(0);
  const imageX = useSpring(useTransform(depthX, (value) => value * 8), {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
  });
  const imageY = useSpring(useTransform(depthY, (value) => value * 8), {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
  });
  const overlayX = useSpring(useTransform(depthX, (value) => value * 12), {
    stiffness: 75,
    damping: 20,
    mass: 0.35,
  });
  const overlayY = useSpring(useTransform(depthY, (value) => value * 12), {
    stiffness: 75,
    damping: 20,
    mass: 0.35,
  });
  const codeX = useSpring(useTransform(depthX, (value) => value * 4), {
    stiffness: 110,
    damping: 24,
    mass: 0.3,
  });
  const codeY = useSpring(useTransform(depthY, (value) => value * 4), {
    stiffness: 110,
    damping: 24,
    mass: 0.3,
  });

  function handleSceneMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || window.matchMedia("(max-width: 767px)").matches) return;

    const bounds = sceneRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    depthX.set(relativeX);
    depthY.set(relativeY);
  }

  function handleSceneLeave() {
    depthX.set(0);
    depthY.set(0);
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden px-5 pt-3 sm:px-6 md:px-8 md:pt-4 lg:px-12"
    >
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 leading-none lg:gap-x-6">
        <div
          className="order-1 font-mono text-xs font-bold leading-none tracking-[0.1em] text-warm-beige sm:text-sm lg:flex-1 lg:basis-0"
          // style={{ fontFamily: "var(--font-hero)" }}
        >
          init
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="amber-glow-text order-3 mt-3 min-w-0 basis-full text-center text-[clamp(0.9rem,2.8vw,2.2rem)] font-normal leading-tight text-warm-beige [overflow-wrap:anywhere] lg:order-2 lg:mt-0 lg:basis-auto lg:whitespace-nowrap"
          style={{ fontFamily: "var(--font-hero)", letterSpacing: "0.04em" }}
        >
          SHABBIR.DUDHIYA
        </motion.h1>
        <div className="order-2 flex items-center justify-end gap-3 lg:order-3 lg:flex-1 lg:basis-0">
          <button
            type="button"
            onClick={() => {
              window.open("/shabbir-resume.pdf", "_blank", "noopener,noreferrer");
            }}
            className="text-right font-mono text-[10px] leading-none tracking-[0.24em] text-warm-beige transition-colors hover:text-amber-glow sm:text-xs sm:tracking-[0.3em]"
          >
            [ RESUME ]
          </button>
        </div>
      </div>

      {/* Hero center content */}
      <div className="mx-auto max-w-5xl text-center">
        {/* <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-mono text-sm leading-loose text-warm-beige/80 md:text-base"
        >
          コードを書く。問題を解決し、
          <br />
          価値を生み出す。
        </motion.p> */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-4 max-w-full font-mono text-[11px] tracking-[0.28em] text-warm-beige/90 sm:text-xs sm:tracking-[0.4em] md:mt-5 md:text-sm"
        >
          {"{ PYTHON DEVELOPER }"}
        </motion.p>
      </div>

      {/* ASCII workspace illustration */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="hero-coder-scene relative mx-auto mt-5 w-full max-w-[min(100%,42rem)] md:mt-6"
        onMouseLeave={handleSceneLeave}
        onMouseMove={handleSceneMove}
        ref={sceneRef}
      >
        <motion.img
          src={theme === "light" ? coderLightImg : coderDarkImg}
          alt="Developer at workstation, ASCII art"
          width={1024}
          height={1024}
          className="mx-auto h-auto w-full select-none"
          style={{
            x: imageX,
            y: imageY,
            maskImage: "var(--hero-image-mask)",
            WebkitMaskImage: "var(--hero-image-mask)",
          }}
        />
        <motion.div
          className="hero-coder-overlays pointer-events-none absolute inset-0"
          style={{
            x: theme === "light" ? imageX : overlayX,
            y: theme === "light" ? imageY : overlayY,
          }}
        >
          <div className="hero-monitor-glow" />
          <div className="hero-lamp-glow" />
          <div className="hero-keyboard-glow" />
          <motion.div
            className="hero-monitor-depth"
            style={{ x: theme === "light" ? 0 : codeX, y: theme === "light" ? 0 : codeY }}
          >
            <HeroMonitorTyping />
          </motion.div>
          <div className="hero-pixel-shimmer" />
          <div className="hero-scan-noise" />
          <div className="hero-image-vignette" />
        </motion.div>
      </motion.div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-8"
      >
        <Terminal />
      </motion.div>
    </section>
  );
}
