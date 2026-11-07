'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, GraduationCap, HeartHandshake } from 'lucide-react';
import { useEnquiry } from '../EnquiryModal';
import Words from '../motion/Words';
import Slide from '../motion/Slide';

const ease = [0.22, 1, 0.36, 1] as const;

const GROUPS = {
  Students: {
    Icon: GraduationCap,
    title: 'Students ask',
    items: [
      { q: 'Will difficult concepts become easier?', a: 'Yes. Specialist faculty explain each subject step by step, and regular practice makes it stick.' },
      { q: 'Will I know what to study next?', a: 'Yes. Every programme follows a clear route, with structured preparation and revision lectures.' },
      { q: 'Can I ask for help when I am stuck?', a: 'Yes. Doubt-solving sessions are part of every course.' },
    ],
  },
  Parents: {
    Icon: HeartHandshake,
    title: 'Parents ask',
    items: [
      { q: 'Is the faculty experienced?', a: 'Our educators are qualified CAs, company secretaries and professionals. Our senior-most professor has over 40 years of teaching experience.' },
      { q: 'Is there a clear academic structure?', a: 'Yes. Each programme has defined stages, study material, a practice question bank and revision lectures.' },
      { q: 'Will my child stay consistent?', a: 'Regular practice and doubt-solving sessions keep preparation on track, and our teachers stay available throughout.' },
    ],
  },
} as const;
type Who = keyof typeof GROUPS;

/** Pick who is asking and which question; the answer types back like a chat. */
export default function QA() {
  const [who, setWho] = useState<Who>('Students');
  const [i, setI] = useState(0);
  const [typing, setTyping] = useState(true);
  const { open } = useEnquiry();
  const g = GROUPS[who];
  const it = g.items[i];

  useEffect(() => {
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 850);
    return () => clearTimeout(t);
  }, [who, i]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Slide from="left">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">Questions</p>
        </Slide>
        <Words text="Questions we hear from students and parents" grad="students and parents" className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.03em] text-navy sm:text-5xl" />
        <p className="mt-3 max-w-xl text-lg text-navy/65">Students want direction. Parents want confidence. Pick a question to see how we answer.</p>

        <div className="mt-8 inline-flex rounded-md border border-line bg-white p-1">
          {(Object.keys(GROUPS) as Who[]).map((k) => {
            const on = k === who;
            const Icon = GROUPS[k].Icon;
            return (
              <button key={k} onClick={() => { setWho(k); setI(0); }} className="relative flex items-center gap-2 rounded px-5 py-2.5 text-sm font-bold">
                {on && <motion.span layoutId="qa-who" className="accent-grad absolute inset-0 rounded" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                <span className={`relative flex items-center gap-2 ${on ? 'text-white' : 'text-navy/70'}`}><Icon size={16} />{GROUPS[k].title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-12">
          {/* questions */}
          <Slide from="left" className="lg:col-span-5 lg:h-full">
            <div className="flex flex-col gap-1.5 lg:h-full">
              {g.items.map((x, n) => {
                const on = n === i;
                return (
                  <button
                    key={x.q}
                    onClick={() => setI(n)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setI(n)}
                    aria-pressed={on}
                    className="relative flex items-center overflow-hidden rounded-md border border-line bg-white px-4 py-4 text-left lg:flex-1"
                  >
                    {on && <motion.span layoutId="qa-row" className="absolute inset-0 border border-accent-line bg-accent-soft" style={{ borderRadius: 6 }} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                    {on && <motion.span layoutId="qa-bar" className="accent-grad absolute inset-y-0 left-0 w-1" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                    <span className="relative flex w-full items-center gap-4">
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded text-sm font-extrabold transition-colors duration-300 ${on ? 'accent-grad text-white' : 'bg-sand text-navy/60'}`}>{String(n + 1).padStart(2, '0')}</span>
                      <span className="text-[16px] font-bold leading-snug text-navy">{x.q}</span>
                      <ArrowUpRight size={17} className={`ml-auto hidden shrink-0 text-accent transition-all duration-300 sm:block ${on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </Slide>

          {/* the answer, as a chat */}
          <Slide from="right" className="lg:col-span-7">
            <div className="overflow-hidden rounded-md border border-line bg-[#f6f8fd]">
              <div className="flex items-center gap-3 border-b border-line bg-white px-5 py-3.5">
                <span className="accent-grad grid h-9 w-9 place-items-center rounded-full text-[11px] font-extrabold text-white">EL</span>
                <div>
                  <p className="text-sm font-extrabold text-navy">EdgeX educators</p>
                  <p className="flex items-center gap-1.5 text-xs text-navy/50"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Replying to {who.toLowerCase()}</p>
                </div>
              </div>

              <div className="min-h-[15rem] space-y-3 p-5 sm:p-7">
                <AnimatePresence mode="wait">
                  <motion.div key={`${who}-${i}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }} className="space-y-3">
                    <div className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-sm bg-navy px-4 py-3 text-[15px] font-medium leading-snug text-white">{it.q}</div>
                    <div className="relative min-h-[4.5rem]">
                      <AnimatePresence mode="wait" initial={false}>
                        {typing ? (
                          <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-fit gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-white px-4 py-3.5">
                            {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 rounded-full bg-navy/45" style={{ animation: `dot-bounce 1s ease-in-out ${d * 0.15}s infinite` }} />)}
                          </motion.div>
                        ) : (
                          <motion.p key="answer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="max-w-[92%] rounded-2xl rounded-bl-sm border border-accent-line bg-white px-4 py-3 text-[15px] leading-relaxed text-navy/80">{it.a}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-5 py-4">
                <p className="text-sm text-navy/55">Have a different question?</p>
                <button onClick={() => open()} className="bg-navy px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white hover:bg-navy-2">Ask an educator</button>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}
