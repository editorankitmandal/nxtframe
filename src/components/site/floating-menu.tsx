import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { SERVICE_PAGES } from "@/lib/site";

const menuPages = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Work" },
] as const;

const trailingPages = [
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

const menuLinkClass =
  "whitespace-nowrap rounded-full px-2.5 py-2.5 text-[10px] font-bold uppercase transition-colors hover:bg-background/10 hover:text-cyan sm:px-4 sm:py-3 sm:text-xs [&[data-status=active]]:bg-background/10 [&[data-status=active]]:text-cyan";

export function FloatingMenu() {
  const [visible, setVisible] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let showTimer: number | undefined;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 8) return;
      lastScrollY = currentScrollY;

      setVisible(false);
      setServicesOpen(false);
      window.clearTimeout(showTimer);
      showTimer = window.setTimeout(() => setVisible(true), 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(showTimer);
    };
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [servicesOpen]);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:bottom-6 ${
        visible ? "translate-y-0" : "translate-y-[calc(100%+2rem)]"
      }`}
    >
      <nav
        className="pointer-events-auto relative flex max-w-full items-center rounded-full border border-background/15 bg-navy p-1 text-background shadow-2xl"
        aria-label="Main navigation"
      >
        {menuPages.map((page) => (
          <Link key={page.to} to={page.to} className={menuLinkClass} onClick={() => setServicesOpen(false)}>
            {page.label}
          </Link>
        ))}

        <button
          type="button"
          className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2.5 text-[10px] font-bold uppercase transition-colors hover:bg-background/10 hover:text-cyan sm:px-4 sm:py-3 sm:text-xs ${
            servicesOpen ? "bg-background/10 text-cyan" : ""
          }`}
          aria-expanded={servicesOpen}
          aria-controls="services-menu"
          onClick={() => setServicesOpen((open) => !open)}
        >
          Services
          <ChevronUp className={`size-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>

        {trailingPages.map((page) => (
          <Link key={page.to} to={page.to} className={menuLinkClass} onClick={() => setServicesOpen(false)}>
            {page.label}
          </Link>
        ))}

        <Link
          to="/contact"
          className="whitespace-nowrap rounded-full bg-cyan px-3 py-2.5 text-[10px] font-black uppercase text-foreground transition-opacity hover:opacity-85 sm:px-4 sm:py-3 sm:text-xs"
          onClick={() => setServicesOpen(false)}
        >
          Contact
        </Link>

        {servicesOpen && (
          <div
            id="services-menu"
            className="absolute bottom-[calc(100%+0.75rem)] left-1/2 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-3xl border border-background/15 bg-navy p-2 shadow-2xl"
          >
            <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase text-background/50">Editing services</p>
            {SERVICE_PAGES.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className="block rounded-2xl px-3 py-3 text-sm font-bold transition-colors hover:bg-background/10 hover:text-cyan [&[data-status=active]]:text-cyan"
                onClick={() => setServicesOpen(false)}
              >
                {page.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
