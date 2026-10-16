import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { getProjects } from "@/lib/content";

function SectionHeading({ n, id, children }: { n: string; id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-10 flex scroll-mt-6 items-baseline gap-4 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
      <span className="text-lg font-bold sm:text-2xl" aria-hidden="true">
        {n}/
      </span>
      {children}
    </h2>
  );
}

const button =
  "inline-flex items-center border-2 border-ink px-5 py-2.5 font-display text-lg font-bold shadow-block-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5";

export default async function Home() {
  const projects = (await getProjects()).filter((p) => p.meta.featured).map((p) => p.meta);
  const hasLinkedIn = profile.links.linkedin.startsWith("http");

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
        <p className="rise mb-6 inline-block -rotate-2 border-2 border-ink bg-sun px-3 py-1 font-semibold text-on-sun">
          CS @ York University · {profile.location}
        </p>
        <h1
          className="font-display text-[clamp(3.25rem,13vw,10rem)] leading-[0.88] font-extrabold tracking-tighter"
        >
          {profile.name.split(" ")[0]}
          <br />
          <span className="text-tomato">{profile.name.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed sm:text-2xl">
          {profile.intro}
        </p>
        <div className="rise mt-10 flex flex-wrap gap-3" style={{ "--i": 1 } as CSSProperties}>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={`${button} bg-ink text-paper`}>
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {hasLinkedIn && (
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={`${button} bg-cobalt text-on-cobalt`}>
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          <Link href={profile.links.resume} className={`${button} bg-paper`}>
            Resume
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section aria-labelledby="projects" className="border-t-2 border-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading n="01" id="projects">
            Selected work
          </SectionHeading>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="border-t-2 border-ink bg-cobalt text-on-cobalt">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading n="02" id="experience">
            Experience
          </SectionHeading>
          <ol className="relative ml-2 border-l-4 border-current">
            {profile.experience.map((job) => (
              <li key={job.role + job.org} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
                <span className="absolute top-2 -left-[13px] size-[22px] rounded-full border-4 border-current bg-sun" aria-hidden="true" />
                <p className="font-semibold">{job.dates}</p>
                <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{job.role}</h3>
                <p className="font-semibold">
                  {job.org} · {job.location}
                </p>
                <p className="mt-3 max-w-3xl text-lg">{job.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="border-t-2 border-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading n="03" id="skills">
            Toolbox
          </SectionHeading>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div key={group}>
                <dt className="mb-3 border-b-2 border-ink pb-1 font-display text-xl font-bold">{group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <li key={s} className="border-2 border-ink px-3 py-1 font-semibold transition-colors hover:bg-sun hover:text-on-sun">
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Education & certification */}
      <section aria-labelledby="education" className="border-t-2 border-ink bg-sun text-on-sun">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading n="04" id="education">
            Education
          </SectionHeading>
          <ul className="grid gap-6 md:grid-cols-2">
            {[...profile.education, ...profile.certifications].map((e) => (
              <li key={e.title} className="border-2 border-on-sun bg-[#fff8ec] p-6 text-[#17140f] shadow-[6px_6px_0_0_#17140f]">
                <h3 className="font-display text-2xl font-bold">{e.title}</h3>
                <p className="mt-1 text-lg">{e.detail}</p>
                {e.dates && <p className="mt-3 font-semibold">{e.dates}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="border-t-2 border-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading n="05" id="contact">
              Say hi
            </SectionHeading>
            <p className="max-w-md text-xl leading-relaxed">
              Internships, collaborations, or a question about one of my projects. My inbox is open.
            </p>
          </div>
          <ContactForm email={profile.email} />
        </div>
      </section>
    </>
  );
}
