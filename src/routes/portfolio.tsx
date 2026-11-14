import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { ReelGrid } from "@/components/site/reels";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead({
      path: "/portfolio",
      title: "Portfolio — Short-form Video Edits by NXT Frame",
      description:
        "Selected Reels, YouTube Shorts and TikTok edits from NXT Frame: vertical-first videos with sharp hooks, kinetic type and sound-led pacing.",
      shareTitle: "NXT Frame portfolio",
      shareDescription: "Vertical-first edits made for the full-screen era.",
    }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <PageHero
        eyebrow="Portfolio"
        title={<>Made for the<br />full-screen era.</>}
        intro={<p>Vertical-first edits, cut with a clear point of view and built to earn the next second.</p>}
      />
      <section className="bg-orange px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-10 text-xs font-bold uppercase text-primary-foreground/65">Selected work</p>
          <ReelGrid />
        </div>
      </section>
      <CtaBand title="Want yours next?" text="Send us your footage and we’ll show you what it can become." />
    </main>
  );
}
