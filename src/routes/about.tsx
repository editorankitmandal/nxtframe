import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { pageHead } from "@/lib/site";

const principles: [string, string][] = [
  ["Retention first", "Every decision starts with one question: why would someone keep watching?"],
  ["Made for each platform", "Shorts, Reels and podcasts each get edits shaped for how people watch them."],
  ["Clear communication", "Simple briefs, honest timelines and two revision rounds on every video."],
  ["Consistent delivery", "Monthly plans with fixed deliverables, so your content keeps moving."],
];

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About NXT Frame — Video Editing Studio for Creators & Brands",
      description:
        "NXT Frame is a video editing studio for creators and brands, focused on short-form content, YouTube Shorts, Instagram Reels and podcast clips.",
      shareTitle: "About NXT Frame",
      shareDescription: "A video editing studio built for the scroll.",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <PageHero
        eyebrow="About"
        title={<>A studio built<br />for the scroll.</>}
        intro={
          <p>
            NXT Frame is a video editing studio for creators and brands. We focus on short-form and creator
            content because that’s where attention is won or lost in the first second.
          </p>
        }
      />

      <section className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-24">
          <h2 className="text-5xl font-black leading-[0.9] md:text-7xl">
            Your story,<br />
            <span className="text-cyan">our frame.</span>
          </h2>
          <div className="space-y-6 text-lg font-medium leading-relaxed text-background/75">
            <p>
              Good editing is felt before it’s noticed. We find the rhythm in your footage, sharpen the story and
              shape every cut, caption and sound around keeping people watching.
            </p>
            <p>
              From YouTube Shorts and Instagram Reels to full podcast episodes and their clips, we work as an
              extension of your team, so you can focus on making things while we make them land.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-orange px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase text-primary-foreground/65">How we work</p>
          <h2 className="max-w-3xl text-5xl font-black leading-[0.9] md:text-7xl">What we<br />care about.</h2>
          <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2">
            {principles.map(([title, text], index) => (
              <div key={title} className="border-t-2 border-foreground pt-6">
                <span className="text-xs font-bold">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-2xl font-black md:text-3xl">{title}</h3>
                <p className="mt-3 max-w-md text-base font-medium text-primary-foreground/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let’s make something." />
    </main>
  );
}
