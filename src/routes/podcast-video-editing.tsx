import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServiceContent } from "@/components/site/service-page";
import { pageHead } from "@/lib/site";

const content: ServiceContent = {
  path: "/podcast-video-editing",
  eyebrow: "Service / Podcast video",
  title: <>Podcast video,<br />episodes and clips.</>,
  intro:
    "We turn recorded episodes into a clean full-length video and a set of short clips, so one conversation works on YouTube, Reels and Shorts.",
  includedTitle: <>One episode.<br />Many posts.</>,
  includedIntro: "A polished full episode for YouTube, plus the strongest moments cut into vertical clips that bring new listeners in.",
  included: [
    ["Multi-camera editing", "Cuts that follow the conversation."],
    ["Clean, levelled audio", "Clear voices, less background noise."],
    ["Short-form clips", "The best moments cut for Shorts and Reels."],
    ["Animated captions", "Subtitles on every clip."],
    ["Branded graphics", "Intros, name titles and episode cards."],
    ["Platform-ready exports", "16:9 episodes and 9:16 clips."],
  ],
  extraTitle: "Built around your schedule",
  extraText:
    "Weekly show or monthly deep dive, we fit the workflow to how often you record, so episodes and clips go out on time.",
  pricingNote: "Podcast projects are quoted to fit your show.",
};

export const Route = createFileRoute("/podcast-video-editing")({
  head: () =>
    pageHead({
      path: "/podcast-video-editing",
      title: "Podcast Video Editing Service — NXT Frame",
      description:
        "Podcast video editing: multi-camera full episodes for YouTube plus short-form clips with captions for Shorts and Reels. Custom quotes for every show.",
      shareTitle: "Podcast video editing — NXT Frame",
      shareDescription: "Full episodes for YouTube and clips for Shorts and Reels.",
      jsonLd: {
        "@type": "Service",
        name: "Podcast video editing",
        serviceType: "Video editing",
        provider: { "@type": "Organization", name: "NXT Frame" },
        areaServed: "Worldwide",
      },
    }),
  component: () => <ServicePage content={content} />,
});
