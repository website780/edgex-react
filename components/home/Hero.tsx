import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Counter } from '../Reveal';

const POINTS = ['Experienced, qualified faculty', 'Structured preparation and regular practice', 'Doubt-solving support', 'Centres in Borivali and Andheri'];
const STATS = [
  { n: 40, s: '+', l: 'Years of teaching experience' },
  { n: 8, s: '', l: 'Expert faculty' },
  { n: 2, s: '', l: 'Centres in Mumbai' },
  { n: 4, s: '', l: 'Programmes' },
];

export default function Hero() {
  return (
    <section>
      <div className="bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 sm:py-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold text-navy/60">CA · ACCA · CFA · 11th &amp; 12th Commerce</p>
            <h1 className="font-display mt-3 text-4xl leading-[1.1] text-navy sm:text-5xl">
              Commerce and professional coaching in Mumbai, taught by people who practise.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy/70">
              EdgeX Learning prepares students for 11th–12th Commerce, CA, ACCA and CFA with experienced faculty, structured teaching and steady support.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[15px] text-navy/80">
                  <Check size={18} className="mt-0.5 shrink-0 text-gold" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/11th-12th-commerce/" className="rounded bg-gold px-6 py-3.5 font-bold text-ink hover:bg-[#c29720]">Explore programmes</Link>
              <Link href="/contact/" className="rounded border border-navy px-6 py-3.5 font-bold text-navy hover:bg-navy hover:text-white">Book counselling</Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line">
              <Image src="/img/stock/students.jpg" alt="Students studying together" fill priority sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-navy text-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-6 py-7 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="md:border-l md:border-white/15 md:px-6 md:first:border-l-0 md:first:pl-0">
              <dt className="font-display text-3xl text-gold sm:text-4xl"><Counter to={s.n} suffix={s.s} /></dt>
              <dd className="mt-1 text-sm text-white/70">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
