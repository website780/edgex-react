'use client';
import { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';

type Dash = { p: number; speed: number; len: number; alpha: number; gold: boolean };
type Ray = { a: number; dashes: Dash[] };

const RAYS = 64;
const rand = (min: number, max: number) => min + Math.random() * (max - min);

function dash(initial: boolean): Dash {
  return {
    p: initial ? rand(0.1, 1) : rand(1, 1.08),
    speed: rand(0.07, 0.17),
    len: rand(0.7, 1.3),
    alpha: rand(0.55, 1),
    gold: Math.random() < 0.14,
  };
}

/**
 * Light moving inward: faint rays converge on the middle of the hero, and short bright dashes
 * travel along them from the edges toward the centre, shrinking and fading as they go.
 * The canvas fades in on load. The mouse nudges the point everything converges on.
 * Pauses off-screen; draws one still frame for reduced-motion.
 */
export default function HeroBackdrop({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let maxR = 0;
    let rays: Ray[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;
    let ox = 0;
    let oy = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const STRETCH = 1.6;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maxR = Math.hypot(w / (2 * STRETCH), h / 2) * 1.15;
      rays = Array.from({ length: RAYS }, (_, i) => ({
        a: (i / RAYS) * Math.PI * 2 + rand(-0.03, 0.03),
        dashes: [dash(true), dash(true)],
      }));
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      ox += (mx.get() * -50 - ox) * 0.05;
      oy += (my.get() * -36 - oy) * 0.05;
      const cx = w / 2 + ox;
      const cy = h / 2 + oy;
      ctx.lineCap = 'round';

      for (const ray of rays) {
        const cos = Math.cos(ray.a) * STRETCH;
        const sin = Math.sin(ray.a);

        // the faint ray itself
        ctx.strokeStyle = 'rgba(27,42,99,0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx + cos * maxR * 0.1, cy + sin * maxR * 0.1);
        ctx.lineTo(cx + cos * maxR, cy + sin * maxR);
        ctx.stroke();

        for (const d of ray.dashes) {
          if (!reduce) d.p -= d.speed * (dt / 1000) * (0.35 + d.p);
          if (d.p < 0.06) Object.assign(d, dash(false));
          const fadeIn = Math.min(1, Math.max(0, (1.02 - d.p) / 0.14));
          const fadeOut = Math.min(1, Math.max(0, (d.p - 0.07) / 0.22));
          const a = d.alpha * fadeIn * fadeOut;
          if (a < 0.02) continue;
          const head = d.p * maxR;
          const tail = head + maxR * (0.05 + 0.15 * d.p) * d.len;
          const hx = cx + cos * head;
          const hy = cy + sin * head;
          const tx = cx + cos * tail;
          const ty = cy + sin * tail;
          const g = ctx.createLinearGradient(tx, ty, hx, hy);
          const rgb = d.gold ? '25,176,216' : '27,60,200';
          g.addColorStop(0, `rgba(${rgb},0)`);
          g.addColorStop(1, `rgba(${rgb},${(a * (d.gold ? 0.8 : 0.55)).toFixed(3)})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = d.gold ? 2.2 : 1.7;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.stroke();
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(now - last, 50);
      last = now;
      draw(dt);
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    if (reduce) draw(0);
    else raf = requestAnimationFrame((t) => { last = t; loop(t); });
    const fade = requestAnimationFrame(() => setReady(true));

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fade);
      ro.disconnect();
      io.disconnect();
    };
  }, [mx, my]);

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,.2)_6%,black_34%,black_70%,transparent_98%)]">
      <canvas ref={canvas} className={`h-full w-full transition-opacity duration-[2400ms] ease-out ${ready ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}
