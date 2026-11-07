'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/** A card that tilts in 3D toward the mouse and carries a soft gold light that follows the pointer. */
export default function Tilt({ children, className = '', max = 9, cursor }: { children: ReactNode; className?: string; max?: number; cursor?: 'view' | 'drag' }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 22 });
  const sy = useSpring(py, { stiffness: 200, damping: 22 });
  const rotY = useTransform(sx, [0, 1], [-max, max]);
  const rotX = useTransform(sy, [0, 1], [max, -max]);
  const glow = useTransform([sx, sy], ([a, b]) => `radial-gradient(260px circle at ${(a as number) * 100}% ${(b as number) * 100}%, rgba(212,166,42,.22), transparent 65%)`);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { px.set(0.5); py.set(0.5); };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} data-cursor={cursor} style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }} className="relative h-full">
        {children}
        <motion.span aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100" />
      </motion.div>
    </div>
  );
}
