import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Instagram, Linkedin, Play, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/nxt-frame-mark.png.asset.json";
import goldAward from "@/assets/trail-gold-award.png.asset.json";
import headphones from "@/assets/trail-headphones.png.asset.json";
import clapper from "@/assets/trail-clapper.png.asset.json";

const cursorTrailImages = [goldAward.url, headphones.url, clapper.url];

type CursorTrailImage = {
  id: number;
  image: string;
  x: number;
  y: number;
  rotation: number;
};

type Reel = {
  label: string;
  format: string;
  ratio: "vertical" | "horizontal";
  videoId?: string;
  artwork: string;
  accent: string;
};

const reels: Reel[] = [
  {
    label: "The first 3 seconds",
    format: "\n",
    ratio: "vertical",
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NXT Frame — Short-form video editing" },
      {
        name: "description",
        content:
          "Retention-first Reels, TikToks and Shorts. NXT Frame makes every second count with sharp hooks, kinetic type and sound-led edits.",
      },
      { property: "og:title", content: "NXT Frame — Short-form video editing" },
      {
        property: "og:description",
        content: "Retention-first Reels, TikToks and Shorts. Every second counts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

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

function SiteCursorTrail() {
  const [trail, setTrail] = useState<CursorTrailImage[]>([]);
  const sequence = useRef(0);
  const lastPosition = useRef<{ x: number; y: number; at: number } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const x = event.clientX;
      const y = event.clientY;
      const bounds = { width: window.innerWidth, height: window.innerHeight };
      const now = performance.now();
      const previous = lastPosition.current;

      if (previous && (Math.hypot(x - previous.x, y - previous.y) < 80 || now - previous.at < 90)) {
        return;
      }

      lastPosition.current = { x, y, at: now };
      const id = sequence.current++;
      const nextImage = cursorTrailImages[id % cursorTrailImages.length];
      if (!nextImage) return;

      const padding = 112;
      const image = {
        id,
        image: nextImage,
        x: Math.max(padding, Math.min(bounds.width - padding, x)),
        y: Math.max(padding, Math.min(bounds.height - padding, y)),
        rotation: ((id % 3) - 1) * 7,
      };

      setTrail((current) => [...current, image].slice(-5));
      timers.current.push(
        setTimeout(() => setTrail((current) => current.filter((item) => item.id !== id)), 1750),
      );
    };

    document.addEventListener("pointermove", onPointerMove);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="site-cursor-trail-layer" aria-hidden="true">
      {trail.map((item) => (
        <img
          key={item.id}
          className="site-cursor-trail-image"
          src={item.image}
          alt=""
          style={{ left: item.x, top: item.y, rotate: `${item.rotation}deg` }}
        />
      ))}
    </div>
  );
}

function Index() {
  return (
    <>
      <SiteCursorTrail />
      <main className="overflow-hidden bg-background font-sans text-foreground">
        <section id="top" className="relative flex min-h-[760px] flex-col items-center justify-center bg-hero-surface px-6 py-24 text-hero-ink md:min-h-[850px]">
          <div className="absolute inset-x-0 top-10 z-10 flex flex-col items-center text-center md:top-12">
            <img className="size-14 object-contain invert md:size-16" src={logoMark.url} alt="NXT Frame mark" />
            <p className="mt-2 text-base font-black uppercase">NXT Frame</p>
          </div>
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h1 className="text-5xl font-black leading-[0.82] sm:text-7xl md:text-[100px]">
              Your story,<br />
              <span>Our Frame.</span>
            </h1>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="h-12 rounded-full bg-cyan px-7 text-sm font-black uppercase text-hero-ink hover:bg-cyan/85">
                <a href="#work">Portfolio</a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-hero-ink/45 bg-transparent px-7 text-sm font-black uppercase text-hero-ink hover:bg-hero-ink hover:text-hero-surface">
                <a href="#contact">Contact</a>
              </Button>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-orange" />
        </section>

      <section id="work" className="bg-orange px-6 py-24 text-foreground md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
            <div>
            <p className="mb-4 text-xs font-bold uppercase text-primary-foreground/65">01 / Selected work</p>
              <h2 className="max-w-3xl text-5xl font-black leading-[0.9] md:text-7xl">Made for the<br />full-screen era.</h2>
            </div>
            <p className="max-w-xs text-base font-medium leading-relaxed text-primary-foreground/75">
              Vertical-first edits, cut with a clear point of view and built to earn the next second.
            </p>
          </div>
          <div className="grid grid-cols-2 items-start gap-x-4 gap-y-10 md:grid-cols-12 md:gap-x-6 md:gap-y-12">
            {reels.map((reel) => <VideoFrame key={reel.label} reel={reel} />)}
          </div>
        </div>
      </section>

      <section id="specialties" className="bg-cyan px-6 py-24 text-foreground md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-bold uppercase">02 / What we do</p>
            <h2 className="text-5xl font-black leading-[0.9] md:text-7xl">Built to<br />hold attention.</h2>
            <p className="mt-8 max-w-md text-lg font-semibold leading-snug">
              Good editing is felt before it’s noticed. We find the rhythm, sharpen the story, and make the scroll stop.
            </p>
          </div>
          <div className="border-t-2 border-foreground">
            {[
              ["01", "Retention-first editing", "Every cut earns its place."],
              ["02", "Hooks that land", "Open with a reason to stay."],
              ["03", "Kinetic typography", "Words with timing and movement."],
              ["04", "Pacing & rhythm", "Keep the story moving."],
              ["05", "Sound design", "Make every beat hit harder."],
            ].map(([number, title, description]) => (
              <div key={number} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-foreground/30 py-5 md:grid-cols-[3rem_1fr_auto] md:items-center md:gap-6 md:py-6">
                <span className="pt-1 text-xs font-bold">{number}</span>
                <h3 className="text-xl font-black md:text-2xl">{title}</h3>
                <p className="col-start-2 text-sm font-medium md:col-start-auto md:text-right">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase text-background/60">03 / Start a conversation</p>
            <h2 className="max-w-3xl text-5xl font-black leading-[0.9] md:text-8xl">Got a good<br />thing going?</h2>
            <p className="mt-7 max-w-md text-lg font-medium text-background/70">Let’s make the next one impossible to scroll past.</p>
            <Button asChild size="lg" className="mt-9 h-12 rounded-none bg-cyan px-6 text-sm font-black uppercase text-foreground hover:bg-cyan/85">
              <a href="https://tally.so/r/QoMPrX" target="_blank" rel="noreferrer">
                Open enquiry form <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <div className="border-t border-background/25 pt-6 lg:justify-self-end lg:min-w-64">
            <p className="text-xs font-bold uppercase text-background/55">Email</p>
            <a className="mt-2 inline-block break-all text-lg font-bold transition-opacity hover:opacity-70" href="mailto:Editor.Ankitmandal@gmail.com">
              Editor.Ankitmandal@gmail.com
            </a>
            <div className="mt-7 flex items-center gap-3" aria-label="Social media">
              <a className="flex size-11 items-center justify-center border border-background/30 transition-colors hover:bg-cyan hover:text-foreground" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                <Instagram className="size-5" />
              </a>
              <a className="flex size-11 items-center justify-center border border-background/30 transition-colors hover:bg-cyan hover:text-foreground" href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">
                <Youtube className="size-5" />
              </a>
              <a className="flex size-11 items-center justify-center border border-background/30 transition-colors hover:bg-cyan hover:text-foreground" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-3 bg-foreground px-6 pb-7 text-xs font-semibold uppercase text-background/45 md:flex-row md:px-12">
        <span>© 2026 NXT Frame</span>
        </footer>
      </main>
    </>
  );
}
