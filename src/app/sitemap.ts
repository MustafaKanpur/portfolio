import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { getPosts, getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  return [
    ...["", "/blog", "/resume"].map((path) => ({ url: `${siteUrl}${path}` })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.meta.slug}` })),
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.meta.slug}`, lastModified: p.meta.date })),
  ];
}
