import Link from "next/link";
import { ThemeModeToggle } from "../theme/theme-mode-toggle";

export const Header = () => {
  return (
    <header className="px-2 py-3 border-b border-accent flex items-center gap-4">
      <Link href="/" className="font-bold font-mono">
        NextFullStack
      </Link>
      <div className="flex-1" />
      <ThemeModeToggle />
    </header>
  );
};
