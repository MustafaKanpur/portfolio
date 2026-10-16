import { profile } from "@/data/profile";

// Placeholder URLs (e.g. the LinkedIn TODO) are hidden until they're real links.
export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: profile.links.github, label: "GitHub" },
    { href: profile.links.linkedin, label: "LinkedIn" },
    { href: `mailto:${profile.email}`, label: "Email" },
  ].filter((l) => /^(https?:|mailto:)/.test(l.href));

  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 font-semibold ${className}`}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            {...(l.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            className="underline decoration-2 underline-offset-4 transition-colors hover:text-tomato"
          >
            {l.label}
            {l.href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
