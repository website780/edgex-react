'use client';
import { motion } from 'framer-motion';

/** Heading whose words rise out of a mask one after another, on load or when scrolled into view. */
export default function Words({ text, className = '', as = 'h2', onLoad = false, delay = 0, mark, grad }: { text: string; className?: string; as?: 'h1' | 'h2'; onLoad?: boolean; delay?: number; mark?: string; grad?: string }) {
  const M = motion[as];
  const marked = mark ? mark.split(' ') : [];
  const graded = grad ? grad.split(' ') : [];
  return (
    <M
      aria-label={text.replace(' | ', ' ')}
      className={className}
      initial="hide"
      {...(onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-12% 0px' } })}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {text.split(' ').map((w, i) => w === '|' ? <br key={i} className="hidden lg:block" /> : (
        <span key={i} aria-hidden className="mr-[0.26em] inline-block overflow-hidden pb-[0.14em] align-bottom">
          <motion.span className="inline-block" variants={{ hide: { y: '115%' }, show: { y: 0 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            {marked.includes(w.replace(/[.,]/g, '')) ? <span className="bg-accent-soft px-2.5">{w}</span> : graded.includes(w.replace(/[.,]/g, '')) ? <span className="accent-grad bg-clip-text text-transparent">{w}</span> : w}
          </motion.span>
        </span>
      ))}
    </M>
  );
}
