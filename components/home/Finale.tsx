'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CENTRES, WA_LINK } from '@/lib/site';
import { useEnquiry } from '../EnquiryModal';
import Words from '../motion/Words';
import Slide from '../motion/Slide';
import Magnetic from '../motion/Magnetic';

const ease = [0.22, 1, 0.36, 1] as const;
const maps = (c: (typeof CENTRES)[number]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`EdgeX Learning, ${c.address.join(', ')}`)}`;

/** Closing call to action: callback and WhatsApp on the left, both centres on the right. */
export default function Finale() {
  const { open } = useEnquiry();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Slide from="left">
          <div className="accent-grad relative overflow-hidden rounded-md p-7 text-white sm:p-12">
            <span aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[28px] border-white/10" />
            <span aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full border-[22px] border-white/[0.07]" />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/70">Free counselling</p>
                <Words text="Not sure which course is right for you?" className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl" />
                <p className="mt-4 max-w-md text-lg text-white/80">Talk to one of our educators before you decide.</p>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {['It is free', 'Parents are welcome to join'].map((t, i) => (
                    <motion.li key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-sm font-semibold">
                      <Check size={14} strokeWidth={3} /> {t}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <button onClick={() => open()} className="inline-flex items-center gap-2 bg-white px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-navy hover:bg-accent-soft">
                      Request a callback <ArrowUpRight size={16} />
                    </button>
                  </Magnetic>
                  <Magnetic>
                    <a href={WA_LINK()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/50 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] hover:bg-white/10">
                      <MessageCircle size={16} /> WhatsApp us
                    </a>
                  </Magnetic>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
                {CENTRES.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: 70 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col rounded-md bg-white p-6 text-navy shadow-[0_18px_40px_-24px_rgba(8,14,42,.7)]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">Centre</p>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                      </span>
                    </div>
                    <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{c.name}</h3>
                    <p className="mt-3 flex flex-1 gap-2 text-[14px] leading-relaxed text-navy/65"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" />{c.address.join(', ')}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line pt-4">
                      <a href={`tel:${c.tel}`} className="inline-flex items-center gap-2 whitespace-nowrap text-[15px] font-bold hover:text-accent"><Phone size={15} className="text-accent" />{c.phone}</a>
                      <a href={maps(c)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:underline">Directions <ArrowUpRight size={14} /></a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
}
