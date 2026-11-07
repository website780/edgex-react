import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import posts from '@/data/posts.json';

export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

/** Article card used on the blog page. */
export function PostCard({ p }: { p: (typeof posts)[number]; i?: number }) {
  return (
    <Link href={`/${p.slug}/`} data-cursor="view" className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white hover:border-accent">
      <div className="relative aspect-[2/1] overflow-hidden bg-sand">
        {p.image && <Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-navy/50">{fmtDate(p.date)}</p>
        <h3 className="mt-2 text-lg font-extrabold leading-snug tracking-tight text-navy">{p.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-navy/65">{p.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">
          Read article <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
