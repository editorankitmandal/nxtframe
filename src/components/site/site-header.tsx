import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logoMark from "@/assets/nxt-frame-mark.webp";
import { SERVICE_PAGES, STUDIO_PAGES } from "@/lib/site";

const navLink = "text-sm font-black uppercase transition-opacity hover:opacity-60";
const activeLink = { className: "underline decoration-2 underline-offset-8" };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="relative z-20 bg-hero-surface text-hero-ink">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link to="/" className="flex items-center gap-2.5" onClick={close} aria-label="NXT Frame home">
          <img className="size-9 object-contain invert" src={logoMark} alt="" width={36} height={36} />
          <span className="text-base font-black uppercase">NXT Frame</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          <div className="group relative">
            <button type="button" className={`${navLink} flex items-center gap-1`} aria-haspopup="true">
              Services <ChevronDown className="size-4" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="border-2 border-hero-ink bg-hero-surface p-2">
                {SERVICE_PAGES.map((page) => (
                  <Link
                    key={page.to}
                    to={page.to}
                    className="block px-4 py-3 text-sm font-bold transition-colors hover:bg-cyan"
                    activeProps={{ className: "bg-cyan" }}
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {STUDIO_PAGES.filter((p) => p.to !== "/contact").map((page) => (
            <Link key={page.to} to={page.to} className={navLink} activeProps={activeLink}>
              {page.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex h-11 items-center rounded-full bg-cyan px-6 text-sm font-black uppercase transition-colors hover:bg-cyan/85"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="flex size-11 items-center justify-center lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="absolute inset-x-0 top-full border-y-2 border-hero-ink bg-hero-surface px-6 pb-8 pt-4 lg:hidden" aria-label="Mobile">
          <p className="mb-2 text-xs font-bold uppercase opacity-60">Services</p>
          {SERVICE_PAGES.map((page) => (
            <Link key={page.to} to={page.to} onClick={close} className="block py-2.5 text-lg font-black">
              {page.label}
            </Link>
          ))}
          <p className="mb-2 mt-6 text-xs font-bold uppercase opacity-60">Studio</p>
          {STUDIO_PAGES.map((page) => (
            <Link key={page.to} to={page.to} onClick={close} className="block py-2.5 text-lg font-black">
              {page.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
