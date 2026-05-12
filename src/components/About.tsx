import { Section, SectionTitle } from "./Section";
import { motion } from "framer-motion";

export function About() {
  return (
    <Section id="about">
      <SectionTitle index="02" title="ABOUT" subtitle="// who.am.i" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-4"
        >
          <div className="border border-border bg-card/40 p-6 font-mono text-xs leading-relaxed text-amber-soft">
            <div className="mb-3 flex items-center gap-2 text-amber-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-glow shadow-[0_0_6px_var(--amber-glow)]" />
              <span className="tracking-[0.2em]">CURRENTLY</span>
            </div>
            <p className="text-warm-beige">Python Developer</p>
            <p className="text-warm-gray">@ Atowiz Solutions</p>
            <p className="mt-1 text-warm-gray">Ahmedabad, India</p>
            <div className="mt-6 space-y-1 text-warm-gray">
              <div>{"> focus  : automation"}</div>
              <div>{"> tools  : playwright, scrapy"}</div>
              <div>{"> output : data at scale"}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="min-w-0 space-y-5 break-words font-mono text-sm leading-[1.8] text-warm-beige md:col-span-8"
        >
          <p>
            I'm a Python developer passionate about building scalable backend systems, automation
            tools, and full-stack digital products. My journey started with problem-solving and
            evolved into developing complete production-ready applications — ranging from
            AI-proctored university systems to garage management platforms and expense tracking
            products.
          </p>
          <p className="text-warm-gray">
            Currently, I work as a Python Developer at <span className="text-amber-soft">Atowiz Solutions</span> in
            Ahmedabad, where I primarily work on web scraping, browser automation, and large-scale
            data extraction systems using tools like Playwright, Scrapy, Requests, DrissionPage, lxml,
            and Parsel.
          </p>
          <p className="text-warm-gray">
            I enjoy creating systems that automate repetitive tasks, improve workflows, and solve
            practical business problems.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
