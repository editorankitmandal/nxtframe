import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServiceContent } from "@/components/site/service-page";
import { pageHead } from "@/lib/site";

const content: ServiceContent = {
  path: "/instagram-reels-editing",
  eyebrow: "Service / Instagram Reels",
  title: <>Instagram Reels<br />that stop the scroll.</>,
  intro:
    "Reels edited for how people actually watch Instagram: fast, often on mute, and one thumb away from moving on. We cut for the first second and make every frame earn the next.",
  includedTitle: <>Made for<br />the feed.</>,
  includedIntro: "Edits that look like your brand, read without sound, and keep people watching to the end.",
  included: [
    ["Scroll-stopping hooks", "A reason to stay in the first second."],
    ["On-brand captions", "Styled to match your feed and look."],
    ["Audio-led pacing", "Cuts timed to the music and voice."],
    ["Motion graphics & transitions", "Movement that adds, never distracts."],
    ["Color correction", "Clean, consistent colour across posts."],
    ["Safe-zone exports", "Text kept clear of Instagram’s buttons."],
  ],
  extraTitle: "One edit, every feed",
  extraText:
    "Every Reel is exported in 9:16 and ready to post to TikTok and YouTube Shorts as well, so one piece of content works everywhere.",
  pricingNote: "Reels are included in every monthly plan, from 8 to 16 videos a month.",
};

export const Route = createFileRoute("/instagram-reels-editing")({
  head: () =>
    pageHead({
      path: "/instagram-reels-editing",
      title: "Instagram Reels Editing Service — NXT Frame",
      description:
        "Instagram Reels editing for creators and brands: scroll-stopping hooks, on-brand captions, motion graphics and colour correction. Monthly plans from $249.",
      shareTitle: "Instagram Reels editing — NXT Frame",
      shareDescription: "Reels that stop the scroll and look like your brand.",
      jsonLd: {
        "@type": "Service",
        name: "Instagram Reels editing",
        serviceType: "Video editing",
        provider: { "@type": "Organization", name: "NXT Frame" },
        areaServed: "Worldwide",
      },
    }),
  component: () => <ServicePage content={content} />,
});
