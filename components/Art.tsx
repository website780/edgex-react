'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Compass, Flag, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react';
import type { Course } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Hero illustration: a staircase of four pathways with a graduation cap climbing it. */
export function HeroArt() {
  const steps = [
    { label: 'Commerce', sub: '11th · 12th', h: 120, fill: 'url(#stepA)' },
    { label: 'CA', sub: 'Found. → Final', h: 190, fill: 'url(#stepB)' },
    { label: 'ACCA', sub: 'Global', h: 260, fill: 'url(#stepC)' },
    { label: 'CFA', sub: 'Level 1 – 3', h: 330, fill: 'url(#stepD)' },
  ];
  const W = 92;
  const GAP = 10;
  const BASE = 420;
  return (
    <svg viewBox="0 -12 420 482" className="relative overflow-visible mx-auto h-auto w-full max-w-[26rem]" role="img" aria-label="Four pathways rising like steps: Commerce, CA, ACCA and CFA">
      <defs>
        <linearGradient id="stepA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".28" /><stop offset="1" stopColor="#ffffff" stopOpacity=".06" /></linearGradient>
        <linearGradient id="stepB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a62b8" /><stop offset="1" stopColor="#4b2e6f" /></linearGradient>
        <linearGradient id="stepC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f1cf6a" /><stop offset="1" stopColor="#d4a62a" /></linearGradient>
        <linearGradient id="stepD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbf8f1" /><stop offset="1" stopColor="#e9dfc4" /></linearGradient>
        <radialGradient id="halo" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#d4a62a" stopOpacity=".55" /><stop offset="1" stopColor="#d4a62a" stopOpacity="0" /></radialGradient>
      </defs>

      <motion.circle cx="364" cy="40" r="130" fill="url(#halo)" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1.4 }} />

      {/* dotted climbing path */}
      <motion.path
        d="M30 440 C 110 330, 160 360, 195 270 S 300 200, 364 100"
        fill="none" stroke="#d4a62a" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 2, ease: 'easeInOut' }}
      />

      {steps.map((s, i) => {
        const x = 12 + i * (W + GAP);
        return (
          <g key={s.label}>
            <motion.rect
              x={x} width={W} rx="18" fill={s.fill}
              stroke={i === 0 ? 'rgba(255,255,255,.35)' : 'none'}
              initial={{ y: BASE, height: 0 }} animate={{ y: BASE - s.h, height: s.h }}
              transition={{ delay: 0.5 + i * 0.18, duration: 1.1, ease: EASE }}
            />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.18 }}>
              <text x={x + W / 2} y={BASE - s.h + 38} textAnchor="middle" fontSize={s.label.length > 4 ? 15 : 20} fontWeight="700" fill={i === 1 ? '#fff' : i === 0 ? '#fff' : '#0a1030'} fontFamily="var(--font-display), serif">{s.label}</text>
              <text x={x + W / 2} y={BASE - s.h + 58} textAnchor="middle" fontSize="10.5" fontWeight="600" fill={i < 2 ? 'rgba(255,255,255,.7)' : 'rgba(10,16,48,.6)'}>{s.sub}</text>
              <text x={x + W / 2} y={BASE - 18} textAnchor="middle" fontSize="30" fontWeight="500" fill={i < 2 ? 'rgba(255,255,255,.22)' : 'rgba(10,16,48,.16)'} fontFamily="var(--font-display), serif">0{i + 1}</text>
            </motion.g>
          </g>
        );
      })}

      <rect x="0" y={BASE} width="420" height="3" rx="1.5" fill="rgba(255,255,255,.25)" />

      {/* graduation cap sitting on the top step */}
      <motion.g initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2, duration: 1, ease: EASE }}>
        <g className="floaty">
          <g transform="translate(312 -4)">
            <path d="M52 8 L104 32 L52 56 L0 32 Z" fill="#0d1840" stroke="#d4a62a" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M22 44 V70 C22 84 82 84 82 70 V44 L52 58 Z" fill="#1b2a6b" stroke="#d4a62a" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M96 36 V64" stroke="#d4a62a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="96" cy="68" r="5" fill="#d4a62a" />
          </g>
        </g>
      </motion.g>
      {/* sparkles */}
      {[[40, 90, 1], [380, 200, 1.4], [150, 160, 0.8]].map(([cx, cy, sc], k) => (
        <motion.path
          key={k} d="M0 -9 L2.4 -2.4 L9 0 L2.4 2.4 L0 9 L-2.4 2.4 L-9 0 L-2.4 -2.4 Z" fill="#d4a62a"
          transform={`translate(${cx} ${cy}) scale(${sc})`}
          animate={{ opacity: [0.2, 1, 0.2], rotate: [0, 90, 0] }} transition={{ duration: 3.2, repeat: Infinity, delay: k * 0.8 }}
        />
      ))}
    </svg>
  );
}

