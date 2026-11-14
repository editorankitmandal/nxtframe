import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, ENQUIRY_FORM_URL, buttonSquareCyan } from "@/lib/site";
import { SocialLinks } from "./site-footer";

type ContactBlockProps = {
  eyebrow?: string;
  /** The contact page uses this as its main heading. */
  headingLevel?: "h1" | "h2";
};

export function ContactBlock({ eyebrow = "Start a conversation", headingLevel = "h2" }: ContactBlockProps) {
  const Heading = headingLevel;
  return (
    <section id="contact" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase text-background/60">{eyebrow}</p>
          <Heading className="max-w-3xl text-5xl font-black leading-[0.9] md:text-8xl">
            Got a good<br />thing going?
          </Heading>
          <p className="mt-7 max-w-md text-lg font-medium text-background/70">
            Let’s make the next one impossible to scroll past.
          </p>
          <a href={ENQUIRY_FORM_URL} target="_blank" rel="noreferrer" className={`${buttonSquareCyan} mt-9`}>
            Open enquiry form <ArrowUpRight />
          </a>
        </div>
        <div className="border-t border-background/25 pt-6 lg:min-w-64 lg:justify-self-end">
          <p className="text-xs font-bold uppercase text-background/55">Email</p>
          <a className="mt-2 inline-block break-all text-lg font-bold transition-opacity hover:opacity-70" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <div className="mt-7">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
