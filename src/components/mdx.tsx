import type { ReactNode } from "react";

// Placeholder for content you still need to add. Shown in `npm run dev` only, never in production.
// Search the repo for "TODO" to find them all.
export function Todo({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div role="note" className="not-prose my-6 border-2 border-dashed border-ink bg-sun p-4 font-semibold text-on-sun">
      TODO: {children}
    </div>
  );
}

export const mdxComponents = { Todo };
