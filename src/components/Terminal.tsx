import { useEffect, useRef, useState } from "react";

type Line = { kind: "in" | "out" | "err"; text: string };

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "",
    "Available commands:",
    "  > about     - more about me",
    "  > work      - selected projects",
    "  > stack     - technologies i use",
    "  > contact   - get in touch",
    "",
  ],
  about: () => [
    "Shabbir Dudhiya — Python automation engineer & full-stack developer.",
    "Based in Ahmedabad, India. Currently @ Atowiz Solutions.",
  ],
  work: () => [
    "→ Spendova — expense tracking product",
    "→ EduNexus — AI-proctored university platform",
    "→ AutoServe360 — garage management system",
    "→ Advanced Scraping Automation System",
  ],
  stack: () => ["python · django · react · node · postgres · playwright · scrapy"],
  contact: () => [
    "email   : s.k.dudhiyawala@gmail.com",
    "phone   : +91 8140099572",
    "location: Ahmedabad, Gujarat, India",
  ],
  clear: () => [],
};

const PROMPT = "shabbir@portfolio:~$";

const initialBoot: Line[] = [
  { kind: "in", text: "Hi there! 👋" },
  {
    kind: "out",
    text: "I'm Shabbir, a Python automation engineer & full-stack developer\nwho loves turning ideas into real-world products.",
  },
  { kind: "in", text: "type 'help' to see commands..." },
  { kind: "in", text: "help" },
  ...COMMANDS.help().map((t) => ({ kind: "out" as const, text: t })),
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(initialBoot);
  const [input, setInput] = useState("about");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const cmd = input.trim().toLowerCase();
    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    const next: Line[] = [...lines, { kind: "in", text: cmd }];
    if (cmd === "") {
      setLines(next);
    } else if (COMMANDS[cmd]) {
      next.push(...COMMANDS[cmd]().map((t) => ({ kind: "out" as const, text: t })));
      setLines(next);
    } else {
      next.push({ kind: "err", text: `command not found: ${cmd}` });
      setLines(next);
    }
    setInput("");
  };

  return (
    <div
      className="terminal-glow relative mx-auto max-w-3xl border border-border/60 bg-terminal/95 shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <span className="font-mono text-xs text-warm-beige/80">&gt; terminal.exe</span>
        <div className="flex items-center gap-3 text-warm-gray">
          <span className="font-mono text-xs leading-none">_</span>
          <span className="font-mono text-xs leading-none">▢</span>
          <span className="font-mono text-xs leading-none">×</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-[340px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {l.kind === "in" ? (
              <>
                <span className="text-amber-glow amber-glow-text">{PROMPT}</span>{" "}
                <span className="text-warm-beige">{l.text}</span>
              </>
            ) : l.kind === "err" ? (
              <span className="text-[oklch(0.65_0.16_30)]">{l.text}</span>
            ) : (
              <span className="text-warm-beige/85">{l.text || "\u00a0"}</span>
            )}
          </div>
        ))}

        <div className="mt-1 flex items-center">
          <span className="text-amber-glow amber-glow-text">{PROMPT}</span>
          <span>&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 border-none bg-transparent font-mono text-[13px] text-warm-beige caret-amber-glow outline-none"
          />
          <span className="cursor-blink" />
        </div>
      </div>
    </div>
  );
}
