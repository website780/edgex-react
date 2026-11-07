'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { BookOpen, Check, FileQuestion, MessagesSquare, Repeat } from 'lucide-react';
import Words from '../motion/Words';
import Slide from '../motion/Slide';

const ease = [0.22, 1, 0.36, 1] as const;

/** Runs `fn` every `ms` only while the element is on screen. */
function useTick(ref: React.RefObject<Element | null>, ms: number, count: number) {
  const inView = useInView(ref, { margin: '-10% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setN((v) => (v + 1) % count), ms);
    return () => clearInterval(t);
  }, [inView, ms, count]);
  return n;
}

/** Learn: lines of notes fill in one after another. */
function LearnArt() {
  const w = ['92%', '68%', '82%', '54%'];
  return (
    <div className="space-y-2.5">
      {w.map((x, i) => (
        <div key={i} className="h-2 rounded-full bg-accent-soft">
          <motion.span initial={{ width: 0 }} animate={{ width: [0, x, x, 0] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.35, 0.85, 1], delay: i * 0.35, ease: 'easeInOut' }} className={`block h-full rounded-full ${i === 1 ? 'accent-grad' : 'bg-navy/25'}`} />
        </div>
      ))}
    </div>
  );
}

/** Practise: a question with options; the pick moves around until the right one lights up. */
function PractiseArt() {
  const ref = useRef<HTMLDivElement>(null);
  const n = useTick(ref, 900, 5); // 0..3 trying options, 4 = right answer shown
  const right = 1;
  const picked = n === 4 ? right : n % 4;
  return (
    <div ref={ref} className="grid grid-cols-2 gap-2">
      {['A', 'B', 'C', 'D'].map((o, i) => {
        const on = picked === i;
        const ok = n === 4 && i === right;
        return (
          <span key={o} className={`flex items-center justify-between rounded border px-2.5 py-2 text-xs font-bold transition-colors duration-300 ${ok ? 'border-accent bg-accent text-white' : on ? 'border-accent-line bg-accent-soft text-accent' : 'border-line bg-white text-navy/55'}`}>
            {o}
            {ok && <Check size={13} strokeWidth={3} />}
          </span>
        );
      })}
    </div>
  );
}

/** Ask: a doubt, typing dots, then the answer. */
function AskArt() {
  const ref = useRef<HTMLDivElement>(null);
  const n = useTick(ref, 1100, 5); // 0 idle, 1 doubt, 2 typing, 3 answer, 4 hold
  const show = (on: boolean) => ({ opacity: on ? 1 : 0, y: on ? 0 : 8, transition: 'opacity .4s, transform .4s' });
  return (
    <div ref={ref} className="space-y-2 text-[12px]">
      <p className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-navy px-3 py-2 font-medium text-white" style={show(n >= 1)}>Why is this a prepaid expense?</p>
      <div className="relative h-9">
        <p className="absolute left-0 top-0 w-fit max-w-[88%] rounded-lg rounded-bl-sm border border-accent-line bg-accent-soft px-3 py-2 font-medium text-accent" style={show(n >= 3)}>The benefit comes next year.</p>
        <span className="absolute left-0 top-0 flex gap-1 rounded-lg rounded-bl-sm border border-line bg-white px-3 py-3" style={{ ...show(n === 2) }}>
          {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 rounded-full bg-navy/50" style={{ animation: `dot-bounce 1s ease-in-out ${d * 0.15}s infinite` }} />)}
        </span>
      </div>
    </div>
  );
}

/** Revise: a ring that fills again and again, like a lap. */
function ReviseArt() {
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 48 48" className="h-16 w-16 -rotate-90">
        <circle cx="24" cy="24" r="19" fill="none" stroke="#efe9f8" strokeWidth="5" />
        <motion.circle cx="24" cy="24" r="19" fill="none" stroke="#4b2f8f" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.6, 0.9, 1], ease: 'easeInOut' }} />
      </svg>
      <div className="space-y-1.5 text-[11px] font-semibold text-navy/60">
        {['Concept recap', 'Question sets', 'Pre-exam lecture'].map((t, i) => (
          <motion.p key={t} animate={{ opacity: [0.35, 1, 1, 0.35] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.9, times: [0, 0.2, 0.7, 1] }} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{t}</motion.p>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  { Icon: BookOpen, t: 'Learn', d: 'Specialist faculty explain each subject step by step, so concepts are understood, not memorised.', art: <LearnArt /> },
  { Icon: FileQuestion, t: 'Practise', d: 'A topic-wise question bank and regular tests, set the way papers are actually asked.', art: <PractiseArt /> },
  { Icon: MessagesSquare, t: 'Ask', d: 'Doubt-solving sessions are part of every course. Stuck on an idea? Get it cleared the same week.', art: <AskArt /> },
  { Icon: Repeat, t: 'Revise', d: 'Detailed revision lectures before every attempt, so the last weeks are calm and focused.', art: <ReviseArt /> },
];

function Node({ i, p }: { i: number; p: MotionValue<number> }) {
  const a = i / (STEPS.length - 1);
  const fill = useTransform(p, [a - 0.14, a], [0, 1]);
  return (
    <div className="relative z-10 h-11 w-11">
      <span className="absolute inset-0 grid place-items-center rounded-full border-2 border-accent-line bg-white text-sm font-extrabold text-navy/50">{i + 1}</span>
      <motion.span style={{ opacity: fill, scale: fill }} className="accent-grad absolute inset-0 grid place-items-center rounded-full text-sm font-extrabold text-white">{i + 1}</motion.span>
    </div>
  );
}

export default function Method() {
  const sec = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: row, offset: ['start 0.75', 'end 0.55'] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sec} className="overflow-hidden border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Slide from="left">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">How we teach</p>
        </Slide>
        <Words text="Four steps, every subject." grad="every subject" className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.03em] text-navy sm:text-5xl" />
        <p className="mt-3 max-w-xl text-lg text-navy/65">The same simple loop in every programme, from 11th Commerce to CA Final.</p>

        <div ref={row} className="relative mt-12">
          {/* the line that joins the four steps and fills as you scroll */}
          <div aria-hidden className="absolute left-[11%] right-[11%] top-[21px] hidden h-[2px] bg-accent-soft lg:block" />
          <motion.div aria-hidden style={{ scaleX: line }} className="accent-grad absolute left-[11%] right-[11%] top-[21px] hidden h-[2px] origin-left lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div key={s.t} initial={{ opacity: 0, x: i < 2 ? -70 : 70 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay: (i % 2) * 0.08, ease }} className="flex flex-col lg:items-stretch">
                <div className="mb-4 flex items-center gap-3 lg:justify-center">
                  <Node i={i} p={scrollYProgress} />
                  <s.Icon size={20} className="text-accent lg:hidden" />
                </div>
                <div className="flex flex-1 flex-col rounded-md border border-line bg-[#f6f8fd] p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-extrabold tracking-tight text-navy">{s.t}</h3>
                    <s.Icon size={18} className="hidden text-accent lg:block" />
                  </div>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy/65">{s.d}</p>
                  <div className="mt-6 rounded border border-line bg-white p-4">{s.art}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
