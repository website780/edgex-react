'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, GraduationCap, Award } from 'lucide-react';
import { Fragment, useRef } from 'react';
import { Counter } from '../Reveal';
import { HeroArt } from '../Art';

const WORDS = ['Learn', 'with', 'clarity.', 'Move', 'ahead', 'with', 'confidence.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} className="grain relative isolate overflow-hidden bg-navy pt-32 text-white sm:pt-36">
      {/* animated backdrop */}
      <motion.div style={{ opacity: glow }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-gold/25 blur-[110px]" />
        <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-plum/60 blur-[110px]" />
        <div className="absolute inset-0 opacity-[.15] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </motion.div>

      <div className="mx-auto grid max-w-6xl items-end gap-8 px-6 lg:grid-cols-12">
        <motion.div style={{ y: yText }} className="pb-16 lg:col-span-7 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[.25em] text-gold backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Redefining Excellence
          </motion.p>

          <h1 className="font-display mt-7 text-[2.9rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]" aria-label="Learn with clarity. Move ahead with confidence.">
            {WORDS.map((w, i) => (
              <Fragment key={i}>
                {i === 3 && <br />}
                <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.15em] align-bottom" aria-hidden>
                  <motion.span
                    className={`inline-block ${w.startsWith('clarity') || w.startsWith('confidence') ? 'gold-text italic' : ''}`}
                    initial={{ y: '115%', rotate: 5 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-white/70"
          >
            Experienced coaching for Commerce, CA, ACCA and CFA in Mumbai, from the educators who practise what they teach.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href="/11th-12th-commerce/" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-bold text-ink transition hover:bg-gold-soft">
              Explore Programmes
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link href="/contact/" className="rounded-full border border-white/25 px-7 py-4 font-semibold transition hover:border-gold hover:text-gold">
              Book counselling
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-8"
          >
            {[
              { n: 40, s: '+', l: 'Years of teaching experience' },
              { n: 8, s: '', l: 'Expert faculty' },
              { n: 2, s: '', l: 'Centres in Mumbai' },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display text-4xl text-gold sm:text-5xl"><Counter to={s.n} suffix={s.s} /></dt>
                <dd className="mt-1 text-xs leading-snug text-white/55">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* pathway illustration */}
        <motion.div style={{ y: yImg }} className="relative mx-auto w-full max-w-md self-end pb-12 lg:col-span-5 lg:max-w-none">
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <HeroArt />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }}
            className="floaty absolute left-0 top-[10%] hidden items-center gap-3 rounded-2xl bg-ivory/95 px-4 py-3 text-navy shadow-xl backdrop-blur sm:-left-4 sm:flex"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-gold"><GraduationCap size={20} /></span>
            <span className="text-sm leading-tight"><b className="block">CA · ACCA · CFA</b><span className="text-navy/60">+ 11th/12th Commerce</span></span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.9 }}
            className="floaty absolute left-0 top-[28%] hidden items-center gap-3 rounded-2xl bg-ivory/95 px-4 py-3 text-navy shadow-xl backdrop-blur [animation-delay:-3s] sm:-left-4 sm:flex"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-ink"><Award size={20} /></span>
            <span className="text-sm leading-tight"><b className="block">Founded by</b><span className="text-navy/60">CA/CS Nihal Bhatt</span></span>
          </motion.div>
        </motion.div>
      </div>

      {/* curved bottom edge into ivory */}
      <div className="relative h-14 bg-ivory [clip-path:ellipse(75%_100%_at_50%_100%)] -mt-10" />
    </section>
  );
}
