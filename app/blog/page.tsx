import type { Metadata } from 'next';
import posts from '@/data/posts.json';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { PostCard } from '@/components/home/BlogPreview';

export const metadata: Metadata = {
  title: 'Blog | CA, ACCA & CFA Study Guides | EdgeX Learning',
  description: 'Study plans, exam updates and career guidance for CA, ACCA, CFA and Commerce students from the EdgeX Learning faculty.',
  alternates: { canonical: '/blog/' },
};

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Valuable insights to change your idea" sub="Study plans, exam updates and career guidance for CA, ACCA, CFA and Commerce students." />
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
