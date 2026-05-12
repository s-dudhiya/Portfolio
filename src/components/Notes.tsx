import { Section, SectionTitle } from "./Section";
import { motion } from "framer-motion";

const notes = [
  {
    date: "2025.04",
    title: "Scaling Playwright across 50 workers",
    excerpt: "Lessons from running browser automation at scale — memory, retries, and queueing patterns that actually held up.",
  },
  {
    date: "2025.02",
    title: "Why I stopped fighting the scraper",
    excerpt: "A pragmatic take on anti-bot systems and when to negotiate instead of brute-forcing your way through.",
  },
  {
    date: "2024.11",
    title: "Building EduNexus: proctoring without panic",
    excerpt: "Notes on shipping AI-monitored exams to real students and the trust calibration that took the longest.",
  },
];

export function Notes() {
  return (
    <Section id="notes">
      <SectionTitle index="05" title="NOTES" subtitle="// scratchpad" />
      <div className="grid gap-px bg-border/60 md:grid-cols-3">
        {notes.map((n, i) => (
          <motion.article
            key={n.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group cursor-pointer bg-background p-6 transition-colors duration-500 hover:bg-card/40"
            data-cursor="hover"
          >
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-amber-dim">
              <span>{n.date}</span>
              <span className="opacity-0 transition-opacity group-hover:opacity-100">→ READ</span>
            </div>
            <h3 className="mb-3 font-mono text-base leading-snug text-warm-beige transition-colors group-hover:text-amber-glow">
              {n.title}
            </h3>
            <p className="font-mono text-xs leading-relaxed text-warm-gray">{n.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
