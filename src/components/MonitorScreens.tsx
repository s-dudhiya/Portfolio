import { useEffect, useState } from "react";

const terminalLines = [
  { text: "$ npm run dev", delay: 200 },
  { text: "", delay: 100 },
  { text: "✓ initializing systems...", delay: 400 },
  { text: "✓ compiling ideas...", delay: 350 },
  { text: "✓ fixing edge cases...", delay: 350 },
  { text: "✓ deploying solutions...", delay: 350 },
  { text: "", delay: 200 },
  { text: "status: building products that matter", delay: 400 },
];

const pythonCode = `from playwright.async_api import async_playwright
import asyncio

async def scrape():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://example.com")
        title = await page.title()
        print(f"Scraped: {title}")
        await browser.close()

asyncio.run(scrape())`;

function highlightPy(line: string) {
  // very minimal token coloring
  const parts: { t: string; c?: string }[] = [];
  const kw = /\b(from|import|async|def|with|as|await|return|print|if|else)\b/g;
  const str = /(["'])(.*?)\1/g;
  let rest = line;
  // simple approach: split tokens
  const tokens = rest.split(/(\s+|[(){}:,])/);
  for (const tk of tokens) {
    if (!tk) continue;
    if (/^(from|import|async|def|with|as|await|return|if|else)$/.test(tk))
      parts.push({ t: tk, c: "text-[oklch(0.75_0.13_45)]" }); // warm orange
    else if (/^(print|asyncio|async_playwright)$/.test(tk))
      parts.push({ t: tk, c: "text-[oklch(0.78_0.10_70)]" });
    else if (/^["']/.test(tk)) parts.push({ t: tk, c: "text-[oklch(0.70_0.10_80)]" });
    else if (/^#/.test(tk)) parts.push({ t: tk, c: "text-[oklch(0.45_0.02_65)]" });
    else parts.push({ t: tk, c: "text-warm-beige/80" });
  }
  return parts;
}

export function MonitorScreens() {
  const [tIdx, setTIdx] = useState(0);
  const [tShown, setTShown] = useState<string[]>([]);
  const [pyChars, setPyChars] = useState(0);

  // terminal sequential
  useEffect(() => {
    if (tIdx >= terminalLines.length) return;
    const line = terminalLines[tIdx];
    const id = setTimeout(() => {
      setTShown((s) => [...s, line.text]);
      setTIdx(tIdx + 1);
    }, line.delay);
    return () => clearTimeout(id);
  }, [tIdx]);

  // python typing
  useEffect(() => {
    if (pyChars >= pythonCode.length) return;
    const id = setTimeout(() => setPyChars(pyChars + 1), 18);
    return () => clearTimeout(id);
  }, [pyChars]);

  const pyVisible = pythonCode.slice(0, pyChars);
  const pyLines = pyVisible.split("\n");

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {/* LEFT: Terminal screen */}
      <div className="terminal-glow scanlines flicker relative overflow-hidden border border-border bg-terminal">
        <div className="flex items-center justify-between border-b border-border/60 bg-card/40 px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-dim/60" />
            <span className="h-2 w-2 rounded-full bg-amber-dim/40" />
            <span className="h-2 w-2 rounded-full bg-amber-dim/20" />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-warm-gray">~/shabbir — zsh</span>
          <span className="w-8" />
        </div>
        <div className="min-h-[220px] p-4 font-mono text-[12px] leading-relaxed text-amber-soft md:text-[13px]">
          {tShown.map((l, i) => (
            <div key={i} className={l.startsWith("✓") ? "text-amber-glow amber-glow-text" : ""}>
              {l || "\u00a0"}
            </div>
          ))}
          {tIdx >= terminalLines.length && (
            <div className="mt-2 text-amber-soft">
              <span>$ </span>
              <span className="cursor-blink" />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Python editor */}
      <div className="terminal-glow scanlines flicker relative overflow-hidden border border-border bg-terminal">
        <div className="flex items-center justify-between border-b border-border/60 bg-card/40 px-3 py-1.5">
          <span className="font-mono text-[10px] tracking-wider text-warm-gray">scrape.py</span>
          <span className="font-mono text-[10px] text-amber-dim">PYTHON · UTF-8</span>
        </div>
        <div className="min-h-[220px] p-4 font-mono text-[12px] leading-relaxed md:text-[13px]">
          <pre className="whitespace-pre">
            {pyLines.map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="select-none text-amber-dim/50">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  {highlightPy(line).map((p, j) => (
                    <span key={j} className={p.c}>
                      {p.t}
                    </span>
                  ))}
                  {i === pyLines.length - 1 && pyChars < pythonCode.length && (
                    <span className="cursor-blink" />
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
