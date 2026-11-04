'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FACULTY } from '@/lib/site';

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
          dragElastic={0.1}
          animate={{ x }}
          onDragEnd={(_, i) => setX(Math.min(0, Math.max(-limit, x + i.offset.x)))}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="flex cursor-grab gap-5 active:cursor-grabbing"
        >
          {FACULTY.map((f) => (
            <article key={f.name} className="group w-[15.5rem] shrink-0 overflow-hidden rounded-md border border-line bg-white hover:border-navy sm:w-64">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image src={f.img} alt={f.name} fill sizes="260px" draggable={false} className="select-none object-cover object-top" />
              </div>
              <div className="border-t-4 border-gold px-5 py-4">
                <h3 className="font-display text-lg leading-tight text-navy">{f.name}</h3>
                <p className="mt-1 text-sm text-navy/65">{f.role}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-navy/50">Drag or use the arrows</p>
        <div className="flex gap-2">
          <button onClick={() => step(-1)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded border border-line text-navy hover:bg-sand"><ChevronLeft size={18} /></button>
          <button onClick={() => step(1)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded bg-navy text-white hover:bg-navy-2"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}

export default function Faculty() {
  const founder = FACULTY[0];
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
        <div className="min-w-0 lg:col-span-5">
          <h2 className="font-display text-3xl text-navy sm:text-4xl">Our faculty</h2>
          <p className="mt-3 text-lg leading-relaxed text-navy/70">
            Founded by CA/CS Nihal Bhatt, EdgeX Learning brings together qualified educators and professionals who have spent years teaching and practising their subjects.
          </p>
          <Link href="/about/" className="mt-5 inline-flex items-center gap-2 font-bold text-navy hover:underline">
            About EdgeX Learning <ArrowRight size={18} className="text-gold" />
          </Link>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div className="flex h-full flex-col gap-5 rounded-md border border-line bg-sand p-5 sm:flex-row sm:items-center sm:gap-7 sm:p-6">
            <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden rounded bg-white sm:w-44">
              <Image src={founder.img} alt={founder.name} fill sizes="200px" className="object-cover object-top" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy/60">Founder</p>
              <h3 className="font-display mt-1 text-2xl text-navy sm:text-3xl">Nihal Bhatt</h3>
              <p className="mt-1 text-sm font-semibold text-navy/70">Chartered Accountant · Company Secretary</p>
              <p className="mt-3 leading-relaxed text-navy/70">
                EdgeX Learning was founded to bring qualified and experienced educators together under one focused academic institution.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="reveal mt-10">
        <FacultyCarousel />
      </div>
    </section>
  );
}
