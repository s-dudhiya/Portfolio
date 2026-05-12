import { Section, SectionTitle } from "./Section";
import { motion } from "framer-motion";

const groups = [
  { label: "LANGUAGES", items: ["Python", "JavaScript", "Java", "SQL"] },
  { label: "FRONTEND", items: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "ShadCN/UI"] },
  { label: "BACKEND", items: ["Django", "Node.js", "Express.js", "REST APIs"] },
  { label: "DATABASE", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  { label: "TOOLS", items: ["Playwright", "DrissionPage", "Scrapy", "Requests", "lxml", "Parsel", "VS Code", "IntelliJ IDEA"] },
  { label: "CLOUD", items: ["Vercel", "Supabase"] },
];

export function Stack() {
  return (
    <Section id="stack">
      <SectionTitle index="04" title="STACK" subtitle="// the.toolbox" />
      <div className="grid grid-cols-1 gap-px bg-border/60 sm:grid-cols-2 md:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative bg-background p-6 transition-colors duration-500 hover:bg-card/40"
          >
            <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.22em] text-amber-dim sm:tracking-[0.3em]">
              <span>{g.label}</span>
              <span className="text-warm-gray">0{i + 1}</span>
            </div>
            <ul className="space-y-1.5 font-mono text-sm text-warm-beige">
              {g.items.map((it) => (
                <li key={it} className="flex min-w-0 items-center gap-2 break-words">
                  <span className="text-amber-glow opacity-60 group-hover:opacity-100">›</span>
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
