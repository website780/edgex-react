'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FACULTY } from '@/lib/site';
import { useEnquiry } from '../EnquiryModal';
import Words from '../motion/Words';
import Slide from '../motion/Slide';

const ease = [0.22, 1, 0.36, 1] as const;
type Person = (typeof FACULTY)[number];

const isSubject = (p: Person) => !/^Faculty|^Founder/i.test(p.role);
const about = (p: Person) =>
  'featured' in p && p.featured
    ? 'Founded EdgeX Learning to bring qualified and experienced educators together under one focused academic institution.'
    : isSubject(p)
      ? `Specialist faculty for ${p.role} at EdgeX Learning.`
      : 'One of the qualified educators who teach at EdgeX Learning.';

/** Pick a teacher on the right (hover or tap); the spotlight on the left shows them. */
export default function FacultyTeam({ showAbout = true }: { showAbout?: boolean }) {
  const [i, setI] = useState(0);
  const { open } = useEnquiry();
  const p = FACULTY[i];

  return (
    <section className="border-b border-line bg-[#f6f8fd]">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Slide from="left">
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">Faculty</p>
            </Slide>
            <Words text="Learn from people who teach it for a living." grad="teach it for a living" className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.03em] text-navy sm:text-5xl" />
          </div>
          {showAbout && <Slide from="right">
            <Link href="/about/" className="inline-flex items-center gap-2 font-bold text-navy hover:underline">About EdgeX <ArrowRight size={17} className="text-accent" /></Link>
          </Slide>}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* spotlight */}
          <Slide from="left" className="lg:col-span-5">
            <div className="overflow-hidden rounded-md border border-line bg-white lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease }}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.1, ease }} className="absolute inset-0">
                      <Image src={p.img} alt={p.name} fill priority sizes="(min-width:1024px) 480px, 100vw" className="object-cover object-top" />
                    </motion.div>
                    <span className="absolute left-4 top-4 rounded bg-white/95 px-3 py-1.5 text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')} / {String(FACULTY.length).padStart(2, '0')}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">{p.role}</p>
                    <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{p.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.creds.split(' · ').map((c) => <span key={c} className="rounded border border-accent-line bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent">{c}</span>)}
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-navy/70">{about(p)}</p>
                    <button onClick={() => open()} className="mt-6 bg-navy px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-white hover:bg-navy-2">Enquire about classes</button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Slide>

          {/* team */}
          <Slide from="right" className="lg:col-span-7 lg:h-full">
            <div role="tablist" aria-label="Faculty" className="grid gap-2 sm:grid-cols-2 lg:h-full lg:grid-rows-4">
              {FACULTY.map((f, n) => {
                const on = n === i;
                return (
                  <button
                    key={f.name}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setI(n)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setI(n)}
                    className="relative flex h-full items-center overflow-hidden rounded-md border border-line bg-white p-3 text-left lg:p-4"
                  >
                    {on && <motion.span layoutId="fac-active" className="absolute inset-0 border border-accent-line bg-accent-soft" style={{ borderRadius: 6 }} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                    {on && <motion.span layoutId="fac-bar" className="accent-grad absolute inset-y-0 left-0 w-1" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                    <span className="relative flex w-full items-center gap-4">
                      <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-sand lg:h-24 lg:w-[4.75rem]">
                        <Image src={f.img} alt="" fill sizes="80px" className="object-cover object-top" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[16px] font-extrabold leading-tight tracking-tight text-navy">{f.name}</span>
                        <span className="mt-1 block text-[13px] leading-snug text-navy/55">{f.role}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}
