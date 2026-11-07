'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CENTRES, COURSES, SITE, WA_LINK } from '@/lib/site';
import { useEnquiry } from './EnquiryModal';

const ease = [0.22, 1, 0.36, 1] as const;

function Col({ title, children, d = 0 }: { title: string; children: React.ReactNode; d?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: d, ease }}>
      <h4 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#c9b8ff]">{title}</h4>
      {children}
    </motion.div>
  );
}

/** Footer links get a small violet arrow that slides in on hover. */
function FLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = 'group inline-flex items-center gap-1.5 text-[15px] text-white/70 hover:text-white';
  const inner = (
    <>
      {children}
      <ArrowUpRight size={13} className="-translate-x-1 text-[#c9b8ff] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
    </>
  );
  return external ? <a href={href} className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}

export default function Footer() {
  const { open } = useEnquiry();
  return (
    <footer className="relative overflow-hidden bg-deep text-white">
      <div aria-hidden className="accent-grad h-[3px] w-full" />
      <span aria-hidden className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full border-[36px] border-white/[0.04]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-20">
        {/* lead */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="lg:col-span-7">
            <div className="inline-block rounded-md bg-white px-4 py-3">
              <Image src="/img/logo.png" alt="EdgeX Learning" width={120} height={57} className="h-11 w-auto" />
            </div>
            <p className="mt-6 max-w-xl text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl">
              Your road to CA, ACCA and CFA, <span className="bg-gradient-to-r from-[#b9a6ff] to-[#e3d7ff] bg-clip-text text-transparent">planned stage by stage.</span>
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <button onClick={() => open()} className="bg-white px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-navy hover:bg-accent-soft">Request a callback</button>
            <a href={WA_LINK()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/35 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] hover:bg-white/10"><MessageCircle size={16} /> WhatsApp</a>
          </motion.div>
        </div>

        {/* columns */}
        <div className="mt-14 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <Col title="Programmes">
              <ul className="mt-5 space-y-3">
                {COURSES.map((c) => <li key={c.slug}><FLink href={c.href}>{c.short}</FLink></li>)}
              </ul>
            </Col>
          </div>
          <div className="lg:col-span-2">
            <Col title="Company" d={0.08}>
              <ul className="mt-5 space-y-3">
                <li><FLink href="/about/">About us</FLink></li>
                <li><FLink href="/blog/">Blog</FLink></li>
                <li><FLink href="/contact/">Contact us</FLink></li>
                <li><FLink href={`${SITE.url}/privacy-policy-3/`} external>Privacy policy</FLink></li>
                <li><FLink href={`${SITE.url}/terms-conditions/`} external>Terms &amp; conditions</FLink></li>
              </ul>
            </Col>
          </div>
          <div className="sm:col-span-2 lg:col-span-8">
            <Col title="Our centres" d={0.16}>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {CENTRES.map((c) => (
                  <div key={c.name} className="rounded-md border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.06]">
                    <p className="text-lg font-extrabold">{c.name}</p>
                    <p className="mt-2 flex gap-2 text-[14px] leading-relaxed text-white/65"><MapPin size={16} className="mt-0.5 shrink-0 text-[#c9b8ff]" />{c.address.join(', ')}</p>
                    <a href={`tel:${c.tel}`} className="mt-3 inline-flex items-center gap-2 text-[15px] font-bold hover:text-[#c9b8ff]"><Phone size={15} className="text-[#c9b8ff]" />{c.phone}</a>
                  </div>
                ))}
              </div>
              <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-2 text-[15px] text-white/70 hover:text-white"><Mail size={16} className="text-[#c9b8ff]" />{SITE.email}</a>
            </Col>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45">
          <p>© {new Date().getFullYear()} EdgeX Learning. All rights reserved.</p>
          <p>Design by <a href="https://alphabetasolution.com/" target="_blank" rel="noopener noreferrer">Alphabeta</a></p>
        </div>
      </div>
    </footer>
  );
}
