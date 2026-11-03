import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import PageHero from '@/components/PageHero';
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
      <PageHero eyebrow="Contact" title="Visit a centre or send us an enquiry" sub="We are at Borivali and Andheri. Call, walk in, or fill the form and we will get back to you." />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:py-16 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          {CENTRES.map((c) => (
            <div key={c.name}>
              <div className="rounded-md border border-line bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded bg-navy text-white"><MapPin size={20} /></span>
                  <h2 className="font-display text-xl text-navy">{c.name}</h2>
                </div>
                <address className="mt-4 text-navy/70 not-italic leading-relaxed">{c.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
                <a href={`tel:${c.tel}`} className="mt-4 inline-flex items-center gap-2 font-bold text-navy hover:text-plum"><Phone size={16} className="text-gold" />{c.phone}</a>
              </div>
            </div>
          ))}
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 rounded-md bg-navy p-5 text-white hover:bg-navy-2">
              <Mail className="text-gold" />
              <span><span className="block text-xs text-white/60">Official email</span>{SITE.email}</span>
            </a>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
