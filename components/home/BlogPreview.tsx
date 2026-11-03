import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import posts from '@/data/posts.json';

export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export function PostCard({ p }: { p: (typeof posts)[number]; i?: number }) {
  return (
    <Link href={`/${p.slug}/`} className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white hover:border-navy">
      <div className="relative aspect-[2/1] overflow-hidden bg-sand">
        {p.image && <Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-navy/55">{fmtDate(p.date)}</p>
        <h3 className="font-display mt-2 text-lg leading-snug text-navy group-hover:underline">{p.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-navy/65">{p.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy">
          Read more <ArrowRight size={15} className="text-gold" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-navy sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-navy/70">Study plans, exam updates and career guidance.</p>
        </div>
        <Link href="/blog/" className="inline-flex items-center gap-2 font-bold text-navy hover:underline">
          All articles <ArrowRight size={18} className="text-gold" />
        </Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => <PostCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}
