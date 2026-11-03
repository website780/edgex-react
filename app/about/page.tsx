import type { Metadata } from 'next';
import Image from 'next/image';
import { Target, Compass } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
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
        image="/img/stock/lecture.jpg"
        imageAlt="A lecture in progress"
      />

      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <h2 className="font-display text-3xl text-navy">Education guided by experience</h2>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-navy/70">
          <p>EdgeX Learning brings together highly qualified educators and professionals with extensive experience across teaching and their respective industries.</p>
          <p>Our senior-most professor has more than four decades of teaching experience, complemented by practical exposure across accounting, law, taxation, audit, finance, costing and management.</p>
          <p>Students need more than subject knowledge. They need structure, mentorship, practice and educators who remain invested in their progress.</p>
        </div>
        <blockquote className="mt-8 border-l-4 border-gold pl-5 text-xl font-semibold leading-snug text-navy">
          Every course is built by educators who practise what they teach, not just present it.
        </blockquote>
        <p className="mt-5 text-navy/70">
          The objective is straightforward: explain complex concepts clearly, structure preparation responsibly and remain available throughout the journey.
        </p>
      </section>

      <section className="bg-navy text-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-6 py-8 md:grid-cols-4">
          {[
            { n: '40+', l: 'Years of teaching experience' },
            { n: String(FACULTY.length), l: 'Expert faculty' },
            { n: String(CENTRES.length), l: 'Centres in Mumbai' },
            { n: '4', l: 'Programmes' },
          ].map((s) => (
            <div key={s.l} className="md:border-l md:border-white/15 md:px-6 md:first:border-l-0 md:first:pl-0">
              <dt className="font-display text-3xl text-gold sm:text-4xl">{s.n}</dt>
              <dd className="mt-1 text-sm text-white/70">{s.l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h2 className="font-display text-3xl text-navy">Meet the faculty</h2>
        <p className="mt-2 max-w-2xl text-navy/70">Qualified educators who teach what they practise.</p>
        <div className="mt-8"><FacultyCarousel /></div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-12 sm:py-16 md:grid-cols-2">
          {[
            { icon: Compass, k: 'Vision', t: 'Transform aspirations into achievements.', d: 'Help young aspirants channel their ambition in a structured manner and build meaningful professional careers.' },
            { icon: Target, k: 'Mission', t: 'Build capable professionals, not only examination candidates.', d: 'Connect theoretical learning with practical understanding while supporting academic and personal growth.' },
          ].map((v) => (
            <div key={v.k} className="rounded-md border border-line bg-white p-6 sm:p-8">
              <span className="grid h-11 w-11 place-items-center rounded bg-navy text-white"><v.icon size={22} /></span>
              <p className="mt-5 text-sm font-semibold text-navy/60">{v.k}</p>
              <h3 className="font-display mt-1 text-2xl leading-tight text-navy">{v.t}</h3>
              <p className="mt-3 leading-relaxed text-navy/70">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand topGap />
    </>
  );
}
