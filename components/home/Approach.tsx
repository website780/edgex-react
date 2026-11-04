import { GraduationCap, HeartHandshake } from 'lucide-react';

const COLS = [
  {
    icon: GraduationCap,
    title: 'Students ask',
    items: [
      { q: 'Will difficult concepts become easier?', a: 'Yes. Specialist faculty explain each subject step by step, and regular practice makes it stick.' },
      { q: 'Will I know what to study next?', a: 'Yes. Every programme follows a clear route, with structured preparation and revision lectures.' },
      { q: 'Can I ask for help when I am stuck?', a: 'Yes. Doubt-solving sessions are part of every course.' },
    ],
  },
  {
    icon: HeartHandshake,
    title: 'Parents ask',
    items: [
      { q: 'Is the faculty experienced?', a: 'Our educators are qualified CAs, company secretaries and professionals. Our senior-most professor has over 40 years of teaching experience.' },
      { q: 'Is there a clear academic structure?', a: 'Yes. Each programme has defined stages, study material, a practice question bank and revision lectures.' },
      { q: 'Will my child stay consistent?', a: 'Regular practice and doubt-solving sessions keep preparation on track, and our teachers stay available throughout.' },
    ],
  },
];

/**
 * Both cards share the same rows (subgrid), so each question and answer sits level
 * with its counterpart in the other card on wide screens.
 */
export default function Approach() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h2 className="font-display max-w-2xl text-3xl text-navy sm:text-4xl">Questions we hear from students and parents</h2>
        <p className="mt-2 max-w-2xl text-navy/70">Students want direction. Parents want confidence. Here is how we answer both.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-y-0">
          {COLS.map((c) => (
            <div key={c.title} className="rounded-md border border-line bg-white md:row-span-4 md:grid md:grid-rows-subgrid">
              <div className="flex items-center gap-3 px-6 pb-5 pt-6 sm:px-7 sm:pt-7">
                <span className="grid h-10 w-10 place-items-center rounded bg-navy text-white"><c.icon size={20} /></span>
                <h3 className="font-display text-xl text-navy">{c.title}</h3>
              </div>
              {c.items.map((it, k) => (
                <div key={it.q} className={`border-t border-line px-6 py-4 sm:px-7 ${k === c.items.length - 1 ? 'pb-6 sm:pb-7' : ''}`}>
                  <p className="font-semibold text-navy">{it.q}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-navy/70">{it.a}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
