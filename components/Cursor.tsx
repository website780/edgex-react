'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

type Mode = 'idle' | 'link' | 'view' | 'drag' | 'native';

/**
 * Custom cursor: a small dot that follows exactly plus a ring that trails behind.
 * The ring grows over links and shows a label over elements marked data-cursor="view" / "drag".
 * Only on devices with a real mouse and without reduced-motion; elsewhere the normal cursor stays.
 */
export default function Cursor() {
  const [on, setOn] = useState(false);
  const [mode, setMode] = useState<Mode>('idle');
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 420, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setOn(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      if (t.closest('input, textarea, select')) return setMode('native');
      const tag = (t.closest('[data-cursor]') as HTMLElement | null)?.dataset.cursor;
      if (tag === 'view' || tag === 'drag') return setMode(tag);
      setMode(t.closest('a, button, [role="tab"], label, summary') ? 'link' : 'idle');
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    const leave = () => setHidden(true);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', dn);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  if (!on) return null;
  const label = mode === 'view' ? 'View' : mode === 'drag' ? 'Drag' : '';
  const size = label ? 84 : mode === 'link' ? 56 : 34;
  const show = !hidden && mode !== 'native';

  return (
    <>
      <motion.div aria-hidden style={{ x: rx, y: ry }} className="pointer-events-none fixed left-0 top-0 z-[9999]">
        <motion.div
          animate={{ width: size, height: size, opacity: show ? 1 : 0, scale: down ? 0.85 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full text-[12px] font-bold ${label ? 'bg-gold text-ink shadow-[0_0_0_2px_#fff]' : 'border-2 border-navy shadow-[0_0_0_1.5px_rgba(255,255,255,.85),inset_0_0_0_1.5px_rgba(255,255,255,.85)]'} ${mode === 'link' ? 'bg-accent/20' : ''}`}
        >
          {label}
        </motion.div>
      </motion.div>
      <motion.div aria-hidden style={{ x, y }} animate={{ opacity: show && !label ? 1 : 0 }} className="pointer-events-none fixed left-0 top-0 z-[9999]">
        <div className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy shadow-[0_0_0_2px_#fff]" />
      </motion.div>
    </>
  );
}
