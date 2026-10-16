import { getPosts } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.meta.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.meta.slug === slug);
  return ogImage(post?.meta.title ?? "Blog", "Blog");
}
