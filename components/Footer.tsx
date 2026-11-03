import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CENTRES, COURSES, SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-12 sm:py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="inline-block rounded-2xl bg-ivory px-4 py-3">
            <Image src="/img/logo.png" alt="EdgeX Learning" width={120} height={57} className="h-12 w-auto" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            Highly qualified educators. Structured preparation. Meaningful academic guidance.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-[.2em] text-gold">Programmes</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {COURSES.map((c) => (
              <li key={c.slug}><Link className="transition hover:text-gold" href={c.href}>{c.short}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-[.2em] text-gold">Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link className="transition hover:text-gold" href="/about/">About Us</Link></li>
            <li><Link className="transition hover:text-gold" href="/blog/">Blog</Link></li>
            <li><Link className="transition hover:text-gold" href="/contact/">Contact Us</Link></li>
            <li><a className="transition hover:text-gold" href={`${SITE.url}/privacy-policy-3/`}>Privacy Policy</a></li>
            <li><a className="transition hover:text-gold" href={`${SITE.url}/terms-conditions/`}>Terms &amp; Conditions</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-xs font-bold uppercase tracking-[.2em] text-gold">Visit us</h4>
          <div className="mt-5 space-y-5 text-sm text-white/70">
            {CENTRES.map((c) => (
              <div key={c.name} className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold text-white">{c.name}</p>
                  <p>{c.address.join(', ')}</p>
                  <a href={`tel:${c.tel}`} className="mt-1 inline-flex items-center gap-1.5 hover:text-gold"><Phone size={13} />{c.phone}</a>
                </div>
              </div>
            ))}
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-gold"><Mail size={18} className="text-gold" />{SITE.email}</a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} EdgeX Learning. All rights reserved.
      </div>
    </footer>
  );
}
