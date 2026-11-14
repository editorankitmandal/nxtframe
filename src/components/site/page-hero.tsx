import type { ReactNode } from "react";

/** Top section for inner pages, on the same cream surface as the header. */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative bg-hero-surface px-6 pb-24 pt-16 text-hero-ink md:px-12 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs font-bold uppercase opacity-60">{eyebrow}</p>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.88] sm:text-6xl md:text-8xl">{title}</h1>
        <div className="mt-8 max-w-2xl text-lg font-medium leading-relaxed opacity-80 md:text-xl">{intro}</div>
        {children}
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-orange" />
    </section>
  );
}
