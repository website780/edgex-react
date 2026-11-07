'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { COURSES } from '@/lib/site';
import { useEnquiry } from '../EnquiryModal';
import Words from '../motion/Words';
import Slide from '../motion/Slide';

const ease = [0.22, 1, 0.36, 1] as const;

/** Pick a programme on the left (hover or tap); its photo and animated stage timeline show on the right. */
export default function Programmes() {
  const [i, setI] = useState(1);
  const { open } = useEnquiry();
  const c = COURSES[i];

  return (
    <section id="programmes" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Slide from="left">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">Programmes</p>
        </Slide>
        <Words text="Pick the road you are on." grad="the road you are on" className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.03em] text-navy sm:text-5xl" />
        <p className="mt-3 max-w-xl text-lg text-navy/65">Four programmes, one way of teaching. Choose one to see how the road ahead looks.</p>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* list */}
          <Slide from="left" className="lg:col-span-5">
            <div role="tablist" aria-label="Programmes" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
              {COURSES.map((x, n) => {
                const on = n === i;
                return (
                  <button
                    key={x.slug}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setI(n)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setI(n)}
                    className="relative shrink-0 overflow-hidden rounded-md border border-line bg-white px-4 py-4 text-left lg:w-full"
                  >
                    {on && <motion.span layoutId="prog-active" className="absolute inset-0 border border-accent-line bg-accent-soft" style={{ borderRadius: 6 }} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                    {on && <motion.span layoutId="prog-bar" className="accent-grad absolute inset-y-0 left-0 w-1" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                    <span className="relative flex items-center gap-4">
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded text-sm font-extrabold transition-colors duration-300 ${on ? 'accent-grad text-white' : 'bg-sand text-navy/60'}`}>{x.no}</span>
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-[17px] font-extrabold tracking-tight text-navy lg:whitespace-normal">{x.short}</span>
                        <span className="mt-0.5 hidden text-[13px] text-navy/55 lg:block">{x.tag}</span>
                      </span>
                      <ArrowUpRight size={18} className={`ml-auto hidden shrink-0 text-accent transition-all duration-300 lg:block ${on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </Slide>

          {/* detail */}
          <Slide from="right" className="lg:col-span-7">
            <div className="overflow-hidden rounded-md border border-line bg-white">
              <AnimatePresence mode="wait">
                <motion.div key={c.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease }}>
                  <Link href={c.href} data-cursor="view" className="group relative block aspect-[16/7] overflow-hidden bg-sand">
                    <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.3, ease }} className="absolute inset-0">
                      <Image src={c.photo} alt={c.short} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </motion.div>
                    <span className="absolute left-4 top-4 rounded bg-white/95 px-3 py-1.5 text-xs font-bold text-accent">{c.tag}</span>
                  </Link>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{c.short}</h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-navy/70">{c.hook} {c.cardBlurb}</p>

                    <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.2em] text-navy/45">Your path</p>
                    <div className="relative mt-5">
                      <div aria-hidden className="absolute left-[12%] right-[12%] top-[13px] hidden h-[2px] bg-accent-soft sm:block" />
                      <motion.div aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.3, delay: 0.2, ease }} className="accent-grad absolute left-[12%] right-[12%] top-[13px] hidden h-[2px] origin-left sm:block" />
                      <ol className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                        {c.stages.map((s, n) => (
                          <motion.li key={s.t} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + n * 0.16, duration: 0.5, ease }} className="sm:text-center">
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25 + n * 0.16, type: 'spring', stiffness: 300, damping: 16 }} className={`relative z-10 grid h-7 w-7 place-items-center rounded-full text-xs font-extrabold sm:mx-auto ${n === c.stages.length - 1 ? 'bg-navy text-white' : 'accent-grad text-white'}`}>{n + 1}</motion.span>
                            <span className="mt-2 block text-[14px] font-bold leading-tight text-navy">{s.t}</span>
                            <span className="mt-1 hidden text-[12px] leading-snug text-navy/55 md:block">{s.d}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button onClick={() => open(c.short)} className="bg-navy px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-white hover:bg-navy-2">Enquire now</button>
                      <Link href={c.href} className="inline-flex items-center gap-1.5 border border-navy bg-white px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-navy hover:bg-navy hover:text-white">
                        Full details <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}
