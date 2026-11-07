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

      <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white to-[#f6f8fd]">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <Link href="/blog/" className="group inline-flex items-center gap-2 text-sm font-bold text-accent">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> All articles
          </Link>
          <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-navy/45">{fmtDate(p.date)}</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-[-0.03em] text-navy sm:text-5xl">{p.title}</h1>
        </div>
      </header>

      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
          {p.image && (
            <div className="relative aspect-[2/1] overflow-hidden rounded-md border border-line">
              <Image src={p.image} alt={p.title} fill sizes="768px" priority className="object-cover" />
            </div>
          )}
          <div className="prose-edgex mt-8" dangerouslySetInnerHTML={{ __html: p.content }} />

          <Link href={`/${next.slug}/`} data-cursor="view" className="group mt-14 flex items-center justify-between gap-6 rounded-md border border-line bg-[#f6f8fd] p-6 hover:border-accent">
            <span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">Read next</span>
              <span className="mt-1 block text-lg font-extrabold leading-snug tracking-tight text-navy">{next.title}</span>
            </span>
            <span className="accent-grad grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1"><ArrowRight size={20} /></span>
          </Link>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
