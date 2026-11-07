'use client';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * A row of content that drifts sideways on its own, speeds up while you scroll,
 * and reverses direction when you scroll back up. `dir` -1 = left, 1 = right.
 */
export default function MarqueeRow({ children, speed = 1.6, dir = -1, className = '' }: { children: ReactNode; speed?: number; dir?: 1 | -1; className?: string }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const flip = useRef(1);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const v = smooth.get();
    if (v < -20) flip.current = -1;
    else if (v > 20) flip.current = 1;
    const boost = 1 + Math.min(Math.abs(v) / 250, 7);
    base.set(base.get() + flip.current * dir * speed * boost * (delta / 1000));
  });

  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0 ? true : undefined}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Dot({ className = 'bg-gold' }: { className?: string }) {
  return <span aria-hidden className={`mx-6 inline-block h-2.5 w-2.5 shrink-0 rotate-45 sm:mx-9 sm:h-3.5 sm:w-3.5 ${className}`} />;
}
