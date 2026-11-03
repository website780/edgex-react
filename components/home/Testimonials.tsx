'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/site';
import { Reveal, SplitWords } from '../Reveal';
import { Initials } from '../Art';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, [paused]);
  const t = TESTIMONIALS[i];

  return (
    <section className="grain relative overflow-hidden bg-navy py-12 sm:py-16 text-white sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-gold">Student voices</p></Reveal>
        <SplitWords as="h2" text="Heard from our successful students." gold={[3, 4]} className="font-display mt-4 text-4xl leading-[1.1] sm:text-5xl" />

        <div className="mt-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Quote size={44} className="mx-auto text-gold/70" />
          <div className="relative mt-6 min-h-[16rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.55 }}
              >
                <p className="text-xs font-bold uppercase tracking-[.25em] text-gold">{t.title}</p>
                <blockquote className="font-display mx-auto mt-4 max-w-2xl text-2xl leading-snug sm:text-3xl">“{t.text}”</blockquote>
                <figcaption className="mt-8 flex items-center justify-center gap-3">
                  <Initials name={t.name} className="h-12 w-12 text-lg" />
                  <span className="font-semibold">{t.name}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className={`h-2 rounded-full transition-all duration-500 ${k === i ? 'w-10 bg-gold' : 'w-2 bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
