'use client';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/site';
import { useEnquiry } from './EnquiryModal';
import Slide from './motion/Slide';
import Magnetic from './motion/Magnetic';

/** Closing call-to-action used at the bottom of inner pages. */
export default function CtaBand({ topGap = true }: { topGap?: boolean }) {
  const { open } = useEnquiry();
  return (
    <section className={`mx-auto max-w-6xl px-6 pb-14 sm:pb-20 ${topGap ? 'pt-6' : ''}`}>
      <Slide from="left">
        <div className="accent-grad relative overflow-hidden rounded-md px-7 py-10 text-white sm:px-12 sm:py-14">
          <span aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[26px] border-white/10" />
          <span aria-hidden className="pointer-events-none absolute -bottom-28 right-1/3 h-60 w-60 rounded-full border-[20px] border-white/[0.07]" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl">Not sure which course is right for you?</h2>
              <p className="mt-3 max-w-md text-white/80">Talk to one of our educators before you decide. It is free, and parents are welcome to join.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <button onClick={() => open()} className="inline-flex items-center gap-2 bg-white px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-navy hover:bg-accent-soft">
                  Book counselling <ArrowUpRight size={16} />
                </button>
              </Magnetic>
              <Magnetic>
                <a href={WA_LINK()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/50 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] hover:bg-white/10">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Slide>
    </section>
  );
}
