import { motion } from "framer-motion";

interface SectionTitleProps {
  index: string;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ index, title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 flex items-end justify-between border-b border-border/60 pb-4"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-amber-dim">{index}</span>
        <h2 className="amber-glow-text font-mono text-2xl tracking-[0.15em] text-warm-beige md:text-3xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <span className="hidden font-mono text-[10px] tracking-[0.3em] text-warm-gray md:block">
          {subtitle}
        </span>
      )}
    </motion.div>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-6 py-32 md:px-16 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
