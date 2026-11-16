import { useEffect, useRef, type ReactNode } from "react";

export function HorizontalSections({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const stage = scene.querySelector<HTMLElement>(".horizontal-stage");
    const track = scene.querySelector<HTMLElement>(".horizontal-track");
    if (!stage || !track) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let animation = 0;
    let settleTimer = 0;
    let wheelTimer = 0;
    let wheelBusy = false;
    let touchY: number | null = null;
    const lastIndex = Math.max(1, track.children.length - 1);
    const geometry = () => ({
      top: window.scrollY + scene.getBoundingClientRect().top,
      distance: scene.offsetHeight - stage.offsetHeight,
    });
    const currentIndex = () => {
      const { top, distance } = geometry();
      return Math.round(Math.max(0, Math.min(1, ((window.scrollY - top) / distance - 0.1) / 0.8)) * lastIndex);
    };
    const inScene = () => {
      const { top, distance } = geometry();
      return !motion.matches && window.scrollY >= top - 1 && window.scrollY <= top + distance + 1;
    };
    const snapTo = (index: number) => {
      const { top, distance } = geometry();
      const target = top + (0.1 + (index / lastIndex) * 0.8) * distance;
      const start = window.scrollY;
      if (Math.abs(target - start) < 1) return;
      window.clearTimeout(settleTimer);
      cancelAnimationFrame(animation);
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 360);
        const ease = 1 - (1 - progress) ** 3;
        window.scrollTo({ top: start + (target - start) * ease, behavior: "instant" });
        update();
        animation = progress < 1 ? requestAnimationFrame(tick) : 0;
      };
      animation = requestAnimationFrame(tick);
    };
    const update = () => {
      frame = 0;
      if (motion.matches) {
        scene.style.setProperty("--section-x", "0px");
        return;
      }
      const distance = scene.offsetHeight - stage.offsetHeight;
      const progress = Math.max(0, Math.min(1, -scene.getBoundingClientRect().top / Math.max(1, distance)));
      // Give the first and last frames a little reading time before entering/leaving.
      const travel = Math.max(0, Math.min(1, (progress - 0.1) / 0.8));
      scene.style.setProperty("--section-x", `${-travel * (track.scrollWidth - stage.offsetWidth)}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onScroll = () => {
      schedule();
      window.clearTimeout(settleTimer);
      if (!animation && inScene()) {
        settleTimer = window.setTimeout(() => snapTo(currentIndex()), 120);
      }
    };
    const step = (direction: number) => {
      const index = currentIndex();
      const next = index + direction;
      if (next < 0 || next > lastIndex) return false;
      snapTo(next);
      return true;
    };
    const onWheel = (event: WheelEvent) => {
      if (!inScene() || event.ctrlKey || event.deltaY === 0) return;
      if (animation || wheelBusy) {
        event.preventDefault();
      } else if (step(Math.sign(event.deltaY))) {
        event.preventDefault();
        wheelBusy = true;
      } else {
        return;
      }
      // Treat trackpad momentum as one gesture, not several section changes.
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => { wheelBusy = false; }, 180);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY;
      if (!inScene() || touchY === null || y === undefined) return;
      if (animation) { event.preventDefault(); return; }
      const delta = touchY - y;
      if (Math.abs(delta) < 12) return;
      if (step(Math.sign(delta))) {
        event.preventDefault();
        touchY = null;
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (motion.matches || !(event.target instanceof HTMLElement)) return;
      const panel = event.target.closest(".horizontal-panel");
      const panels = Array.from(track.children);
      const index = panel ? panels.indexOf(panel) : -1;
      if (index < 0) return;
      const bounds = panel?.getBoundingClientRect();
      if (bounds && bounds.left >= -1 && bounds.right <= stage.offsetWidth + 1) return;
      const top = window.scrollY + scene.getBoundingClientRect().top;
      const progress = 0.1 + (index / Math.max(1, panels.length - 1)) * 0.8;
      window.scrollTo({ top: top + progress * (scene.offsetHeight - stage.offsetHeight), behavior: "instant" });
      schedule();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    track.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(animation);
      window.clearTimeout(settleTimer);
      window.clearTimeout(wheelTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      track.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <div ref={sceneRef} className="horizontal-scene">
      <div className="horizontal-stage">
        <div className="horizontal-track">{children}</div>
      </div>
    </div>
  );
}