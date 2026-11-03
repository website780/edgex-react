import { TESTIMONIALS } from '@/lib/site';

export default function Testimonials() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h2 className="font-display text-3xl sm:text-4xl">What our students say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-md border border-white/15 bg-white/5 p-6">
              <p className="text-sm font-bold text-gold">{t.title}</p>
              <blockquote className="mt-2 leading-relaxed text-white/90">“{t.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm">
                <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-gold font-bold text-ink">{t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                <span className="font-semibold">{t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
