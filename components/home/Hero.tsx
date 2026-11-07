'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ALUMNI_LOGOS } from '@/lib/logos';
import { useEnquiry } from '../EnquiryModal';
import Words from '../motion/Words';
import Magnetic from '../motion/Magnetic';
import MarqueeRow from '../motion/MarqueeRow';
import HeroBackdrop from './HeroBackdrop';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { open } = useEnquiry();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 60, damping: 18 });
  const my = useSpring(py, { stiffness: 60, damping: 18 });

  const move = (e: React.PointerEvent) => {
    if (!ref.current || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { px.set(0); py.set(0); };

  return (
    // fills the screen below the navbar (strip + bar is about 6.5rem)
    <header ref={ref} onPointerMove={move} onPointerLeave={leave} className="relative flex min-h-[calc(100svh-6.5rem)] flex-col overflow-hidden border-b border-line bg-gradient-to-b from-white via-white to-[#f6f8fd]">
      <HeroBackdrop mx={mx} my={my} />

      <div className="relative flex flex-1 items-center">
        <div className="mx-auto max-w-5xl px-6 py-10 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">
            <span aria-hidden className="mr-3 opacity-70">‹</span>Admissions open · Borivali &amp; Andheri<span aria-hidden className="ml-3 opacity-70">›</span>
          </motion.p>

          <Words as="h1" onLoad delay={0.15} text="Your road to CA, ACCA and CFA, | planned stage by stage." mark="planned" grad="stage by stage" className="mx-auto mt-5 max-w-5xl text-[2rem] font-extrabold leading-[1.15] tracking-[-0.035em] text-navy sm:text-5xl lg:text-[3.4rem]" />

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy/75">
            Specialist faculty, structured practice and doubt support, taught in person at two Mumbai centres.
            <br className="hidden sm:block" /> From your first lecture to your last paper.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05 }} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link href="#programmes" className="inline-block bg-navy px-8 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-white hover:bg-navy-2">View programmes</Link>
            </Magnetic>
            <Magnetic>
              <button onClick={() => open()} className="inline-block border border-navy bg-white px-8 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-navy hover:bg-navy hover:text-white">Request a callback</button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* where alumni work: logos drift sideways, faster while you scroll */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.3 }} className="relative pb-7 pt-2">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-navy/45">Our alumni work at</p>
        <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <MarqueeRow dir={-1} speed={1.1}>
            {ALUMNI_LOGOS.map((l) => (
              <span key={l.file} className="relative mx-6 block h-11 w-28 shrink-0 sm:mx-9 sm:h-12 sm:w-32">
                <Image src={`/img/logos/${l.file}`} alt={l.name} fill sizes="128px" className="object-contain opacity-70 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
              </span>
            ))}
          </MarqueeRow>
        </div>
      </motion.div>
    </header>
  );
}
