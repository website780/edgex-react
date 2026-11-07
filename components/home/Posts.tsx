'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import posts from '@/data/posts.json';
import { fmtDate } from './BlogPreview';
import Words from '../motion/Words';
import Slide from '../motion/Slide';

/** Three equal article cards with full covers, and a link to the rest. */
export default function Posts() {
  const list = posts.slice(0, 3);

  return (
    <section className="border-y border-line bg-[#f6f8fd]">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Slide from="left">
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">From the blog</p>
            </Slide>
            <Words text="Study plans and exam notes." grad="exam notes" className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.03em] text-navy sm:text-5xl" />
            <p className="mt-3 max-w-xl text-lg text-navy/65">Study plans, exam updates and career guidance from our educators.</p>
          </div>
          <Slide from="right">
            <Link href="/blog/" className="inline-flex items-center gap-2 font-bold text-navy hover:underline">All {posts.length} articles <ArrowRight size={17} className="text-accent" /></Link>
          </Slide>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {list.map((p, i) => (
            <Slide key={p.slug} from={i === 0 ? 'left' : i === 2 ? 'right' : 'left'} delay={i * 0.08}>
              <Link href={`/${p.slug}/`} data-cursor="view" className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white hover:border-accent">
                <div className="relative aspect-[2/1] overflow-hidden border-b border-line bg-sand">
                  {p.image && <Image src={p.image} alt="" fill sizes="(min-width:768px) 380px, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold text-navy/50">{fmtDate(p.date)}</p>
                  <h3 className="mt-2 line-clamp-3 text-xl font-extrabold leading-snug tracking-tight text-navy">{p.title}</h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-navy/65">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                    Read article <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
}
