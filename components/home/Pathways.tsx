'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { COURSES } from '@/lib/site';
import { Reveal, SplitWords } from '../Reveal';

function Card({ c, i }: { c: (typeof COURSES)[number]; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(212,166,42,.22), transparent 60%)`;
  return (
    <Reveal delay={i * 0.1}>
      <Link
        href={c.href}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
        className="group relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-navy p-7 text-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(13,24,64,.6)]"
      >
        <Image src={c.photo} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-navy/80 to-navy/40" />
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold/20 transition duration-700 group-hover:scale-125" />
        <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full border border-gold/30 transition duration-700 group-hover:scale-150" />
        <motion.div style={{ background: bg }} className="absolute inset-0 opacity-0 transition group-hover:opacity-100" />

        <div className="relative flex items-start justify-between">
          <span className="font-display text-5xl text-gold/90">{c.no}</span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/70">{c.tag}</span>
        </div>
        <div className="relative">
          <h3 className="font-display text-3xl leading-tight">{c.short}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{c.cardBlurb}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold">
            Explore programme
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-ink transition group-hover:rotate-45"><ArrowUpRight size={16} /></span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Pathways() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-plum">Programmes</p></Reveal>
      <SplitWords as="h2" text="Four pathways. One experienced team." gold={[1]} className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] text-navy sm:text-6xl" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {COURSES.map((c, i) => <Card key={c.slug} c={c} i={i} />)}
      </div>
    </section>
  );
}
