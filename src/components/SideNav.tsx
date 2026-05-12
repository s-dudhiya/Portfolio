import { motion } from "framer-motion";

import { useEffect, useState } from "react";

const items = [
  { id: "01", label: "HOME", href: "#home" },
  { id: "02", label: "ABOUT", href: "#about" },
  { id: "03", label: "WORK", href: "#work" },
  { id: "04", label: "STACK", href: "#stack" },
  { id: "05", label: "NOTES", href: "#notes" },
  { id: "06", label: "CONTACT", href: "#contact" },
];

export function SideNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      for (const it of items) {
        const el = document.getElementById(it.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 200) current = it.href.slice(1);
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 md:block">
      <ul className="flex flex-col gap-8 font-mono text-[11px] tracking-[0.25em]">
        {items.map((item, i) => {
          const isActive = active === item.href.slice(1);
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.5 }}
            >
              <a
                href={item.href}
                className={`group flex flex-col items-end gap-1 transition-colors duration-300 ${
                  isActive ? "text-amber-glow" : "text-warm-gray hover:text-warm-beige"
                }`}
              >
                <span className={isActive ? "text-amber-glow" : "text-warm-gray"}>
                  {item.id}
                </span>
                <span>{item.label}</span>
                <span
                  className={`mt-1 h-px bg-amber-glow transition-all duration-300 ${
                    isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
