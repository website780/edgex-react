import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COURSES } from '@/lib/site';

export default function Pathways() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <h2 className="font-display text-3xl text-navy sm:text-4xl">Our programmes</h2>
      <p className="mt-2 max-w-2xl text-navy/70">Four routes, one experienced team. Pick the one that matches where you are.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {COURSES.map((c) => (
          <Link key={c.slug} href={c.href} className="group flex flex-col overflow-hidden rounded-md border border-line bg-white hover:border-navy">
            <div className="relative aspect-[3/2] overflow-hidden bg-sand">
              <Image src={c.photo} alt="" fill sizes="(min-width:1024px) 280px, (min-width:640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold text-navy/55">{c.tag}</p>
              <h3 className="font-display mt-1 text-xl text-navy">{c.short}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">{c.cardBlurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy group-hover:underline">
                View programme <ArrowRight size={16} className="text-gold" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
