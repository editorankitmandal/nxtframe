import { createFileRoute } from "@tanstack/react-router";
import { ContactBlock } from "@/components/site/contact-block";
import { pageHead } from "@/lib/site";

const nextSteps: [string, string, string][] = [
  ["01", "Tell us about your content", "Fill in the enquiry form with your channels, goals and how often you post."],
  ["02", "We suggest a plan", "We reply with the plan or custom quote that fits what you make."],
  ["03", "Start editing", "Send your footage and get your first edits back, ready to post."],
];

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      title: "Contact NXT Frame — Start Your Video Editing Project",
      description:
        "Get in touch with NXT Frame about short-form, YouTube Shorts, Instagram Reels or podcast video editing. Use the enquiry form or email us directly.",
      shareTitle: "Contact NXT Frame",
      shareDescription: "Got a good thing going? Let’s make the next one impossible to scroll past.",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <ContactBlock eyebrow="Contact" headingLevel="h1" />
      <section className="bg-hero-surface px-6 py-24 text-hero-ink md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black leading-[0.95] md:text-6xl">What happens next</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {nextSteps.map(([number, title, text]) => (
              <li key={number} className="border-t-2 border-hero-ink pt-6">
                <span className="text-xs font-bold">{number}</span>
                <h3 className="mt-3 text-2xl font-black">{title}</h3>
                <p className="mt-3 max-w-xs text-base font-medium opacity-75">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
