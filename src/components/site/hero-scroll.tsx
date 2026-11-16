import { useEffect, useRef, type ReactNode } from "react";

/** A single pinned scene: original hero → blue phone → full-screen phone display. */
export function HeroScroll({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const phone = phoneRef.current;
    if (!scene || !phone) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const update = () => {
      frame = 0;
      if (reducedMotion.matches) return;
      const viewport = scene.querySelector<HTMLElement>(".hero-scroll-stage");
      if (!viewport) return;
      const distance = scene.offsetHeight - viewport.offsetHeight;
      const progress = clamp(-scene.getBoundingClientRect().top / Math.max(1, distance));
      const reveal = clamp(progress / 0.32);
      const zoom = clamp((progress - 0.42) / 0.48);
      const easedZoom = zoom * zoom * (3 - 2 * zoom);
      // Zoom far enough that the white display, not its bezel, fills either viewport.
      const fillScale = Math.max(
        viewport.offsetWidth / (phone.offsetWidth - 20),
        viewport.offsetHeight / (phone.offsetHeight - 20),
      ) * 1.15;
      scene.style.setProperty("--panel-offset", `${(1 - reveal) * 100}%`);
      scene.style.setProperty("--phone-scale", `${1 + easedZoom * (fillScale - 1)}`);
      scene.style.setProperty("--phone-copy-opacity", `${1 - clamp((zoom - 0.15) / 0.35)}`);
      scene.style.setProperty("--phone-detail-opacity", `${1 - clamp(zoom / 0.25)}`);
      scene.dataset["covered"] = reveal === 1 ? "true" : "false";
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-scroll-scene">
      <div className="hero-scroll-stage">
        <div className="hero-scroll-original">{children}</div>
        <section className="hero-scroll-panel" aria-label="Story to frame">
          <div ref={phoneRef} className="story-phone">
            <div className="story-phone-display">
              <div className="story-phone-camera" aria-hidden="true" />
              <div className="story-phone-home" aria-hidden="true" />
            </div>
          </div>
          {/* Kept outside the scaling phone so the text stays crisp during the zoom. */}
          <p className="story-phone-copy">Story<br /><span>To<br />&nbsp;Frame</span></p>
        </section>
      </div>
    </div>
  );
}