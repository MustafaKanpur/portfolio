import fs from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { z } from "zod";
import { mdxComponents } from "@/components/mdx";

// Frontmatter is validated at build time: a typo in an .mdx file fails the build
// with a readable error instead of rendering a broken page.

const videoSchema = z
  .discriminatedUnion("type", [
    z.object({ type: z.literal("youtube"), id: z.string().min(1) }),
    z.object({
      type: z.literal("file"),
      src: z.string().startsWith("/"),
      poster: z.string().startsWith("/"),
    }),
  ])
  .and(
    z.object({
      description: z.string().min(1), // shown under the video, for accessibility
      captions: z.string().endsWith(".vtt").optional(), // self-hosted only; for YouTube, upload captions in YouTube Studio
    }),
  );

const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  dates: z.string(),
  role: z.string().optional(),
  overview: z.string(),
  stack: z.array(z.string()).default([]),
  results: z.array(z.string()).default([]),
  featured: z.boolean().default(true),
  order: z.number().default(99),
  video: videoSchema.optional(),
  repo: z.url().optional(),
  demo: z.url().optional(),
  screenshots: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
});

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
});

export type Video = z.infer<typeof videoSchema>;
export type Project = z.infer<typeof projectSchema> & { slug: string };
export type Post = z.infer<typeof postSchema> & { slug: string; readingTime: number };

const root = path.join(process.cwd(), "content");

async function load<M extends object>(dir: string, schema: z.ZodType<M>) {
  const folder = path.join(root, dir);
  const files = fs.readdirSync(folder).filter((f) => f.endsWith(".mdx"));
  return Promise.all(
    files.map(async (file) => {
      const source = fs.readFileSync(path.join(folder, file), "utf8");
      const { content, frontmatter } = await compileMDX({
        source,
        components: mdxComponents,
        options: { parseFrontmatter: true },
      });
      const parsed = schema.safeParse(frontmatter);
      if (!parsed.success) {
        throw new Error(`Invalid frontmatter in content/${dir}/${file}:\n${z.prettifyError(parsed.error)}`);
      }
      const words = source.split(/\s+/).length;
      return {
        meta: { ...parsed.data, slug: file.replace(/\.mdx$/, ""), words },
        content,
      };
    }),
  );
}

export async function getProjects() {
  const all = await load("projects", projectSchema);
  return all
    .map(({ meta, content }) => ({ meta: meta as Project, content }))
    .sort((a, b) => a.meta.order - b.meta.order);
}

export async function getPosts() {
  const all = await load("blog", postSchema);
  return all
    .map(({ meta, content }) => ({
      meta: { ...meta, readingTime: Math.max(1, Math.round(meta.words / 200)) } as Post,
      content,
    }))
    .sort((a, b) => b.meta.date.getTime() - a.meta.date.getTime());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export const videoThumb = (video: Video) =>
  video.type === "youtube" ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : video.poster;
