import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

// Imported for its side effect so it lands in the build manifest; production inlines it into
// the HTML (vite.config.ts inlineCss) instead of a render-blocking stylesheet request.
import "../styles.css";
import interLatinFont from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteCursorTrail } from "../components/site/cursor-trail";
import { SiteFooter } from "../components/site/site-footer";
import { FloatingMenu } from "../components/site/floating-menu";

// Vercel Analytics + Speed Insights load in their own small file after the page is up, so they
// aren't part of the first download PageSpeed checks for unused code.
const VercelInsights = lazy(() => import("../components/vercel-insights"));

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    // Each content route, / included, still sets its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NXT Frame — Short-form video editing" },
      { name: "description", content: "Retention-first Reels, TikToks and Shorts from NXT Frame." },
      { name: "author", content: "NXT Frame" },
      { name: "google-site-verification", content: "mc4XsDm-Cvz-ESeMTZCZI8c0bvBjZX5iGwNs6tr32ec" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#19C2FF" },
      { property: "og:site_name", content: "NXT Frame" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "NXT Frame — Short-form video editing" },
      { property: "og:description", content: "Retention-first Reels, TikToks and Shorts from NXT Frame." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      // Inter is bundled with the site (no Google Fonts round trips); preload the Latin file.
      {
        rel: "preload",
        href: interLatinFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SitePreloader() {
  const [gone, setGone] = useState(false);

  // The slide-up itself is CSS (starts on first paint). This only removes the element afterwards,
  // with a fallback in case the animation already ended before the app's scripts loaded.
  useEffect(() => {
    const fallback = setTimeout(() => setGone(true), 800);
    return () => clearTimeout(fallback);
  }, []);

  if (gone) return null;

  return (
    <div
      className="preloader"
      role="status"
      aria-label="Loading NXT Frame"
      onAnimationEnd={() => setGone(true)}
    >
      <span className="preloader-word">NXT Frame</span>
    </div>
  );
}

function DeferredInsights() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    idle(() => setReady(true));
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <VercelInsights />
    </Suspense>
  );
}

function RootComponent() {
  return (
    <>
      <SitePreloader />
      <SiteCursorTrail />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SiteFooter />
      <FloatingMenu />
      <DeferredInsights />
    </>
  );
}