/** Approach illustration: a student path and a parent path meeting at one team. */
export function ApproachArt() {
  return (
    <div className="relative aspect-[4/5] w-full sm:aspect-[623/570] overflow-hidden bg-gradient-to-br from-navy-2 via-navy to-ink">
      <Image src="/img/stock/students.jpg" alt="Students studying together" fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-ink/90" />
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-plum/60 blur-3xl" />
      <div className="absolute inset-0 opacity-[.12] [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1.5px)] [background-size:22px_22px]" />

      <svg viewBox="0 0 623 570" className="absolute inset-0 hidden h-full w-full sm:block" aria-hidden>
        <motion.path d="M110 150 C 230 150, 250 260, 311 285" fill="none" stroke="#d4a62a" strokeWidth="3" strokeDasharray="3 10" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3 }} />
        <motion.path d="M513 150 C 393 150, 373 260, 311 285" fill="none" stroke="#d4a62a" strokeWidth="3" strokeDasharray="3 10" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.5 }} />
        <circle cx="311" cy="285" r="64" fill="none" stroke="rgba(212,166,42,.35)" strokeWidth="1.5" />
        <circle cx="311" cy="285" r="92" fill="none" stroke="rgba(212,166,42,.18)" strokeWidth="1.5" />
      </svg>

      <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="absolute left-[6%] top-[7%] flex sm:left-[7%] sm:top-[16%] items-center gap-3 rounded-2xl bg-ivory px-4 py-3 text-navy shadow-xl">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold"><Compass size={22} /></span>
        <span className="text-sm leading-tight"><b className="block">Students</b><span className="text-navy/60">need direction</span></span>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }} className="absolute right-[6%] top-[25%] flex sm:right-[7%] sm:top-[16%] items-center gap-3 rounded-2xl bg-ivory px-4 py-3 text-navy shadow-xl">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-ink"><ShieldCheck size={22} /></span>
        <span className="text-sm leading-tight"><b className="block">Parents</b><span className="text-navy/60">need confidence</span></span>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.9, ease: EASE }} className="absolute left-1/2 top-[57%] grid sm:top-[50%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-ink shadow-[0_0_60px_rgba(212,166,42,.55)]">
        <span className="text-center leading-none"><Users size={28} className="mx-auto" /><span className="font-display mt-1 block text-lg font-semibold">EdgeX</span></span>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-20 text-white">
        <p className="font-display text-2xl">One experienced team</p>
        <p className="text-sm text-white/75">Clear direction for students. Confidence for parents.</p>
      </div>
    </div>
  );
}

/** Course roadmap: vertical journey with a path that draws itself. */
export function RoadmapArt({ c }: { c: Course }) {
  const last = c.stages.length - 1;
  return (
    <div className="grain relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-2 via-navy to-ink p-7 text-white sm:p-9">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-plum/60 blur-3xl" />
      <p className="relative text-xs font-bold uppercase tracking-[.3em] text-gold">Your route · {c.short}</p>
      <ol className="relative mt-7">
        <motion.span
          aria-hidden className="absolute left-[1.35rem] top-5 w-px origin-top bg-gradient-to-b from-gold via-gold/60 to-gold/10"
          style={{ bottom: '2.25rem' }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        {c.stages.map((s, i) => (
          <motion.li
            key={s.t} className="relative flex gap-5 pb-7 last:pb-0"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.18, duration: 0.7, ease: EASE }}
          >
            <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold ${i === last ? 'bg-gold text-ink shadow-[0_0_30px_rgba(212,166,42,.6)]' : 'border border-gold/60 bg-navy text-gold'}`}>
              {i === last ? <Trophy size={19} /> : i === 0 ? <Flag size={17} /> : i + 1}
            </span>
            <div className="pt-1">
              <h3 className="font-display text-2xl leading-tight">{s.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/65">{s.d}</p>
            </div>
          </motion.li>
        ))}
      </ol>
      <Sparkles size={18} className="absolute right-6 top-6 text-gold/70" />
    </div>
  );
}

/** Round initials avatar used instead of stock portraits. */
export function Initials({ name, className = '' }: { name: string; className?: string }) {
  const letters = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <span aria-hidden className={`grid place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft font-display font-semibold text-ink ring-2 ring-gold/40 ring-offset-2 ring-offset-navy ${className}`}>
      {letters}
    </span>
  );
}
