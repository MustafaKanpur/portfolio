import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ProjectLinks from "@/components/ProjectLinks";
import ProjectVideo from "@/components/ProjectVideo";
import { Todo } from "@/components/mdx";
import { getProjects } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.meta.slug }));
}

async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.meta.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  const { title, summary, slug } = project.meta;
  return {
    title,
    description: summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title, description: summary, type: "article" },
  };
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16">
      <h2 className="mb-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  const { meta, content } = project;

  return (
    <article>
      <header className="border-b-2 border-ink bg-tomato text-on-tomato">
        <div className="mx-auto max-w-4xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14">
          <Link href="/#projects" className="font-semibold underline underline-offset-4">
            ← All projects
          </Link>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] font-extrabold tracking-tighter sm:text-7xl">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg font-semibold">
            {meta.dates}
            {meta.role && ` · ${meta.role}`}
          </p>
          <div className="mt-8">
            <ProjectLinks repo={meta.repo} demo={meta.demo} />
          </div>
          {!meta.repo && <Todo>add `repo:` (GitHub URL) to the frontmatter.</Todo>}
          {!meta.demo && <Todo>add `demo:` (live URL) to the frontmatter, or leave it out if there isn&apos;t one.</Todo>}
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <Section title="Overview">
          <p className="text-xl leading-relaxed">{meta.overview}</p>
        </Section>

        {/* Demo video sits directly under the overview. Hidden until `video` is set in frontmatter. */}
        {meta.video ? (
          <div className="mt-10">
            <ProjectVideo video={meta.video} title={meta.title} />
          </div>
        ) : (
          <Todo>add a demo video (`video:` in content/projects/{meta.slug}.mdx).</Todo>
        )}

        {/* Problem + Approach come from the MDX body. */}
        <div className="prose prose-lg mt-16 max-w-none prose-h2:text-3xl prose-h2:font-extrabold sm:prose-h2:text-4xl">
          {content}
        </div>

        {meta.results.length > 0 && (
          <Section title="Results">
            <ul className="grid gap-4 sm:grid-cols-2">
              {meta.results.map((r, i) => (
                <li
                  key={r}
                  className={`border-2 border-ink p-5 text-lg font-semibold shadow-block-sm ${
                    ["bg-sun text-on-sun", "bg-cobalt text-on-cobalt", "bg-paper"][i % 3]
                  }`}
                >
                  {r}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {meta.stack.length > 0 && (
          <Section title="Stack">
            <ul className="flex flex-wrap gap-2">
              {meta.stack.map((s) => (
                <li key={s} className="border-2 border-ink px-3 py-1 font-semibold">
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {meta.screenshots.length > 0 ? (
          <Section title="Screenshots">
            <div className="grid gap-8">
              {meta.screenshots.map((s) => (
                <figure key={s.src}>
                  <div className="relative aspect-video border-2 border-ink bg-ink shadow-block">
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 896px) 896px, 100vw" className="object-contain" />
                  </div>
                  <figcaption className="mt-3 text-muted">{s.alt}</figcaption>
                </figure>
              ))}
            </div>
          </Section>
        ) : (
          <Todo>add `screenshots:` (images in /public/images/{meta.slug}/) to the frontmatter.</Todo>
        )}
      </div>
    </article>
  );
}
