import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import coderImg from "@/assets/coder-workspace.jpg";
import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full px-6 pt-8 md:px-12 md:pt-10"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div
          className="font-serif text-2xl tracking-tight text-warm-beige"
          style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
        >
          .S
        </div>
        <button className="font-mono text-xs tracking-[0.3em] text-warm-beige transition-colors hover:text-amber-glow">
          [ MENU ]
        </button>
      </div>

      {/* Hero center content */}
      <div className="mx-auto mt-20 max-w-5xl text-center md:mt-24">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-mono text-sm leading-loose text-warm-beige/80 md:text-base"
        >
          コードを書く。問題を解決し、
          <br />
          価値を生み出す。
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="amber-glow-text mt-10 text-5xl font-normal tracking-[0.04em] text-warm-beige sm:text-6xl md:text-7xl lg:text-[96px]"
          style={{ fontFamily: "'VT323', monospace", letterSpacing: "0.02em" }}
        >
          SHABBIR.DUDHIYA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 font-mono text-xs tracking-[0.4em] text-warm-beige/90 sm:text-sm"
        >
          {"{ PYTHON AUTOMATION ENGINEER & FULL-STACK DEVELOPER }"}
        </motion.p>
      </div>

      {/* ASCII workspace illustration */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="relative mx-auto mt-12 max-w-2xl"
      >
        <img
          src={coderImg}
          alt="Developer at workstation, ASCII art"
          width={1024}
          height={1024}
          className="mx-auto h-auto w-full select-none"
          style={{
            maskImage:
              "radial-gradient(ellipse 75% 75% at center, black 55%, transparent 100%)",
          }}
        />
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

      {/* Footer */}
      <footer className="mt-20 flex flex-col gap-6 border-t border-border/40 pt-8 pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 font-mono text-xs text-warm-gray">
            // find me on
          </div>
          <div className="flex items-center gap-5 text-warm-beige">
            <a href="#" aria-label="GitHub" className="transition-colors hover:text-amber-glow">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-amber-glow">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="transition-colors hover:text-amber-glow">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Email" className="transition-colors hover:text-amber-glow">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="font-mono text-xs text-warm-gray">
          © 2024 • System v1.0
        </div>
      </footer>
    </section>
  );
}
