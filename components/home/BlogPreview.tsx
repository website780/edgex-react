import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import posts from '@/data/posts.json';
import { Reveal, SplitWords } from '../Reveal';

export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export function PostCard({ p, i = 0 }: { p: (typeof posts)[number]; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 0.1}>
      <Link href={`/${p.slug}/`} className="group block h-full overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_-24px_rgba(13,24,64,.45)]">
        <div className="relative aspect-[2/1] overflow-hidden bg-sand">
          {p.image && <Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />}
        </div>
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-plum">{fmtDate(p.date)}</p>
          <h3 className="font-display mt-3 text-xl leading-snug text-navy">{p.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy/65">{p.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy">
            Read more <ArrowUpRight size={16} className="text-gold transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function BlogPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-plum">From the blog</p></Reveal>
          <SplitWords as="h2" text="Valuable insights to guide your journey." gold={[1]} className="font-display mt-4 max-w-2xl text-4xl leading-[1.08] text-navy sm:text-5xl" />
        </div>
        <Link href="/blog/" className="group inline-flex items-center gap-2 font-bold text-navy">
          <span className="border-b-2 border-gold pb-0.5">All articles</span>
          <ArrowUpRight size={18} className="text-gold transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
      <div className="mt-9 grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
      </div>
    </section>
  );
}
