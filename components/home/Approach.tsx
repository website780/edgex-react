import { GraduationCap, HeartHandshake } from 'lucide-react';

const COLS = [
  {
    icon: GraduationCap,
    title: 'If you are a student',
    qs: ['Will difficult concepts become easier?', 'Will I know what to study next?', 'Can I ask for help?'],
  },
  {
    icon: HeartHandshake,
    title: 'If you are a parent',
    qs: ['Is the faculty experienced?', 'Is there a clear academic structure?', 'Will my child stay consistent?'],
  },
];

export default function Approach() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h2 className="font-display max-w-2xl text-3xl text-navy sm:text-4xl">Students need direction. Parents need confidence.</h2>
        <p className="mt-2 max-w-2xl text-navy/70">Students and parents ask different questions, but both need clear answers. EdgeX Learning is built to give them.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {COLS.map((c) => (
            <div key={c.title} className="rounded-md border border-line bg-white p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded bg-navy text-white"><c.icon size={20} /></span>
                <h3 className="font-display text-xl text-navy">{c.title}</h3>
              </div>
              <ul className="mt-5 divide-y divide-line">
                {c.qs.map((q) => (
                  <li key={q} className="py-3 text-navy/80 first:pt-0 last:pb-0">{q}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
