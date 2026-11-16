import { Play } from "lucide-react";

type Reel = {
  label: string;
  format: string;
  ratio: "vertical" | "horizontal";
  videoId?: string;
  artwork: string;
  accent: string;
};

export const reels: Reel[] = [
  {
    label: "The first 3 seconds",
    format: "\n",
    ratio: "vertical",
    videoId: "C7faQ4jUMXg",
    artwork: "hook-artwork",
    accent: "text-cyan",
  },
  {
    label: "Made to hold attention",
    format: "\n",
    ratio: "vertical",
    artwork: "type-artwork",
    accent: "text-orange",
  },
  {
    label: "The replay effect",
    format: "\n",
    ratio: "vertical",
    artwork: "type-artwork",
    accent: "text-orange",
  },
  {
    label: "The NXT Frame edit",
    format: "\n",
    ratio: "horizontal",
    artwork: "showreel-artwork",
    accent: "text-cyan",
  },
];

function VideoFrame({ reel }: { reel: Reel }) {
  return (
    <article className={reel.ratio === "vertical" ? "min-w-0 md:col-span-4" : "col-span-2 min-w-0 md:col-span-12"}>
      <div
        className={`video-frame ${reel.ratio === "vertical" ? "aspect-[9/16]" : "aspect-video"}`}
      >
        {reel.videoId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(reel.videoId)}`}
            title={reel.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className={`video-artwork ${reel.artwork}`}>
            <span className="video-format">{reel.format}</span>
            <span className={`video-title ${reel.accent}`}>{reel.label}</span>
            <span className="play-mark" aria-hidden="true">
              <Play className="ml-1 size-5 fill-current" />
            </span>
            <span className="video-placeholder-label">{"\n"}</span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs font-bold uppercase text-primary-foreground/80">
        <span>{reel.label}</span>
        <span>{reel.ratio === "vertical" ? "9:16" : "16:9"}</span>
      </div>
    </article>
  );
}

export function ReelGrid({ verticalOnly = false }: { verticalOnly?: boolean }) {
  return (
    <div className="grid grid-cols-2 items-start gap-x-4 gap-y-10 md:grid-cols-12 md:gap-x-6 md:gap-y-12">
      {reels.filter((reel) => !verticalOnly || reel.ratio === "vertical").map((reel) => (
        <VideoFrame key={reel.label} reel={reel} />
      ))}
    </div>
  );
}
