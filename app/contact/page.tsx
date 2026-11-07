import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Slide from '@/components/motion/Slide';
import { CENTRES, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact EdgeX Learning | Borivali & Andheri, Mumbai',
  description: 'Visit EdgeX Learning at Borivali or Andheri, or send an enquiry for CA, ACCA, CFA and 11th-12th Commerce classes in Mumbai.',
  alternates: { canonical: '/contact/' },
};

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Visit a centre | or send us an enquiry" grad="send us an enquiry" sub="We are at Borivali and Andheri. Call, walk in, or fill the form and we will get back to you." />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:py-20 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {CENTRES.map((c, i) => (
              <Slide key={c.name} from="left" delay={i * 0.08}>
                <div className="group rounded-md border border-line bg-white p-6 transition-colors hover:border-accent">
                  <div className="flex items-center gap-3">
                    <span className="accent-grad grid h-11 w-11 place-items-center rounded text-white"><MapPin size={20} /></span>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">Centre</p>
                      <h2 className="text-xl font-extrabold tracking-tight text-navy">{c.name}</h2>
                    </div>
                  </div>
                  <address className="mt-4 not-italic leading-relaxed text-navy/70">{c.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
                  <a href={`tel:${c.tel}`} className="mt-4 inline-flex items-center gap-2 font-bold text-navy hover:text-accent"><Phone size={16} className="text-accent" />{c.phone}</a>
                </div>
              </Slide>
            ))}
            <Slide from="left" delay={0.16}>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 rounded-md bg-navy p-5 text-white transition-colors hover:bg-navy-2">
                <span className="grid h-11 w-11 place-items-center rounded bg-white/10"><Mail size={20} /></span>
                <span><span className="block text-xs text-white/60">Official email</span><span className="font-bold">{SITE.email}</span></span>
              </a>
            </Slide>
          </div>

          <Slide from="right" className="lg:col-span-7">
            <ContactForm />
          </Slide>
        </div>
      </section>
    </>
  );
}
