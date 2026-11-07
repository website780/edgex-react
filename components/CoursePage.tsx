'use client';
import { motion } from 'framer-motion';
import { BookOpen, Check, Download, GraduationCap, ListChecks, MessagesSquare, Repeat } from 'lucide-react';
import PageHero from './PageHero';
import CtaBand from './CtaBand';
import Words from './motion/Words';
import Slide from './motion/Slide';
import Magnetic from './motion/Magnetic';
import { useEnquiry } from './EnquiryModal';
import { INCLUDES, WA_LINK, type Course } from '@/lib/site';

const ICONS = [BookOpen, ListChecks, MessagesSquare, GraduationCap, Download, Repeat];
const GLANCE = ['Experienced faculty', 'Structured preparation', 'Regular practice', 'Doubt-solving support'];
const ease = [0.22, 1, 0.36, 1] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">{children}</p>;
}

export default function CoursePage({ c }: { c: Course }) {
  const { open } = useEnquiry();
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
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {GLANCE.map((g, i) => (
            <motion.li key={g} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }} className="flex items-center gap-2.5 text-[15px] font-medium text-navy/80">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-soft text-accent"><Check size={12} strokeWidth={3} /></span> {g}
            </motion.li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button onClick={() => open(c.short)} className="bg-navy px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-white hover:bg-navy-2">Enquire now</button>
          </Magnetic>
          <Magnetic>
            <a href={WA_LINK(`Hi EdgeX Learning, I'd like to know more about ${c.short}.`)} target="_blank" rel="noopener noreferrer" className="inline-block border border-navy bg-white px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-navy hover:bg-navy hover:text-white">WhatsApp us</a>
          </Magnetic>
        </div>
      </PageHero>

      {/* overview + route */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-20 lg:grid-cols-12">
          <Slide from="left" className="lg:col-span-5">
            <Label>About the programme</Label>
            <Words text="More than syllabus completion." grad="syllabus completion" className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-navy sm:text-4xl" />
            <p className="mt-5 text-lg leading-relaxed text-navy/70">{c.intro}</p>
          </Slide>

          <Slide from="right" className="lg:col-span-7">
            <div className="rounded-md border border-line bg-[#f6f8fd] p-6 sm:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-navy/45">Your route</p>
              <ol className="relative mt-6">
                <span aria-hidden className="absolute bottom-4 left-[17px] top-4 w-[2px] bg-accent-soft" />
                <motion.span aria-hidden initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} className="accent-grad absolute bottom-4 left-[17px] top-4 w-[2px] origin-top" />
                {c.stages.map((s, i) => (
                  <motion.li key={s.t} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.12, duration: 0.7, ease }} className="relative flex gap-5 pb-7 last:pb-0">
                    <span className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white ${i === c.stages.length - 1 ? 'bg-navy' : 'accent-grad'}`}>{i + 1}</span>
                    <div className="pt-1">
                      <p className="text-lg font-extrabold tracking-tight text-navy">{s.t}</p>
                      <p className="mt-0.5 text-[15px] leading-relaxed text-navy/60">{s.d}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </Slide>
        </div>
      </section>

      {/* fit + pillars */}
      <section className="border-y border-line bg-[#f6f8fd]">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-14 sm:py-20 lg:grid-cols-2">
          <Slide from="left">
            <div className="h-full rounded-md border border-line bg-white p-6 sm:p-8">
              <Label>Who it is for</Label>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{c.listTitle}</h2>
              <ul className="mt-6 space-y-4">
                {c.list.map((l, i) => (
                  <motion.li key={l} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex gap-3 leading-relaxed text-navy/80">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"><Check size={12} strokeWidth={3} /></span> {l}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Slide>
          <Slide from="right">
            <div className="accent-grad relative h-full overflow-hidden rounded-md p-6 text-white sm:p-8">
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-60 w-60 rounded-full border-[22px] border-white/10" />
              <p className="relative text-[12px] font-semibold uppercase tracking-[0.22em] text-white/70">What you get</p>
              <h2 className="relative mt-2 text-2xl font-extrabold tracking-tight">{c.pillarsTitle}</h2>
              <ul className={`relative mt-6 grid gap-x-6 gap-y-3.5 ${c.pillars.length > 4 ? 'sm:grid-cols-2' : ''}`}>
                {c.pillars.map((p) => (
                  <li key={p} className="flex gap-3 text-white/90"><Check size={18} className="mt-0.5 shrink-0" /> {p}</li>
                ))}
              </ul>
            </div>
          </Slide>
        </div>
      </section>

      {/* includes */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <Slide from="left"><Label>Included</Label></Slide>
          <Words text="This course includes" className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDES.map((t, i) => {
              const Icon = ICONS[i];
              return (
                <Slide key={t} from={i % 2 === 0 ? 'left' : 'right'} delay={(i % 3) * 0.06}>
                  <div className="group flex items-center gap-4 rounded-md border border-line bg-white p-5 transition-colors hover:border-accent">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white"><Icon size={22} /></span>
                    <span className="font-bold text-navy">{t}</span>
                  </div>
                </Slide>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
