import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServiceContent } from "@/components/site/service-page";
import { pageHead } from "@/lib/site";

const content: ServiceContent = {
  path: "/youtube-shorts-editing",
  eyebrow: "Service / YouTube Shorts",
  title: <>YouTube Shorts<br />that keep looping.</>,
  intro:
    "We edit vertical Shorts built for the Shorts feed: a hook in the first second, tight pacing, bold captions and an ending that sends viewers straight back to the start.",
  includedTitle: <>Every second<br />earns the next.</>,
  includedIntro: "Shorts live or die on the swipe. Each edit is shaped to stop it, hold attention to the end, and loop.",
  included: [
    ["Hook-first structure", "Open on the moment that stops the swipe."],
    ["Captions & kinetic type", "Readable on mute, timed to the beat."],
    ["Pacing & jump cuts", "No dead air, no wasted frames."],
    ["Sound design", "Effects and music that push the edit forward."],
    ["Loop-friendly endings", "Endings that roll back into the start."],
    ["Platform-ready exports", "9:16, safe zones checked, ready to upload."],
  ],
  extraTitle: "Turn long videos into Shorts",
  extraText:
    "Already publishing long-form on YouTube? We cut your best moments into Shorts that stand on their own and point viewers back to the full video.",
  pricingNote: "Shorts are included in every monthly plan, from 8 to 16 videos a month.",
};

export const Route = createFileRoute("/youtube-shorts-editing")({
  head: () =>
    pageHead({
      path: "/youtube-shorts-editing",
      title: "YouTube Shorts Editing Service — NXT Frame",
      description:
        "Professional YouTube Shorts editing: hook-first structure, captions, tight pacing, sound design and loop-friendly endings. Monthly plans from $249.",
      shareTitle: "YouTube Shorts editing — NXT Frame",
      shareDescription: "Shorts with a hook in the first second and an ending that loops.",
      jsonLd: {
        "@type": "Service",
        name: "YouTube Shorts editing",
        serviceType: "Video editing",
        provider: { "@type": "Organization", name: "NXT Frame" },
        areaServed: "Worldwide",
      },
    }),
  component: () => <ServicePage content={content} />,
});
