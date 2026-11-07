import type { Metadata } from 'next';
import posts from '@/data/posts.json';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Slide from '@/components/motion/Slide';
import { PostCard } from '@/components/home/BlogPreview';

export const metadata: Metadata = {
  title: 'Blog | CA, ACCA & CFA Study Guides | EdgeX Learning',
  description: 'Study plans, exam updates and career guidance for CA, ACCA, CFA and Commerce students from the EdgeX Learning faculty.',
  alternates: { canonical: '/blog/' },
};

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Study plans | and exam notes." grad="exam notes" sub="Study plans, exam updates and career guidance for CA, ACCA, CFA and Commerce students." />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Slide key={p.slug} from={i % 2 === 0 ? 'left' : 'right'} delay={(i % 3) * 0.06} className="h-full">
                <PostCard p={p} />
              </Slide>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
