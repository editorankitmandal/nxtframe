import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

export const CONTACT_EMAIL = "Editor.Ankitmandal@gmail.com";
export const ENQUIRY_FORM_URL = "https://tally.so/r/QoMPrX";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/nxt_frame.studio/",
  youtube: "https://www.youtube.com/@NXT-Frame.Studio",
  linkedin: "https://www.linkedin.com/company/the-nxt-frame-studio",
} as const;

export const SERVICE_PAGES = [
  { to: "/youtube-shorts-editing", label: "YouTube Shorts editing" },
  { to: "/instagram-reels-editing", label: "Instagram Reels editing" },
  { to: "/podcast-video-editing", label: "Podcast video editing" },
] as const;

export const STUDIO_PAGES = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/** Every public page, in sitemap order. */
export const SITE_PATHS = ["/", ...SERVICE_PAGES.map((p) => p.to), ...STUDIO_PAGES.map((p) => p.to)];

// Absolute URLs for canonical/og tags, built from whichever domain serves the page (Lovable or Vercel).
export const getSiteOrigin = createIsomorphicFn()
  .server(() => getRequestUrl({ xForwardedHost: true, xForwardedProto: true }).origin)
  .client(() => window.location.origin);

type PageHeadInput = {
  path: string;
  title: string;
  description: string;
  shareTitle?: string;
  shareDescription?: string;
  jsonLd?: Record<string, unknown>;
};

/** Per-page title, description, social tags and self-referencing canonical. */
export function pageHead({ path, title, description, shareTitle, shareDescription, jsonLd }: PageHeadInput) {
  const url = `${getSiteOrigin()}${path}`;
  const ogTitle = shareTitle ?? title;
  const ogDescription = shareDescription ?? description;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd
      ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", ...jsonLd }) }]
      : [],
  };
}

// Shared button looks (plain anchors keep tailwind-merge out of the bundle).
const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap px-7 text-sm font-black uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 [&_svg]:shrink-0";
export const buttonCyan = `${buttonBase} rounded-full bg-cyan text-hero-ink shadow hover:bg-cyan/85`;
export const buttonOutlineInk = `${buttonBase} rounded-full border border-hero-ink/45 bg-transparent text-hero-ink shadow-sm hover:bg-hero-ink hover:text-hero-surface`;
export const buttonSquareCyan = `${buttonBase} rounded-none bg-cyan px-6 text-foreground shadow hover:bg-cyan/85`;
export const buttonSquareInk = `${buttonBase} rounded-none bg-foreground px-6 text-background hover:bg-foreground/85`;
