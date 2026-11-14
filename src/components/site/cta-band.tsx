import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ENQUIRY_FORM_URL, buttonSquareInk } from "@/lib/site";

/** Closing call to action for inner pages: enquiry form plus a link to pricing. */
export function CtaBand({ title = "Ready when you are.", text = "Tell us about your content and we’ll suggest the right plan." }: { title?: string; text?: string }) {
  return (
    <section className="bg-cyan px-6 py-20 text-foreground md:px-12 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <h2 className="max-w-2xl text-4xl font-black leading-[0.95] md:text-6xl">{title}</h2>
          <p className="mt-5 max-w-md text-lg font-semibold">{text}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={ENQUIRY_FORM_URL} target="_blank" rel="noreferrer" className={buttonSquareInk}>
            Open enquiry form <ArrowUpRight />
          </a>
          <Link to="/pricing" className="inline-flex h-12 items-center border-2 border-foreground px-6 text-sm font-black uppercase transition-colors hover:bg-foreground hover:text-background">
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
