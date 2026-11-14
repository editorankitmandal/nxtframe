import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { CONTACT_EMAIL, SERVICE_PAGES, SOCIAL_LINKS, STUDIO_PAGES } from "@/lib/site";

export function SocialLinks() {
  const items = [
    { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: Instagram },
    { href: SOCIAL_LINKS.youtube, label: "YouTube", Icon: Youtube },
    { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: Linkedin },
  ];
  return (
    <div className="flex items-center gap-3" aria-label="Social media">
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          className="flex size-11 items-center justify-center border border-background/30 transition-colors hover:bg-cyan hover:text-foreground"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-background/15 bg-foreground px-6 pt-16 text-background md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black uppercase">NXT Frame</p>
          <p className="mt-3 max-w-xs text-sm font-medium text-background/60">
            Short-form video editing for creators and brands. Your story, our frame.
          </p>
          <a className="mt-5 inline-block break-all text-sm font-bold transition-opacity hover:opacity-70" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-background/50">Services</p>
          <ul className="mt-4 space-y-2.5">
            {SERVICE_PAGES.map((page) => (
              <li key={page.to}>
                <Link to={page.to} className="text-sm font-bold transition-colors hover:text-cyan">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-background/50">Studio</p>
          <ul className="mt-4 space-y-2.5">
            {STUDIO_PAGES.map((page) => (
              <li key={page.to}>
                <Link to={page.to} className="text-sm font-bold transition-colors hover:text-cyan">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-background/15 py-7 text-xs font-semibold uppercase text-background/45 md:flex-row">
        <span>© 2026 NXT Frame</span>
        <a
          className="text-background/45 transition-colors hover:text-cyan"
          href="https://princemandalportfolio.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Design by Prince Mandal
        </a>
      </div>
    </footer>
  );
}
