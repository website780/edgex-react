import Link from 'next/link';
import { Check, BookOpen, ListChecks, MessagesSquare, GraduationCap, Download, Repeat } from 'lucide-react';
import PageHero from './PageHero';
import CtaBand from './CtaBand';
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
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {GLANCE.map((g) => (
            <li key={g} className="flex items-center gap-2 text-[15px] text-navy/80">
              <Check size={17} className="shrink-0 text-gold" /> {g}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <EnquireButton course={c.short} className="rounded bg-gold px-6 py-3.5 font-bold text-ink hover:bg-[#c29720]">Enquire now</EnquireButton>
          <a href={WA_LINK(`Hi EdgeX Learning, I'd like to know more about ${c.short}.`)} target="_blank" rel="noopener noreferrer" className="rounded border border-navy px-6 py-3.5 font-bold text-navy hover:bg-navy hover:text-white">
            WhatsApp us
          </a>
        </div>
      </PageHero>

      {/* overview + route */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-navy">About the programme</h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/70">{c.intro}</p>
        </div>
        <div className="rounded-md border border-line bg-sand p-6">
          <h3 className="font-display text-xl text-navy">Your route</h3>
          <ol className="mt-4 space-y-4">
            {c.stages.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-navy">{s.t}</p>
                  <p className="text-sm leading-relaxed text-navy/65">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* fit + pillars */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-12 sm:py-16 lg:grid-cols-2">
          <div className="rounded-md border border-line bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl text-navy">{c.listTitle}</h2>
            <ul className="mt-5 space-y-3">
              {c.list.map((l) => (
                <li key={l} className="flex gap-3 leading-relaxed text-navy/80">
                  <Check size={18} className="mt-1 shrink-0 text-gold" /> {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-navy p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl">{c.pillarsTitle}</h2>
            <ul className={`mt-5 grid gap-x-6 gap-y-3 ${c.pillars.length > 4 ? 'sm:grid-cols-2' : ''}`}>
              {c.pillars.map((p) => (
                <li key={p} className="flex gap-3 text-white/90">
                  <Check size={18} className="mt-0.5 shrink-0 text-gold" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* includes */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h2 className="font-display text-3xl text-navy">This course includes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDES.map((t, i) => {
            const Icon = ICONS[i];
            return (
              <div key={t} className="flex items-center gap-4 rounded-md border border-line bg-white p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded bg-sand text-navy"><Icon size={21} /></span>
                <span className="font-semibold text-navy">{t}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-md border-l-4 border-gold bg-gold-soft p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl text-navy">Interested in {c.short}?</p>
            <p className="mt-1 text-navy/70">Talk to an educator about batches, timings and fees.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <EnquireButton course={c.short} className="rounded bg-navy px-6 py-3 font-bold text-white hover:bg-navy-2">Enquire now</EnquireButton>
            <Link href="/contact/" className="rounded border border-navy px-6 py-3 font-bold text-navy hover:bg-navy hover:text-white">Visit a centre</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
