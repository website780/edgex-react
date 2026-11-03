import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import Pathways from '@/components/home/Pathways';
import Approach from '@/components/home/Approach';
import Faculty from '@/components/home/Faculty';
import Testimonials from '@/components/home/Testimonials';
import BlogPreview from '@/components/home/BlogPreview';
import CtaBand from '@/components/CtaBand';
import { SITE } from '@/lib/site';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Pathways />
      <Approach />
      <Faculty />
      {SITE.showTestimonials && <Testimonials />}
      <BlogPreview />
      <CtaBand />
    </>
  );
}
