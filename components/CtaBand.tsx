import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SplitWords } from './Reveal';

export default function CtaBand({ topGap = false }: { topGap?: boolean }) {
  return (
    <section className={`mx-auto max-w-6xl px-6 pb-12 sm:pb-16 ${topGap ? 'pt-12 sm:pt-16' : 'pt-0'}`}>
      <div className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-navy px-8 py-12 text-center text-white sm:px-16 sm:py-16">
        <Image src="/img/stock/library.jpg" alt="" fill sizes="1152px" className="-z-10 object-cover opacity-25" />
        <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-gold/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-96 w-96 rounded-full bg-plum/50 blur-3xl" />
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[.3em] text-gold">Not sure where to start?</p>
        </Reveal>
        <SplitWords as="h2" text="Speak to an educator before you decide." gold={[4, 5]} className="font-display mx-auto mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-6xl" />
        <Reveal delay={0.3}>
          <Link
            href="/contact/"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-bold text-ink transition hover:bg-gold-soft"
          >
            Book counselling
            <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
