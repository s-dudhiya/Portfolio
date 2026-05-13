import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      aria-pressed={isLight}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
      onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      className="inline-flex h-6 w-6 items-center justify-center border border-border/70 bg-background/45 text-amber-soft transition-colors duration-300 hover:border-amber-dim hover:text-amber-glow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
    </button>
  );
}
