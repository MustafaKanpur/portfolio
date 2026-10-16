import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPosts } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.meta.slug }));
}

async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.meta.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const { title, summary, slug, date, tags } = post.meta;
  return {
    title,
    description: summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title, description: summary, type: "article", publishedTime: date.toISOString(), tags },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const { meta, content } = post;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link href="/blog" className="font-semibold underline underline-offset-4 hover:text-tomato">
        ← All posts
      </Link>
      <header className="mt-8 border-b-2 border-ink pb-8">
        <p className="font-semibold text-muted">
          <time dateTime={meta.date.toISOString()}>{formatDate(meta.date)}</time> · {meta.readingTime} min read
        </p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95] font-extrabold tracking-tighter sm:text-6xl">{meta.title}</h1>
        <p className="mt-5 text-xl">{meta.summary}</p>
        {meta.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
            {meta.tags.map((t) => (
              <li key={t} className="border-2 border-ink bg-sun px-2 py-0.5 text-sm font-semibold text-on-sun">
                {t}
              </li>
            ))}
          </ul>
        )}
      </header>
      <div className="prose prose-lg mt-10 max-w-none">{content}</div>
    </article>
  );
}
