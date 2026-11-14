import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ENQUIRY_FORM_URL, buttonSquareCyan, buttonSquareInk, pageHead } from "@/lib/site";
import { PLANS, PRICING_FINE_PRINT, formatMonthlyPrice } from "@/lib/pricing";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead({
      path: "/pricing",
      title: "Pricing — Video Editing Plans from $249/month | NXT Frame",
      description:
        "Simple monthly video editing plans: Shorts Starter $249, Creator Growth $449 and Content Studio $999. Custom quotes for podcasts, YouTube and branded content.",
      shareTitle: "NXT Frame pricing — Simple pricing. Serious editing.",
      shareDescription: "Monthly editing plans from $249 for creators and brands.",
      jsonLd: {
        "@type": "Service",
        name: "Video editing plans",
        provider: { "@type": "Organization", name: "NXT Frame" },
        offers: PLANS.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          description: plan.summary,
          price: plan.priceUsd,
          priceCurrency: "USD",
        })),
      },
    }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <PageHero
        eyebrow="Pricing"
        title={<>Simple pricing.<br />Serious editing.</>}
        intro={
          <>
            <p className="font-black">Creative editing that scales with your content.</p>
            <p className="mt-3">
              Whether you’re an independent creator or a growing brand, we have a plan that keeps your content moving.
            </p>
          </>
        }
      />

      <section className="bg-cyan px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col border-2 border-foreground p-8 ${plan.featured ? "bg-foreground text-background" : "bg-background text-foreground"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-black">{plan.name}</h2>
                {plan.featured && (
                  <span className="bg-cyan px-2.5 py-1 text-[0.65rem] font-black uppercase text-foreground">Most popular</span>
                )}
              </div>
              <p className="mt-6 text-5xl font-black">
                ${plan.priceUsd}
                <span className="ml-1 text-base font-bold opacity-60">/ month</span>
              </p>
              <span className="sr-only">{formatMonthlyPrice(plan.priceUsd)}</span>
              <p className="mt-4 text-base font-medium opacity-75">{plan.summary}</p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-current/20 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm font-semibold">
                    <Check className="mt-0.5 size-4 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={ENQUIRY_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className={`${plan.featured ? buttonSquareCyan : buttonSquareInk} mt-10 w-full`}
              >
                {plan.cta} <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-sm font-semibold italic">{PRICING_FINE_PRINT}</p>
      </section>

      <section className="bg-orange px-6 py-24 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-2xl text-4xl font-black leading-[0.95] md:text-6xl">Have a different project in mind?</h2>
            <p className="mt-5 max-w-xl text-lg font-semibold text-primary-foreground/80">
              From podcast production and YouTube videos to branded content and custom motion graphics, let’s build
              something around your requirements.
            </p>
          </div>
          <a href={ENQUIRY_FORM_URL} target="_blank" rel="noreferrer" className={buttonSquareInk}>
            Get a Custom Quote <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  );
}
