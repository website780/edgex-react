import { Counter } from '../Reveal';
import HeroSlider from './HeroSlider';

const STATS = [
  { n: 40, s: '+', l: 'Years of teaching experience' },
  { n: 8, s: '', l: 'Expert faculty' },
  { n: 2, s: '', l: 'Centres in Mumbai' },
  { n: 4, s: '', l: 'Programmes' },
];

export default function Hero() {
  return (
    <header>
      <HeroSlider />
      <div className="bg-navy text-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-6 py-7 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="md:border-l md:border-white/15 md:px-6 md:first:border-l-0 md:first:pl-0">
              <dt className="font-display text-3xl text-gold sm:text-4xl"><Counter to={s.n} suffix={s.s} /></dt>
              <dd className="mt-1 text-sm text-white/70">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
