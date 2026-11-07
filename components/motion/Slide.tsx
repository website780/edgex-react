'use client';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Slides in from the left or right when it scrolls into view. */
export default function Slide({ children, from = 'left', delay = 0, distance = 110, className = '' }: { children: ReactNode; from?: 'left' | 'right'; delay?: number; distance?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: from === 'left' ? -distance : distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
