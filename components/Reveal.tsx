'use client';
import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Quiet fade-in on scroll. Kept deliberately small. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Plain heading (name kept so existing pages keep working). */
export function SplitWords({
  text,
  className = '',
  as: Tag = 'h1',
}: {
  text: string;
  className?: string;
  gold?: number[];
  delay?: number;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return <Tag className={className}>{text}</Tag>;
}

export function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
