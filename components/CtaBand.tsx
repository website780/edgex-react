import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaBand({ topGap = false }: { topGap?: boolean }) {
  return (
    <section className={`mx-auto max-w-6xl px-6 pb-12 sm:pb-16 ${topGap ? 'pt-12 sm:pt-16' : 'pt-0'}`}>
      <div className="flex flex-col gap-5 rounded-md bg-navy px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">Not sure which course is right for you?</h2>
          <p className="mt-1.5 text-white/70">Talk to one of our educators before you decide. It is free.</p>
        </div>
        <Link href="/contact/" className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-gold px-6 py-3.5 font-bold text-ink hover:bg-[#c29720]">
          Book counselling <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
