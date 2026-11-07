'use client';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Counter } from '../Reveal';
import Slide from '../motion/Slide';
import Tilt from '../motion/Tilt';

const view = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

/** 40+ years: a bar that fills along a timeline marked every ten years. */
function Years() {
  return (
    <div>
      <div className="relative h-2 rounded-full bg-accent-soft">
        <motion.span initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={view} transition={{ duration: 1.8, delay: 0.3, ease }} className="absolute inset-y-0 left-0 rounded-full accent-grad" />
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-semibold text-navy/40"><span>Day one</span><span>10</span><span>20</span><span>30</span><span>40+</span></div>
    </div>
  );
}

/** 8 faculty: eight dots that light up one after another. */
function Faculty() {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span key={i} initial={{ scale: 0.4, backgroundColor: '#efe9f8' }} whileInView={{ scale: 1, backgroundColor: i === 0 ? '#0d1840' : '#4b2f8f' }} viewport={view} transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 260, damping: 14 }} className="h-5 w-5 rounded-full" />
      ))}
    </div>
  );
}

/** 2 centres: two pins that drop in. */
function Centres() {
  return (
    <div className="flex gap-3">
      {['Borivali', 'Andheri'].map((c, i) => (
        <motion.span key={c} initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ delay: 0.35 + i * 0.25, type: 'spring', stiffness: 220, damping: 12 }} className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">
          <MapPin size={13} /> {c}
        </motion.span>
      ))}
    </div>
  );
}

/** 4 programmes: four chips that fill in sequence. */
function Programmes() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {['CA', 'ACCA', 'CFA', '11th–12th'].map((p, i) => (
        <motion.span key={p} initial={{ opacity: 0.3, backgroundColor: '#ffffff', color: '#0d1840' }} whileInView={{ opacity: 1, backgroundColor: '#0d1840', color: '#ffffff' }} viewport={view} transition={{ delay: 0.4 + i * 0.2, duration: 0.4 }} className="rounded border border-navy px-2.5 py-1 text-xs font-bold">{p}</motion.span>
      ))}
    </div>
  );
}

const STATS = [
  { n: 40, s: '+', l: 'years of teaching experience', note: 'Our senior-most professor alone', visual: <Years /> },
  { n: 8, s: '', l: 'specialist faculty', note: 'One educator for each subject', visual: <Faculty /> },
  { n: 2, s: '', l: 'centres across Mumbai', note: 'Classes in person', visual: <Centres /> },
  { n: 4, s: '', l: 'programmes under one roof', note: 'School to professional', visual: <Programmes /> },
];

export default function StatsBand() {
  return (
    <section className="border-b border-line bg-[#f6f8fd]">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Slide from="left">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">EdgeX in numbers</p>
        </Slide>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Slide key={s.l} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.07} className="h-full">
              <Tilt className="h-full" max={5}>
                <div className="flex h-full flex-col justify-between rounded-md border border-line bg-white p-6">
                  <div>
                    <p className="accent-grad bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl">
                      <Counter to={s.n} suffix={s.s} />
                    </p>
                    <p className="mt-2 text-[17px] font-bold leading-snug text-navy">{s.l}</p>
                    <p className="mt-1 text-sm text-navy/55">{s.note}</p>
                  </div>
                  <div className="mt-7 border-t border-line pt-5">{s.visual}</div>
                </div>
              </Tilt>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
}
