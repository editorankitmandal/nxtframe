export type Plan = {
  name: string;
  priceUsd: number;
  summary: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    name: "Shorts Starter",
    priceUsd: 249,
    summary: "For creators getting started with consistent short-form content.",
    features: [
      "8 short-form videos",
      "Professional cuts and captions",
      "Basic sound design",
      "Platform-ready exports",
      "2 revision rounds per video",
    ],
    cta: "Get Started",
  },
  {
    name: "Creator Growth",
    priceUsd: 449,
    summary: "For creators ready to publish more and grow their presence.",
    features: [
      "16 short-form videos",
      "Advanced captions and typography",
      "Motion graphics and transitions",
      "Sound design and color correction",
      "Platform-ready exports",
      "2 revision rounds per video",
    ],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Content Studio",
    priceUsd: 999,
    summary: "For creators and brands looking for a complete editing partner.",
    features: [
      "4 long-form YouTube videos",
      "8 short-form videos",
      "Advanced storytelling and editing",
      "Custom motion graphics",
      "Sound design and color correction",
      "Dedicated project coordination",
      "2 revision rounds per video",
    ],
    cta: "Let's Work Together",
  },
];

export const PRICING_FINE_PRINT =
  "All plans are billed monthly. Deliverables are fixed per plan. Unused deliverables do not roll over. Additional work is quoted separately.";

export function formatMonthlyPrice(priceUsd: number) {
  return `$${priceUsd} / month`;
}
