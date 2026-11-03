'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { GraduationCap, HeartHandshake } from 'lucide-react';
import { Reveal, SplitWords } from '../Reveal';
import { ApproachArt } from '../Art';

const TABS = {
  student: {
    icon: GraduationCap,
    label: 'Student',
    qs: ['Will difficult concepts become easier?', 'Will I know what to study next?', 'Can I ask for help?'],
  },
  parent: {
    icon: HeartHandshake,
    label: 'Parent',
    qs: ['Is the faculty experienced?', 'Is there a clear academic structure?', 'Will my child stay consistent?'],
  },
} as const;

export default function Approach() {
  const [tab, setTab] = useState<keyof typeof TABS>('student');
  return (
    <section className="relative overflow-hidden bg-sand py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-plum">The EdgeX approach</p></Reveal>
          <SplitWords as="h2" text="Students need direction. Parents need confidence." gold={[1, 4]} className="font-display mt-4 text-4xl leading-[1.08] text-navy sm:text-5xl" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-navy/70">
              At EdgeX Learning, we understand that students and parents ask different questions, but both need clear answers.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 inline-flex rounded-full bg-white p-1.5 shadow-sm">
              {(Object.keys(TABS) as (keyof typeof TABS)[]).map((k) => {
                const T = TABS[k];
                return (
                  <button key={k} onClick={() => setTab(k)} className="relative rounded-full px-6 py-2.5 text-sm font-bold">
                    {tab === k && <motion.span layoutId="approach-pill" className="absolute inset-0 rounded-full bg-navy" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <span className={`relative flex items-center gap-2 ${tab === k ? 'text-white' : 'text-navy/70'}`}><T.icon size={16} />{T.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-6 min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.ul key={tab} initial="h" animate="s" exit="h" variants={{ s: { transition: { staggerChildren: 0.1 } }, h: {} }} className="space-y-3">
                {TABS[tab].qs.map((q) => (
                  <motion.li
                    key={q}
                    variants={{ h: { opacity: 0, x: -24 }, s: { opacity: 1, x: 0 } }}
                    className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-navy shadow-sm"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <span className="font-medium">{q}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-navy"><b>EdgeX Learning</b> is designed to answer both sets of questions.</p>
          </Reveal>
        </div>

        <Reveal x={40} y={0}>
          <div className="relative">
            <div className="absolute -inset-3 rotate-2 rounded-[2.5rem] bg-gold/40" />
            <div className="relative overflow-hidden rounded-[2.2rem]">
              <ApproachArt />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
