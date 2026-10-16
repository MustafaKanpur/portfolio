import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/#projects", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b-2 border-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight"
          aria-label="MK. Mustafa Kanpurwala, home"
        >
          MK<span className="text-tomato">.</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm font-semibold sm:gap-2 sm:text-base">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm px-1.5 py-1 underline-offset-4 transition-colors hover:text-tomato hover:underline sm:px-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
