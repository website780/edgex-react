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
      <header className="border-b border-line bg-sand">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:py-12">
          <Link href="/blog/" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline"><ArrowLeft size={16} /> All articles</Link>
          <p className="mt-6 text-sm font-semibold text-navy/55">{fmtDate(p.date)}</p>
          <h1 className="font-display mt-2 text-3xl leading-tight text-navy sm:text-4xl">{p.title}</h1>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-10 sm:py-12">
        {p.image && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-md border border-line">
            <Image src={p.image} alt={p.title} fill sizes="768px" priority className="object-cover" />
          </div>
        )}
        <div className="prose-edgex mt-8" dangerouslySetInnerHTML={{ __html: p.content }} />

        <Link href={`/${next.slug}/`} className="group mt-12 flex items-center justify-between gap-6 rounded-md border border-line bg-white p-5 hover:border-navy">
          <span>
            <span className="text-sm font-semibold text-navy/55">Read next</span>
            <span className="font-display mt-1 block text-lg text-navy group-hover:underline">{next.title}</span>
          </span>
          <ArrowRight className="shrink-0 text-gold" />
        </Link>
      </article>
      <CtaBand />
    </>
  );
}
