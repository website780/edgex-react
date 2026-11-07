'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { CENTRES } from '@/lib/site';

const MESSAGES = [
  'Admissions open for CA, ACCA, CFA and 11th–12th Commerce',
  'Call us to confirm batch dates and timings',
];

/** Slim bar above the navbar: a rotating admissions message on the left, both centres' phone numbers on the right. */
export default function TopBar() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 4500);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="hidden bg-navy text-[13px] text-white sm:block">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-6 px-6">
        <p className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="relative block h-5 min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={i}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 truncate font-semibold leading-5"
              >
                {MESSAGES[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </p>

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          {CENTRES.map((c) => (
            <a key={c.name} href={`tel:${c.tel}`} className="group inline-flex items-center gap-1.5 font-medium text-white hover:underline hover:underline-offset-4">
              <Phone size={13} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
              <span className="text-white/65">{c.name}</span>
              <span className="font-bold">{c.phone}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
