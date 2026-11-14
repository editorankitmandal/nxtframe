import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ENQUIRY_FORM_URL, SERVICE_PAGES, buttonCyan, buttonOutlineInk } from "@/lib/site";
import { CtaBand } from "./cta-band";
import { PageHero } from "./page-hero";

export type ServiceContent = {
  path: (typeof SERVICE_PAGES)[number]["to"];
  eyebrow: string;
  title: ReactNode;
  intro: string;
  includedTitle: ReactNode;
  includedIntro: string;
  included: [string, string][];
  extraTitle: string;
  extraText: string;
  pricingNote: string;
};

const steps: [string, string, string][] = [
  ["01", "Send your footage", "Share your raw files and a short brief through the enquiry form."],
  ["02", "We edit", "Hook, cuts, captions and sound, shaped for the platform it’s going to."],
  ["03", "Review and publish", "Two revision rounds per video, then platform-ready exports."],
];

export function ServicePage({ content }: { content: ServiceContent }) {
  const others = SERVICE_PAGES.filter((page) => page.to !== content.path);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <PageHero eyebrow={content.eyebrow} title={content.title} intro={<p>{content.intro}</p>}>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={ENQUIRY_FORM_URL} target="_blank" rel="noreferrer" className={buttonCyan}>
            Start a project <ArrowUpRight />
          </a>
          <Link to="/portfolio" className={buttonOutlineInk}>
            See our work
          </Link>
        </div>
      </PageHero>

      <section className="bg-cyan px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-bold uppercase">What you get</p>
            <h2 className="text-5xl font-black leading-[0.9] md:text-7xl">{content.includedTitle}</h2>
            <p className="mt-8 max-w-md text-lg font-semibold leading-snug">{content.includedIntro}</p>
          </div>
          <div className="border-t-2 border-foreground">
            {content.included.map(([title, description], index) => (
              <div key={title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-foreground/30 py-5 md:grid-cols-[3rem_1fr_auto] md:items-center md:gap-6 md:py-6">
                <span className="pt-1 text-xs font-bold">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-black md:text-2xl">{title}</h3>
                <p className="col-start-2 text-sm font-medium md:col-start-auto md:text-right">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-orange px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase text-primary-foreground/65">How it works</p>
          <h2 className="max-w-3xl text-5xl font-black leading-[0.9] md:text-7xl">Three steps.<br />No guesswork.</h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(([number, title, text]) => (
              <li key={number} className="border-t-2 border-foreground pt-6">
                <span className="text-xs font-bold">{number}</span>
                <h3 className="mt-3 text-2xl font-black">{title}</h3>
                <p className="mt-3 max-w-xs text-base font-medium text-primary-foreground/80">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-hero-surface px-6 py-24 text-hero-ink md:px-12 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">{content.extraTitle}</h2>
            <p className="mt-5 max-w-lg text-lg font-medium opacity-80">{content.extraText}</p>
            <p className="mt-5 max-w-lg text-lg font-medium opacity-80">
              {content.pricingNote}{" "}
              <Link to="/pricing" className="font-black underline decoration-2 underline-offset-4 hover:text-orange">
                View pricing
              </Link>
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase opacity-60">Other services</p>
            <ul className="mt-4 border-t-2 border-hero-ink">
              {others.map((page) => (
                <li key={page.to} className="border-b border-hero-ink/25">
                  <Link to={page.to} className="flex items-center justify-between py-5 text-xl font-black transition-colors hover:text-orange md:text-2xl">
                    {page.label} <ArrowUpRight className="size-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
