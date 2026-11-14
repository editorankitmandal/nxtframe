import { useEffect, useRef, useState } from "react";
import goldAward from "@/assets/trail-gold-award.webp";
import headphones from "@/assets/trail-headphones.webp";
import clapper from "@/assets/trail-clapper.webp";
import badge from "@/assets/trail-badge.webp";
import heart from "@/assets/trail-heart.webp";
import views from "@/assets/trail-views.webp";

const cursorTrailImages = [goldAward, headphones, clapper, badge, heart, views];

type CursorTrailImage = {
  id: number;
  image: string;
  x: number;
  y: number;
  rotation: number;
};

export function SiteCursorTrail() {
  const [trail, setTrail] = useState<CursorTrailImage[]>([]);
  const sequence = useRef(0);
  const lastPosition = useRef<{ x: number; y: number; at: number } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const x = event.clientX;
      const y = event.clientY;
      const bounds = { width: window.innerWidth, height: window.innerHeight };
      const now = performance.now();
      const previous = lastPosition.current;

      if (previous && (Math.hypot(x - previous.x, y - previous.y) < 80 || now - previous.at < 90)) {
        return;
      }

      lastPosition.current = { x, y, at: now };
      const id = sequence.current++;
      const nextImage = cursorTrailImages[id % cursorTrailImages.length];
      if (!nextImage) return;

      const padding = 112;
      const image = {
        id,
        image: nextImage,
        x: Math.max(padding, Math.min(bounds.width - padding, x)),
        y: Math.max(padding, Math.min(bounds.height - padding, y)),
        rotation: ((id % 3) - 1) * 7,
      };

      setTrail((current) => [...current, image].slice(-5));
      timers.current.push(
        setTimeout(() => setTrail((current) => current.filter((item) => item.id !== id)), 1750),
      );
    };

    document.addEventListener("pointermove", onPointerMove);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="site-cursor-trail-layer" aria-hidden="true">
      {trail.map((item) => (
        <img
          key={item.id}
          className="site-cursor-trail-image"
          src={item.image}
          alt=""
          style={{ left: item.x, top: item.y, rotate: `${item.rotation}deg` }}
        />
      ))}
    </div>
  );
}
