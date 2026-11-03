import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import { CENTRES, COURSES, SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="inline-block rounded bg-white px-3 py-2">
            <Image src="/img/logo.png" alt="EdgeX Learning" width={120} height={57} className="h-11 w-auto" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            Coaching for CA, ACCA, CFA and 11th &amp; 12th Commerce, taught by qualified educators at our Borivali and Andheri centres.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-bold text-white">Programmes</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {COURSES.map((c) => (
              <li key={c.slug}><Link className="hover:text-white hover:underline" href={c.href}>{c.short}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-bold text-white">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link className="hover:text-white hover:underline" href="/about/">About us</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/blog/">Blog</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/contact/">Contact us</Link></li>
            <li><a className="hover:text-white hover:underline" href={`${SITE.url}/privacy-policy-3/`}>Privacy policy</a></li>
            <li><a className="hover:text-white hover:underline" href={`${SITE.url}/terms-conditions/`}>Terms &amp; conditions</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-sm font-bold text-white">Our centres</h4>
          <div className="mt-4 space-y-4 text-sm text-white/70">
            {CENTRES.map((c) => (
              <div key={c.name}>
                <p className="font-semibold text-white">{c.name}</p>
                <p>{c.address.join(', ')}</p>
                <a href={`tel:${c.tel}`} className="mt-1 inline-flex items-center gap-1.5 hover:text-white"><Phone size={13} />{c.phone}</a>
              </div>
            ))}
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white"><Mail size={15} />{SITE.email}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} EdgeX Learning. All rights reserved.
      </div>
    </footer>
  );
}
