import type { Metadata } from 'next';
import { Compass, Target } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Words from '@/components/motion/Words';
import Slide from '@/components/motion/Slide';
import StatsBand from '@/components/home/StatsBand';
import FacultyTeam from '@/components/home/FacultyTeam';

export const metadata: Metadata = {
  title: 'About EdgeX Learning | Coaching Institute in Mumbai',
  description:
    'Learn about EdgeX Learning, a Mumbai coaching institute for CA, ACCA, CFA and Commerce, built on structured teaching, mentoring and exam-focused support.',
  alternates: { canonical: '/about/' },
};

const VALUES = [
  { Icon: Compass, k: 'Vision', t: 'Transform aspirations into achievements.', d: 'Help young aspirants channel their ambition in a structured manner and build meaningful professional careers.' },
  { Icon: Target, k: 'Mission', t: 'Build capable professionals, not only examination candidates.', d: 'Connect theoretical learning with practical understanding while supporting academic and personal growth.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Professional coaching in Mumbai, | built on experience."
        grad="built on experience"
        sub="An independent educational institute founded by CA/CS Nihal Bhatt, with centres in Borivali and Andheri."
        image="/img/people/classroom.jpg"
        imageAlt="A lecture in progress"
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-20 lg:grid-cols-12">
          <Slide from="left" className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">Our story</p>
            <Words text="Education guided by experience" grad="guided by experience" className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-navy sm:text-4xl" />
          </Slide>
          <Slide from="right" className="lg:col-span-7">
            <div className="space-y-4 text-lg leading-relaxed text-navy/70">
              <p>EdgeX Learning brings together highly qualified educators and professionals with extensive experience across teaching and their respective industries.</p>
              <p>Our senior-most professor has more than four decades of teaching experience, complemented by practical exposure across accounting, law, taxation, audit, finance, costing and management.</p>
              <p>Students need more than subject knowledge. They need structure, mentorship, practice and educators who remain invested in their progress.</p>
            </div>
            <blockquote className="mt-8 rounded-md border border-accent-line bg-accent-soft p-6 text-xl font-bold leading-snug tracking-tight text-navy">
              Every course is built by educators who practise what they teach, not just present it.
            </blockquote>
            <p className="mt-6 text-lg leading-relaxed text-navy/70">
              The objective is straightforward: explain complex concepts clearly, structure preparation responsibly and remain available throughout the journey.
            </p>
          </Slide>
        </div>
      </section>

      <StatsBand />
      <FacultyTeam showAbout={false} />

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">What drives us</p>
          <Words text="Our vision and mission" grad="vision and mission" className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <Slide key={v.k} from={i === 0 ? 'left' : 'right'}>
                <div className="group h-full rounded-md border border-line bg-white p-6 transition-colors hover:border-accent sm:p-8">
                  <span className="accent-grad grid h-12 w-12 place-items-center rounded text-white"><v.Icon size={22} /></span>
                  <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">{v.k}</p>
                  <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-navy">{v.t}</h3>
                  <p className="mt-3 leading-relaxed text-navy/70">{v.d}</p>
                </div>
              </Slide>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
