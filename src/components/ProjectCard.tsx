import Image from "next/image";
import Link from "next/link";
import { videoThumb, type Project } from "@/lib/content";

const accents = [
  "bg-tomato text-on-tomato",
  "bg-cobalt text-on-cobalt",
  "bg-sun text-on-sun",
];

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = `/projects/${project.slug}`;
  return (
    <article
      className="group relative flex flex-col border-2 border-ink bg-paper shadow-block transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
    >
      {project.video ? (
        <div className="relative aspect-video overflow-hidden border-b-2 border-ink bg-ink">
          <Image
            src={videoThumb(project.video)}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-3 left-3 border-2 border-ink bg-sun px-3 py-1 text-sm font-bold text-on-sun">
            ▶ Watch demo
          </span>
        </div>
      ) : (
        // TODO (per project): add a `video` to the MDX frontmatter to show a thumbnail here.
        <div className={`flex aspect-video items-end border-b-2 border-ink p-5 ${accents[index % accents.length]}`}>
          <span className="font-display text-7xl leading-none font-extrabold sm:text-8xl" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <p className="text-sm font-semibold text-muted">{project.dates}</p>
        <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">
          {/* The whole card is clickable via this link's ::after overlay. */}
          <Link href={href} className="after:absolute after:inset-0 hover:underline hover:decoration-tomato hover:decoration-4">
            {project.title}
          </Link>
        </h3>
        <p>{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tech stack">
          {project.stack.slice(0, 5).map((s) => (
            <li key={s} className="border border-ink px-2 py-0.5 text-xs font-semibold">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
