'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FACULTY } from '@/lib/site';
import { Reveal, SplitWords } from '../Reveal';

export function FacultyCarousel() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const [x, setX] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (wrap.current && track.current) setLimit(Math.max(0, track.current.scrollWidth - wrap.current.offsetWidth));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const step = (d: number) => setX((v) => Math.min(0, Math.max(-limit, v - d * 300)));

  return (
    <div>
      <div ref={wrap} className="overflow-hidden">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.12}
          animate={{ x }}
          onDragEnd={(_, i) => setX(Math.min(0, Math.max(-limit, x + i.offset.x)))}
          transition={{ type: 'spring', stiffness: 160, damping: 26 }}
          className="flex cursor-grab gap-5 active:cursor-grabbing"
        >
          {FACULTY.map((f, i) => (
            <motion.article
              key={f.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              className="group relative w-[15.5rem] shrink-0 overflow-hidden rounded-[1.75rem] border border-navy/10 bg-navy transition-colors duration-500 hover:border-gold sm:w-64"
            >
              {/* photo stays put on hover so the head is never cropped */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-sand to-white">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gold/25 to-transparent" />
                <Image src={f.img} alt={f.name} fill sizes="260px" draggable={false} className="select-none object-cover object-top" />
                <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-[11px] font-bold tracking-widest text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">{f.creds}</span>
              </div>
              <div className="relative px-5 pb-6 pt-5">
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[.18] bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <h3 className="font-display text-xl leading-tight text-white">{f.name}</h3>
                <p className="mt-1.5 text-sm text-gold-soft/90">{f.role}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy/40">Drag or use arrows</p>
        <div className="flex gap-2">
          <button onClick={() => step(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-navy/20 text-navy transition hover:bg-navy hover:text-white"><ChevronLeft size={18} /></button>
          <button onClick={() => step(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white transition hover:bg-gold hover:text-ink"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}

export default function Faculty() {
  const founder = FACULTY[0];
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-plum">Our faculty</p></Reveal>
          <SplitWords as="h2" text="An experienced team behind every learning journey." gold={[1]} className="font-display mt-4 text-4xl leading-[1.08] text-navy sm:text-5xl" />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-navy/70">
              Founded by CA/CS Nihal Bhatt, EdgeX Learning brings together qualified educators and professionals who have spent years teaching and practising their subjects.
            </p>
            <Link href="/about/" className="group mt-8 inline-flex items-center gap-2 font-bold text-navy">
              <span className="border-b-2 border-gold pb-0.5">Our story</span>
              <ArrowRight size={18} className="text-gold transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal x={30} y={0} className="min-w-0 lg:col-span-7 lg:h-full">
          <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[2rem] bg-navy p-6 text-white sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
            <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-2xl sm:w-48">
              <Image src={founder.img} alt={founder.name} fill sizes="200px" className="object-cover object-top" />
            </div>
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[.25em] text-gold">Founder</p>
              <h3 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">Nihal Bhatt</h3>
              <ul className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                <li className="rounded-full bg-white/10 px-3 py-1">Chartered Accountant</li>
                <li className="rounded-full bg-white/10 px-3 py-1">Company Secretary</li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                EdgeX Learning was founded to bring qualified and experienced educators together under one focused academic institution.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-10">
        <FacultyCarousel />
      </div>
    </section>
  );
}
