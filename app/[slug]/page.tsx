import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import posts from '@/data/posts.json';
import CtaBand from '@/components/CtaBand';
import { fmtDate } from '@/components/home/BlogPreview';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${p.slug}/` },
    openGraph: { type: 'article', title: p.title, description: p.description, publishedTime: p.date, images: p.image ? [p.image] : [] },
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const i = posts.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = posts[i];
  const next = posts[(i + 1) % posts.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    datePublished: p.date,
    image: p.image ? `https://edgex-learning.com${p.image}` : undefined,
    publisher: { '@type': 'Organization', name: 'EdgeX Learning' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="grain relative overflow-hidden bg-navy px-6 pb-24 pt-36 text-white sm:pt-44">
        <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-gold/25 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl">
          <Link href="/blog/" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"><ArrowLeft size={16} /> All articles</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[.25em] text-white/50">{fmtDate(p.date)}</p>
          <h1 className="font-display mt-4 text-3xl leading-[1.12] sm:text-5xl">{p.title}</h1>
        </div>
      </header>

      <article className="mx-auto -mt-9 max-w-3xl px-6 pb-14">
        {p.image && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-[1.75rem] shadow-2xl">
            <Image src={p.image} alt={p.title} fill sizes="768px" priority className="object-cover" />
          </div>
        )}
        <div className="prose-edgex mt-10" dangerouslySetInnerHTML={{ __html: p.content }} />

        <Link href={`/${next.slug}/`} className="group mt-16 flex items-center justify-between gap-6 rounded-3xl border border-navy/10 bg-white p-6 transition hover:border-gold hover:shadow-lg">
          <span>
            <span className="text-xs font-bold uppercase tracking-widest text-plum">Read next</span>
            <span className="font-display mt-1 block text-xl text-navy">{next.title}</span>
          </span>
          <ArrowRight className="shrink-0 text-gold transition group-hover:translate-x-1" />
        </Link>
      </article>
      <CtaBand />
    </>
  );
}
