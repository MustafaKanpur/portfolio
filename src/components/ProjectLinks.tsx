// GitHub icon + "See it live" buttons. Renders nothing for links a project doesn't have.
// `relative z-10` keeps them clickable above the home-page card's full-card link overlay.
export default function ProjectLinks({ repo, demo, small = false }: { repo?: string; demo?: string; small?: boolean }) {
  if (!repo && !demo) return null;
  const box = small ? "h-9" : "h-12";
  const base = `relative z-10 inline-flex ${box} items-center border-2 border-ink font-bold shadow-block-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub (opens in a new tab)"
          title="View source on GitHub"
          className={`${base} ${small ? "w-9" : "w-12"} justify-center bg-ink text-paper`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={small ? "size-5" : "size-6"}>
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
          </svg>
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${small ? "px-3 text-sm" : "px-5 font-display text-lg"} bg-sun text-on-sun`}
        >
          See it live ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
