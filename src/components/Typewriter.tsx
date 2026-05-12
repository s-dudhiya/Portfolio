import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onDone?: () => void;
  cursor?: boolean;
}

export function Typewriter({ text, speed = 30, delay = 0, className, onDone, cursor }: TypewriterProps) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let raf: number;
    const start = performance.now() + delay;

    const tick = (t: number) => {
      if (t < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const target = Math.min(text.length, Math.floor((t - start) / speed));
      if (target !== i) {
        i = target;
        setOut(text.slice(0, i));
      }
      if (i < text.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        onDone?.();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      <span style={{ whiteSpace: "pre-wrap" }}>{out}</span>
      {cursor && !done && <span className="cursor-blink" />}
    </span>
  );
}
