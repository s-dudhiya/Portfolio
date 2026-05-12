import { Section, SectionTitle } from "./Section";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact" className="pb-20 md:pb-32 lg:pb-40">
      <SectionTitle index="06" title="CONTACT" subtitle="// open.channel" />

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="amber-glow-text font-mono text-3xl leading-[1.1] tracking-tight text-warm-beige sm:text-4xl md:text-6xl"
      >
        Let's build something <span className="text-amber-glow">real.</span>
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-warm-gray"
      >
        Whether it's automation, backend systems, scraping infrastructure, or a complete product
        idea — I'm always open to building impactful solutions.
      </motion.p>

      <div className="mt-10 grid gap-px bg-border/60 md:mt-16 md:grid-cols-3">
        {[
          { icon: MapPin, label: "LOCATION", value: "Ahmedabad, Gujarat, India", href: undefined },
          { icon: Mail, label: "EMAIL", value: "s.k.dudhiyawala@gmail.com", href: "mailto:s.k.dudhiyawala@gmail.com" },
          { icon: Phone, label: "PHONE", value: "+91 8140099572", href: "tel:+918140099572" },
        ].map((c, i) => {
          const Icon = c.icon;
          const inner = (
            <>
              <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-amber-dim">
                <Icon className="h-3.5 w-3.5" />
                {c.label}
              </div>
              <div className="break-words font-mono text-sm text-warm-beige transition-colors group-hover:text-amber-glow">
                {c.value}
              </div>
            </>
          );
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background"
            >
              {c.href ? (
                <a href={c.href} className="group block bg-background p-6 transition-colors hover:bg-card/40">
                  {inner}
                </a>
              ) : (
                <div className="group block p-6">{inner}</div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-center font-mono text-[10px] tracking-[0.22em] text-warm-gray sm:tracking-[0.3em] md:mt-24 md:flex-row">
        <span>© 2026 SHABBIR DUDHIYA</span>
        <span className="cursor-blink">SYSTEM ONLINE</span>
        <span>BUILT WITH ☕ + PYTHON</span>
      </div>
    </Section>
  );
}
