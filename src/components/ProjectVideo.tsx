"use client";

import { useState } from "react";
import Image from "next/image";
import type { Video } from "@/lib/content";

// One component for both sources. The 16:9 box is reserved up front, so nothing shifts.
export default function ProjectVideo({ video, title }: { video: Video; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="not-prose">
      <div className="relative aspect-video overflow-hidden border-2 border-ink bg-ink shadow-block">
        {video.type === "file" ? (
          <video
            className="size-full"
            controls
            preload="none"
            playsInline
            poster={video.poster}
            aria-describedby="video-description"
          >
            <source src={video.src} type="video/mp4" />
            {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
          </video>
        ) : playing ? (
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={`${title} demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Click-to-load facade: YouTube's iframe (~1 MB of JS) loads only on demand.
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
            aria-label={`Play ${title} demo video`}
          >
            <Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
            <span className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full border-2 border-ink bg-tomato text-on-tomato shadow-block-sm transition-transform group-hover:scale-110">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-8" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption id="video-description" className="mt-4 text-muted">
        {video.description}
      </figcaption>
    </figure>
  );
}
