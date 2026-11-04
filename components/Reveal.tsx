'use client';
import { useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Marks a block to ease in as it scrolls into view (handled by <Motion />). */
export function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  return <div className={`reveal ${className}`.trim()}>{children}</div>;
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
