import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']"));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;
  return (
    <>
      <div
        className="pointer-events-none fixed z-[200] rounded-full transition-[width,height,opacity] duration-150 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 28 : 14,
          height: hovering ? 28 : 14,
          transform: "translate(-50%, -50%)",
          border: "1px solid var(--amber-glow)",
          boxShadow: "0 0 8px var(--cursor-glow)",
          mixBlendMode: "difference",
        }}
      />
      <div
        className="pointer-events-none fixed z-[201] rounded-full"
        style={{
          left: pos.x,
          top: pos.y,
          width: 3,
          height: 3,
          transform: "translate(-50%, -50%)",
          background: "var(--amber-glow)",
        }}
      />
    </>
  );
}
