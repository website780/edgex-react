import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { CENTRES, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact EdgeX Learning | Borivali & Andheri, Mumbai',
  description: 'Visit EdgeX Learning at Borivali or Andheri, or send an enquiry for CA, ACCA, CFA and 11th-12th Commerce classes in Mumbai.',
  alternates: { canonical: '/contact/' },
};

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Come in. Let’s talk about what comes next." />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:py-16 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          {CENTRES.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <div className="group rounded-[1.75rem] border border-navy/10 bg-white p-7 transition hover:border-gold hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold"><MapPin size={20} /></span>
                  <h2 className="font-display text-2xl text-navy">{c.name}</h2>
                </div>
                <address className="mt-4 text-navy/70 not-italic leading-relaxed">{c.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
                <a href={`tel:${c.tel}`} className="mt-4 inline-flex items-center gap-2 font-bold text-navy hover:text-plum"><Phone size={16} className="text-gold" />{c.phone}</a>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 rounded-[1.75rem] bg-navy p-6 text-white transition hover:bg-navy-2">
              <Mail className="text-gold" />
              <span><span className="block text-xs uppercase tracking-widest text-white/50">Official email</span>{SITE.email}</span>
            </a>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-3" x={30} y={0}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
