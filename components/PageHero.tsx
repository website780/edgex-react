import Image from 'next/image';
import { Reveal, SplitWords } from './Reveal';

export default function PageHero({ eyebrow, title, sub, children, image, imageAlt = '' }: { eyebrow?: string; title: string; sub?: string; children?: React.ReactNode; image?: string; imageAlt?: string }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy pb-14 pt-36 text-white sm:pb-20 sm:pt-44">
      <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-gold/25 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-plum/60 blur-[100px]" />
      <div className="absolute inset-0 -z-10 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className={`mx-auto max-w-6xl px-6 ${image ? 'grid items-center gap-10 lg:grid-cols-12' : ''}`}>
        <div className={image ? 'lg:col-span-7' : ''}>
          {eyebrow && <Reveal><p className="text-xs font-bold uppercase tracking-[.3em] text-gold">{eyebrow}</p></Reveal>}
          <SplitWords text={title} className="font-display mt-5 max-w-4xl text-4xl font-medium leading-[1.06] sm:text-6xl" />
          {sub && <Reveal delay={0.3}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{sub}</p></Reveal>}
          {children}
        </div>
        {image && (
          <Reveal delay={0.3} x={30} y={0} className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 rotate-3 rounded-[2rem] bg-gold/40" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-white/20">
                <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 440px, 90vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
