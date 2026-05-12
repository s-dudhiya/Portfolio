import { Section, SectionTitle } from "./Section";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    name: "Spendova",
    tag: "PRODUCT · FINANCE",
    desc: "A full-stack expense tracking application with budgets, analytics, and clean reporting flows.",
    stack: ["React", "Django", "PostgreSQL"],
  },
  {
    id: "02",
    name: "EduNexus",
    tag: "PLATFORM · EDUCATION",
    desc: "AI-proctored university examination platform with secure session monitoring and role-based access.",
    stack: ["Python", "Django", "OpenCV"],
  },
  {
    id: "03",
    name: "AutoServe360",
    tag: "SAAS · OPERATIONS",
    desc: "End-to-end garage management system handling jobs, inventory, billing, and customer history.",
    stack: ["Node.js", "React", "MySQL"],
  },
  {
    id: "04",
    name: "Advanced Scraping Automation System",
    tag: "INFRASTRUCTURE · DATA",
    desc: "Production-grade scraping pipelines processing large-scale data with anti-bot resilience.",
    stack: ["Playwright", "Scrapy", "DrissionPage"],
  },
];

export function Projects() {
  return (
    <Section id="work">
      <SectionTitle index="03" title="SELECTED WORK" subtitle="// /var/log/projects" />
      <div className="space-y-px bg-border/60">
        {projects.map((p, i) => (
          <motion.a
            key={p.id}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative grid grid-cols-12 items-center gap-4 bg-background px-4 py-8 transition-colors duration-500 hover:bg-card/40 md:px-8"
          >
            <span className="col-span-2 font-mono text-xs text-amber-dim md:col-span-1">{p.id}</span>
            <div className="col-span-10 md:col-span-4">
              <div className="mb-1 font-mono text-[10px] tracking-[0.3em] text-warm-gray">{p.tag}</div>
              <h3 className="font-mono text-xl text-warm-beige transition-colors group-hover:text-amber-glow md:text-2xl">
                {p.name}
              </h3>
            </div>
            <p className="col-span-12 font-mono text-xs text-warm-gray md:col-span-4 md:text-sm">{p.desc}</p>
            <div className="col-span-10 flex flex-wrap gap-2 md:col-span-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="border border-border px-2 py-0.5 font-mono text-[10px] text-amber-soft"
                >
                  {s}
                </span>
              ))}
            </div>
            <ArrowUpRight className="col-span-2 ml-auto h-5 w-5 text-warm-gray transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-glow md:col-span-1" />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
