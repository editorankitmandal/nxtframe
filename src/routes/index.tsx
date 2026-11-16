import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import logoMark from "@/assets/nxt-frame-mark.webp";
import { ContactBlock } from "@/components/site/contact-block";
import { ReelGrid } from "@/components/site/reels";
import { HeroScroll } from "@/components/site/hero-scroll";
import { HorizontalSections } from "@/components/site/horizontal-sections";
import { SERVICE_PAGES, SOCIAL_LINKS, CONTACT_EMAIL, buttonCyan, buttonOutlineInk, getSiteOrigin } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => {
    const origin = getSiteOrigin();
    const shareImage = `${origin}/og-image.jpg`;
    return {
    meta: [
      { title: "NXT Frame — Short-form Video Editing Agency for Reels, TikTok & Shorts" },
      {
        name: "description",
        content:
          "NXT Frame is a short-form video editing studio. Retention-first Reels, TikToks and YouTube Shorts with sharp hooks, kinetic type and sound-led edits.",
      },
      {
        name: "keywords",
        content:
          "short-form video editing, Reels editor, TikTok video editing, YouTube Shorts editing, video editing agency, kinetic typography, creator video editing, NXT Frame",
      },
      { property: "og:title", content: "NXT Frame — Short-form Video Editing Agency" },
      {
        property: "og:description",
        content: "Retention-first Reels, TikToks and Shorts. Every second counts.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${origin}/` },
      { property: "og:image", content: shareImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NXT Frame — Your story, Our Frame." },
      { name: "twitter:image", content: shareImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NXT Frame — Short-form Video Editing Agency" },
      {
        name: "twitter:description",
        content: "Retention-first Reels, TikToks and Shorts. Every second counts.",
      },
    ],
    links: [{ rel: "canonical", href: `${origin}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "NXT Frame",
          description:
            "Short-form video editing studio for Reels, TikToks and YouTube Shorts.",
          email: CONTACT_EMAIL,
          serviceType: "Short-form video editing",
          areaServed: "Worldwide",
          sameAs: Object.values(SOCIAL_LINKS),
        }),
      },
    ],
    };
  },
  component: Index,
});

function Index() {
  return (
    <main className="overflow-clip bg-background font-sans text-foreground">
      <HeroScroll>
      <section id="top" className="relative flex h-full flex-col items-center justify-center bg-hero-surface px-6 py-24 text-hero-ink">
        <div className="absolute inset-x-0 top-10 z-10 flex flex-col items-center text-center md:top-12">
          <img className="size-14 object-contain invert md:size-16" src={logoMark} alt="NXT Frame mark" width={64} height={64} fetchPriority="high" />
          <p className="mt-2 text-base font-black uppercase">NXT Frame</p>
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <h1 className="text-5xl font-black leading-[0.82] sm:text-7xl md:text-[100px]">
            Your story,<br />
            <span>Our Frame.</span>
          </h1>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/portfolio" className={buttonCyan}>
              Portfolio
            </Link>
            <Link to="/contact" className={buttonOutlineInk}>
              Contact
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-cyan" />
      </section>
      </HeroScroll>

      <HorizontalSections>
      <section id="work" className="horizontal-panel bg-orange px-6 py-24 text-foreground md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
            <div>
              <p className="mb-4 text-xs font-bold uppercase text-primary-foreground/65">01 / Selected work</p>
              <h2 className="max-w-3xl text-5xl font-black leading-[0.9] md:text-7xl">Made for the<br />full-screen era.</h2>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-black uppercase underline decoration-2 underline-offset-8 hover:opacity-70">
              See the full portfolio <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <ReelGrid verticalOnly />
        </div>
      </section>

      <section id="specialties" className="horizontal-panel bg-cyan px-6 py-24 text-foreground md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-bold uppercase">02 / What we do</p>
            <h2 className="text-5xl font-black leading-[0.9] md:text-7xl">Built to<br />hold attention.</h2>
            <p className="mt-8 max-w-md text-lg font-semibold leading-snug">
              Good editing is felt before it’s noticed. We find the rhythm, sharpen the story, and make the scroll stop.
            </p>
            <div className="mt-10 flex flex-col gap-3">
              {SERVICE_PAGES.map((page) => (
                <Link key={page.to} to={page.to} className="inline-flex items-center gap-2 text-sm font-black uppercase hover:opacity-70">
                  {page.label} <ArrowUpRight className="size-4" />
                </Link>
              ))}
            </div>
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

      <div className="horizontal-panel horizontal-contact">
        <ContactBlock eyebrow="03 / Start a conversation" />
      </div>
      </HorizontalSections>

      <section
        className="brand-glow"
        aria-label="NXT Frame"
        onMouseMove={(event) => {
          const heading = event.currentTarget.querySelector("h2");
          if (!heading) return;
          const rect = heading.getBoundingClientRect();
          heading.style.setProperty("--gx", `${event.clientX - rect.left}px`);
          heading.style.setProperty("--gy", `${event.clientY - rect.top}px`);
        }}
        onMouseLeave={(event) => {
          const heading = event.currentTarget.querySelector("h2");
          heading?.style.setProperty("--gx", "-1000px");
        }}
      >
        <h2>
          <span className="brand-glow-base">NXT FRAME</span>
          <span className="brand-glow-lit" aria-hidden="true">NXT FRAME</span>
        </h2>
      </section>
    </main>
  );
}
