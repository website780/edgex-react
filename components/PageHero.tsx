'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Words from './motion/Words';

/**
 * Header for every inner page: a label, a headline with a gradient phrase, a short intro and (optionally)
 * a photo, on a calm static background. The moving lines are kept for the homepage only.
 * Put "|" in the title to force a line break on wide screens.
 */
export default function PageHero({
  eyebrow,
  title,
  grad,
  sub,
  children,
  image,
  imageAlt = '',
}: {
  eyebrow?: string;
  title: string;
  grad?: string;
  sub?: string;
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white via-white to-[#f6f8fd]">
      <span aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[26px] border-accent-soft" />
      <span aria-hidden className="pointer-events-none absolute -bottom-32 left-[8%] h-64 w-64 rounded-full border-[20px] border-accent-soft/70" />
      <div className={`relative mx-auto max-w-6xl px-6 py-14 sm:py-20 ${image ? 'grid items-center gap-10 lg:grid-cols-12' : 'text-center'}`}>
        <div className={image ? 'lg:col-span-7' : 'mx-auto max-w-4xl'}>
          {eyebrow && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">
              {eyebrow}
            </motion.p>
          )}
          <Words as="h1" onLoad delay={0.1} text={title} grad={grad} className={`mt-4 text-[2rem] font-extrabold leading-[1.12] tracking-[-0.035em] text-navy sm:text-5xl ${image ? '' : 'mx-auto'}`} />
          {sub && (
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className={`mt-5 max-w-2xl text-lg leading-relaxed text-navy/70 ${image ? '' : 'mx-auto'}`}>
              {sub}
            </motion.p>
          )}
          {children && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}>
              {children}
            </motion.div>
          )}
        </div>
        {image && (
          <motion.div initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-white">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 440px, 100vw" className="object-cover" />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
