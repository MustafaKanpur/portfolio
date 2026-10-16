import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building software, data, and machine learning.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = (await getPosts()).map((p) => p.meta);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-6xl font-extrabold tracking-tighter sm:text-8xl">
        Blog<span className="text-tomato">.</span>
      </h1>
      <p className="mt-4 text-xl text-muted">Notes on building software, data, and machine learning.</p>

      <ul className="mt-14 border-t-2 border-ink">
        {posts.map((post) => (
          <li key={post.slug} className="group relative border-b-2 border-ink py-8 transition-colors hover:bg-sun hover:text-on-sun">
            <p className="text-sm font-semibold">
              <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time> · {post.readingTime} min read
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
              <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-lg">{post.summary}</p>
            {post.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((t) => (
                  <li key={t} className="text-sm font-semibold">
                    #{t}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
