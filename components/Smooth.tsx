'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/** Smooth, slightly eased scrolling plus a thin gold progress bar across the top. */
export default function Smooth() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | null = null;
    let raf = 0;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, anchors: true });
      const loop = (t: number) => {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <div ref={bar} aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] origin-left scale-x-0 bg-gold" />;
}
