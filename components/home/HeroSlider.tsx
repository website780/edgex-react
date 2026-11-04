'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EnquireButton } from '../EnquiryModal';

const SLIDES = [
  {
    img: '/img/people/study-together.jpg',
    alt: 'A group of students studying together at a table, smiling',
    title: 'Commerce and professional coaching in Mumbai',
    text: 'CA, ACCA, CFA and 11th–12th Commerce, taught by educators who practise what they teach.',
    course: undefined as string | undefined,
    href: '#programmes',
    more: 'See the programmes',
  },
  {
    img: '/img/people/exam-writing.jpg',
    alt: 'Two young men writing in their notebooks',
    title: 'CA, from Foundation to Final',
    text: 'Specialist faculty for every subject, with structured preparation across each level.',
    course: 'Chartered Accountancy',
    href: '/ca/',
    more: 'About the CA programme',
  },
  {
    img: '/img/people/study-room.jpg',
    alt: 'Students studying in a classroom, one standing with a textbook and a smile',
    title: 'ACCA, one paper at a time',
    text: 'Understand the route before you commit, then prepare with experienced guidance.',
    course: 'ACCA',
    href: '/acca/',
    more: 'About the ACCA programme',
  },
  {
    img: '/img/people/blazers.jpg',
    alt: 'Four young men in blazers walking and talking on a campus path',
    title: 'CFA Level 1, 2 and 3',
    text: 'Structured classes, mock exams and steady study support for investment careers.',
    course: 'CFA',
    href: '/cfa/',
    more: 'About the CFA programme',
  },
  {
    img: '/img/people/girls-class.jpg',
    alt: 'Students in white uniforms listening attentively in a classroom',
    title: 'The right start in 11th and 12th',
    text: 'Board performance, study habits and future choices all begin in these two years.',
    course: '11th & 12th Commerce',
    href: '/11th-12th-commerce/',
    more: 'About 11th & 12th Commerce',
  },
];

const INTERVAL = 6500;

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touch = useRef<number | null>(null);
  const n = SLIDES.length;

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, reduced, n]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(i - 1);
    if (e.key === 'ArrowRight') go(i + 1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Programmes at EdgeX Learning"
      className="relative isolate overflow-hidden bg-navy text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div className="relative h-[34rem] sm:h-[38rem] lg:h-[40rem]">
        {SLIDES.map((s, k) => {
          const on = k === i;
          return (
            <div
              key={s.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}`}
              aria-hidden={!on}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${on ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <Image
                src={s.img}
                alt={on ? s.alt : ''}
                fill
                priority={k === 0}
                sizes="100vw"
                className={`object-cover transition-transform ease-out ${on ? 'scale-100 duration-[7000ms]' : 'scale-[1.06] duration-0'}`}
              />
              <div className="absolute inset-0 bg-navy/50" />

              <div className="relative mx-auto flex h-full max-w-6xl items-center px-6 pb-16">
                <div className={`max-w-xl transition-all duration-700 ease-out ${on ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-4 opacity-0'}`}>
                  <h2 className="font-display text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">{s.title}</h2>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">{s.text}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <EnquireButton course={s.course} className="rounded bg-gold px-6 py-3.5 font-bold text-ink hover:bg-[#c29720]">
                      Enquire now
                    </EnquireButton>
                    <Link href={s.href} tabIndex={on ? 0 : -1} className="font-semibold underline decoration-gold decoration-2 underline-offset-4 hover:decoration-white">
                      {s.more}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-6">
          <div className="flex items-center gap-2" role="group" aria-label="Choose a slide">
            {SLIDES.map((s, k) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go(k)}
                aria-label={`Show slide ${k + 1}: ${s.title}`}
                aria-current={k === i}
                className="group grid h-8 place-items-center"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-10 bg-gold' : 'w-5 bg-white/45 group-hover:bg-white/80'}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded border border-white/50 text-white transition-colors hover:bg-white hover:text-navy">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded border border-white/50 text-white transition-colors hover:bg-white hover:text-navy">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{`Slide ${i + 1} of ${n}: ${SLIDES[i].title}`}</p>
    </section>
  );
}
