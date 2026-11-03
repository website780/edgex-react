'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { COURSES, CENTRES, WA_LINK } from '@/lib/site';

/**
 * Static-site friendly: no backend. On submit it opens WhatsApp with the details pre-filled,
 * so every enquiry lands straight on the institute's WhatsApp.
 * To store enquiries in a sheet/DB instead, replace `onSubmit` with a fetch() to your endpoint.
 */
const field =
  'w-full rounded-2xl border border-navy/15 bg-white px-5 py-4 text-navy outline-none transition placeholder:text-navy/35 focus:border-gold focus:ring-4 focus:ring-gold/20';

export default function ContactForm({ defaultCourse, compact = false }: { defaultCourse?: string; compact?: boolean }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = [
      'New enquiry from website',
      `Name: ${d.get('name')}`,
      `Mobile: ${d.get('phone')}`,
      `Email: ${d.get('email')}`,
      `Course: ${d.get('course')}`,
      `Centre: ${d.get('centre')}`,
      `Current standard: ${d.get('standard') || '-'}`,
    ].join('\n');
    window.open(WA_LINK(msg), '_blank', 'noopener');
    setSent(true);
  }

  return (
    <div className={`relative overflow-hidden bg-sand ${compact ? 'rounded-t-[2rem] p-6 sm:rounded-[2rem] sm:p-8' : 'rounded-[2rem] p-7 sm:p-10'}`}>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
            <CheckCircle2 size={56} className="mx-auto text-gold" />
            <h2 className="font-display mt-5 text-3xl text-navy">Thank you!</h2>
            <p className="mx-auto mt-3 max-w-sm text-navy/70">Your enquiry is ready in WhatsApp. Press send there and our team will get back to you shortly.</p>
            <button onClick={() => setSent(false)} className="mt-6 text-sm font-bold text-plum underline underline-offset-4">Send another enquiry</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="grid gap-4 sm:grid-cols-2">
            <h2 className="font-display pr-12 text-3xl text-navy sm:col-span-2">Send an enquiry</h2>
            <label className="sm:col-span-2"><span className="sr-only">Student name</span><input required name="name" placeholder="Student name" className={field} /></label>
            <label><span className="sr-only">Mobile number</span><input required name="phone" type="tel" inputMode="tel" pattern="[0-9+ ]{10,15}" placeholder="Mobile number" className={field} /></label>
            <label><span className="sr-only">Email address</span><input required name="email" type="email" placeholder="Email address" className={field} /></label>
            <label className="relative"><span className="sr-only">Course</span>
              <select required name="course" defaultValue={defaultCourse ?? ''} className={`${field} appearance-none pr-12`}>
                <option value="" disabled>Select course</option>
                {COURSES.map((c) => <option key={c.slug}>{c.short}</option>)}
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-navy/60" />
            </label>
            <label className="relative"><span className="sr-only">Preferred centre</span>
              <select required name="centre" defaultValue="" className={`${field} appearance-none pr-12`}>
                <option value="" disabled>Preferred centre</option>
                {CENTRES.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-navy/60" />
            </label>
            <label className="sm:col-span-2"><span className="sr-only">Current standard</span><input name="standard" placeholder="Current standard (e.g. 12th, CA Inter)" className={field} /></label>
            <label className="flex items-start gap-3 text-sm text-navy/70 sm:col-span-2">
              <input required type="checkbox" className="mt-1 h-4 w-4 accent-[#d4a62a]" />
              I agree to be contacted by EdgeX Learning
            </label>
            <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 font-bold text-white transition hover:bg-navy-2 sm:col-span-2">
              Submit enquiry <Send size={17} className="text-gold transition group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
