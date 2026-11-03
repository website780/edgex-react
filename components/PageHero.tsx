import Image from 'next/image';
import { Reveal } from './Reveal';

export default function PageHero({ eyebrow, title, sub, children, image, imageAlt = '' }: { eyebrow?: string; title: string; sub?: string; children?: React.ReactNode; image?: string; imageAlt?: string }) {
  return (
    <section className="border-b border-line bg-sand">
      <div className={`mx-auto max-w-6xl px-6 py-10 sm:py-14 ${image ? 'grid items-center gap-8 lg:grid-cols-12' : ''}`}>
        <div className={image ? 'lg:col-span-7' : 'max-w-3xl'}>
          {eyebrow && <p className="text-sm font-semibold text-navy/60">{eyebrow}</p>}
          <h1 className="font-display mt-2 text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.6rem]">{title}</h1>
          {sub && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy/70">{sub}</p>}
          {children}
        </div>
        {image && (
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 440px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
