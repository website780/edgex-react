import Link from 'next/link';
import { ArrowRight, Check, Sparkles, BookOpen, ListChecks, MessagesSquare, GraduationCap, Download, Repeat } from 'lucide-react';
import PageHero from './PageHero';
import CtaBand from './CtaBand';
import { Reveal, SplitWords } from './Reveal';
import { RoadmapArt } from './Art';
import { EnquireButton } from './EnquiryModal';
import { INCLUDES, WA_LINK, type Course } from '@/lib/site';

const ICONS = [BookOpen, ListChecks, MessagesSquare, GraduationCap, Download, Repeat];
const GLANCE = ['Experienced faculty', 'Structured preparation', 'Regular practice', 'Doubt-solving support'];

export default function CoursePage({ c }: { c: Course }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.short,
    description: c.metaDesc,
    provider: { '@type': 'EducationalOrganization', name: 'EdgeX Learning', url: 'https://edgex-learning.com' },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={c.tag} title={c.title} sub={`${c.hook} ${c.sub}`} image={c.photo} imageAlt={c.short}>
        <Reveal delay={0.4}>
          <ul className="mt-10 flex flex-wrap gap-3">
            {GLANCE.map((g) => (
              <li key={g} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                <Check size={15} className="text-gold" /> {g}
              </li>
            ))}
          </ul>
        </Reveal>
      </PageHero>

      {/* overview */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-12 sm:py-16 lg:grid-cols-2">
        <div>
          <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-plum">The programme</p></Reveal>
          <SplitWords as="h2" text="Clarity before confidence." gold={[2]} className="font-display mt-4 text-4xl leading-[1.08] text-navy sm:text-5xl" />
          <Reveal delay={0.2}><p className="mt-6 text-lg leading-relaxed text-navy/70">{c.intro}</p></Reveal>
        </div>
        <Reveal x={40} y={0}>
          <div className="relative">
            <div className="absolute -inset-3 -rotate-2 rounded-[2.2rem] bg-gold/35" />
            <div className="relative"><RoadmapArt c={c} /></div>
          </div>
        </Reveal>
      </section>

      {/* fit + pillars */}
      <section className="bg-sand py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
              <h2 className="font-display text-3xl text-navy">{c.listTitle}</h2>
              <ul className="mt-7 space-y-4">
                {c.list.map((l, i) => (
                  <li key={l} className="flex gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/25 text-xs font-bold text-navy">{i + 1}</span>
                    <span className="leading-relaxed text-navy/80">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="grain relative h-full overflow-hidden rounded-[2rem] bg-navy p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/25 blur-3xl" />
              <h2 className="font-display relative text-3xl">{c.pillarsTitle}</h2>
              <ul className={`relative mt-7 grid gap-3 ${c.pillars.length > 4 ? 'sm:grid-cols-2' : ''}`}>
                {c.pillars.map((p) => (
                  <li key={p} className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3.5 backdrop-blur [background:rgba(255,255,255,.07)]">
                    <Sparkles size={16} className="shrink-0 text-gold" />
                    <span className="text-sm font-medium sm:text-base">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* includes + enquire */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-plum">What’s included</p></Reveal>
        <SplitWords as="h2" text="This course includes" gold={[2]} className="font-display mt-4 text-4xl text-navy sm:text-5xl" />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDES.map((t, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={t} delay={(i % 3) * 0.08}>
                <div className="group flex items-center gap-4 rounded-2xl border border-navy/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy text-gold transition group-hover:bg-gold group-hover:text-ink"><Icon size={22} /></span>
                  <span className="font-semibold text-navy">{t}</span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-gold to-gold-soft p-8 sm:p-10">
            <div>
              <p className="font-display text-3xl text-ink">Interested in {c.short}?</p>
              <p className="mt-1 text-ink/70">Talk to an educator about batches, timings and fees.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <EnquireButton course={c.short} className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-4 font-bold text-white transition hover:bg-navy-2">
                Enquire now <ArrowRight size={18} className="text-gold transition group-hover:translate-x-1" />
              </EnquireButton>
              <a href={WA_LINK(`Hi EdgeX Learning, I'd like to know more about ${c.short}.`)} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-navy px-7 py-4 font-bold text-navy transition hover:bg-navy hover:text-white">
                WhatsApp us
              </a>
            </div>
          </div>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
