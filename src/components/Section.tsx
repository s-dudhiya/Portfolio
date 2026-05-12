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
      className="mb-8 flex flex-col items-start gap-3 border-b border-border/60 pb-4 sm:mb-10 md:mb-12 md:flex-row md:items-end md:justify-between"
    >
      <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
        <span className="font-mono text-xs text-amber-dim">{index}</span>
        <h2 className="amber-glow-text min-w-0 font-mono text-xl tracking-[0.12em] text-warm-beige sm:text-2xl md:text-3xl md:tracking-[0.15em]">
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
    <section id={id} className={`relative px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-24 lg:px-12 xl:px-16 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
