import type { Metadata } from 'next';
import Image from 'next/image';
import { Target, Compass } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { Reveal, SplitWords, Counter } from '@/components/Reveal';
import { FacultyCarousel } from '@/components/home/Faculty';
import { CENTRES, FACULTY } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About EdgeX Learning | Coaching Institute in Mumbai',
  description:
    'Learn about EdgeX Learning, a Mumbai coaching institute for CA, ACCA, CFA and Commerce, built on structured teaching, mentoring and exam-focused support.',
  alternates: { canonical: '/about/' },
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="About EdgeX Learning: Professional Coaching in Mumbai"
        sub="An independent educational institute founded by CA/CS Nihal Bhatt, with centres in Borivali and Andheri."
      />

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-12 sm:py-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 rotate-3 rounded-[2.2rem] bg-gold/40" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src="/img/stock/lecture.jpg" alt="A lecture in progress at a packed hall" fill sizes="(min-width:1024px) 420px, 90vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-6 pt-16 text-white">
                <p className="text-xs font-bold uppercase tracking-[.25em] text-gold">Since day one</p>
                <p className="font-display text-2xl">Learning led by experience</p>
              </div>
            </div>
          </div>
        </Reveal>
        <div>
          <SplitWords as="h2" text="Education guided by experience." gold={[2]} className="font-display text-4xl leading-[1.08] text-navy sm:text-5xl" />
          <Reveal delay={0.15}>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-navy/70">
              <p>EdgeX Learning brings together highly qualified educators and professionals with extensive experience across teaching and their respective industries.</p>
              <p>Our senior-most professor has more than four decades of teaching experience, complemented by practical exposure across accounting, law, taxation, audit, finance, costing and management.</p>
              <p>Students need more than subject knowledge. They need structure, mentorship, practice and educators who remain invested in their progress.</p>
            </div>
            <blockquote className="font-display mt-8 border-l-4 border-gold pl-5 text-2xl leading-snug text-navy">
              Every course is built by educators who practise what they teach, not just present it.
            </blockquote>
            <p className="mt-5 text-navy/70">
              The objective is straightforward: explain complex concepts clearly, structure preparation responsibly and remain available throughout the journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* stats */}
      <section className="bg-navy py-12 text-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
          {[
            { n: 40, s: '+', l: 'Years of teaching experience' },
            { n: FACULTY.length, s: '', l: 'Expert faculty' },
            { n: CENTRES.length, s: '', l: 'Centres in Mumbai' },
            { n: 4, s: '', l: 'Programmes' },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-display text-5xl text-gold sm:text-6xl"><Counter to={s.n} suffix={s.s} /></dt>
              <dd className="mt-2 text-sm text-white/60">{s.l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-plum">Meet the faculty</p></Reveal>
        <SplitWords as="h2" text="Meet the talented advisors from our institute" gold={[2]} className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] text-navy sm:text-5xl" />
        <div className="mt-9"><FacultyCarousel /></div>
      </section>

      <section className="bg-sand py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          {[
            { icon: Compass, k: 'Vision', t: 'Transform aspirations into achievements.', d: 'Help young aspirants channel their ambition in a structured manner and build meaningful professional careers.' },
            { icon: Target, k: 'Mission', t: 'Build capable professionals, not only examination candidates.', d: 'Connect theoretical learning with practical understanding while supporting academic and personal growth.' },
          ].map((v, i) => (
            <Reveal key={v.k} delay={i * 0.12}>
              <div className="group h-full rounded-[2rem] bg-white p-8 transition duration-500 hover:-translate-y-2 hover:shadow-xl sm:p-10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold transition group-hover:bg-gold group-hover:text-ink"><v.icon size={26} /></span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[.3em] text-plum">{v.k}</p>
                <h3 className="font-display mt-2 text-3xl leading-tight text-navy">{v.t}</h3>
                <p className="mt-4 leading-relaxed text-navy/70">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand topGap />
    </>
  );
}
