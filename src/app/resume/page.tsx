import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}, Computer Science student at York University.`,
  alternates: { canonical: "/resume" },
};

// TODO: drop your resume at /public/resume.pdf. The viewer and download both read it from there.
export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h1 className="font-display text-6xl font-extrabold tracking-tighter sm:text-8xl">
          Resume<span className="text-tomato">.</span>
        </h1>
        <a
          href="/resume.pdf"
          download="Mustafa-Kanpurwala-Resume.pdf"
          className="border-2 border-ink bg-sun px-6 py-3 font-display text-lg font-bold text-on-sun shadow-block-sm transition-transform hover:-translate-y-0.5"
        >
          Download PDF
        </a>
      </div>
      {/* Browsers render PDFs natively; phones that can't fall back to the link inside. */}
      <object
        data="/resume.pdf"
        type="application/pdf"
        aria-label={`${profile.name} resume`}
        className="mt-10 h-[80vh] min-h-[500px] w-full border-2 border-ink bg-paper shadow-block"
      >
        <div className="grid h-full place-items-center p-8 text-center">
          <p className="text-lg">
            Your browser can&apos;t show the PDF here.{" "}
            <a href="/resume.pdf" className="font-semibold underline underline-offset-4">
              Open the resume
            </a>{" "}
            instead.
          </p>
        </div>
      </object>
    </div>
  );
}
