'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV } from '@/lib/site';

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { setOpen(false); setDrop(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6"
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2 transition-all duration-500 sm:px-6 ${
            scrolled
              ? 'border-navy/10 bg-ivory/90 shadow-[0_10px_40px_-12px_rgba(13,24,64,.35)] backdrop-blur-xl'
              : 'border-white/40 bg-ivory/95 shadow-[0_6px_30px_-14px_rgba(13,24,64,.4)] backdrop-blur'
          }`}
        >
          <Link href="/" aria-label="EdgeX Learning home" className="shrink-0">
            <Image src="/img/logo.png" alt="EdgeX Learning" width={160} height={76} priority className="h-11 w-auto sm:h-12" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) =>
              n.children ? (
                <li key={n.label} className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
                  <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-navy/80 transition hover:text-navy">
                    {n.label}
                    <ChevronDown size={15} className={`transition ${drop ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {drop && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white p-2 shadow-2xl">
                          {n.children.map((c) => (
                            <Link key={c.href} href={c.href} className="group flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-sand">
                              <span>
                                <span className="block text-sm font-bold text-navy">{c.label}</span>
                                <span className="block text-xs text-navy/55">{c.note}</span>
                              </span>
                              <ArrowUpRight size={16} className="text-gold opacity-0 transition group-hover:opacity-100" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${active(n.href) ? 'text-navy' : 'text-navy/70 hover:text-navy'}`}
                  >
                    {n.label}
                    {active(n.href) && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-gold" />}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact/"
              className="group hidden items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-2 sm:inline-flex"
            >
              Contact Us
              <ArrowUpRight size={16} className="text-gold transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white lg:hidden" aria-label="Open menu">
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-navy px-6 pb-10 pt-6 text-white"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl">Menu</span>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <div className="mt-8 flex flex-1 flex-col gap-1 overflow-y-auto">
              {NAV.flatMap((n) => (n.children ? n.children : [n]))
                .map((n, i) => (
                  <motion.div key={n.href} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06 }}>
                    <Link href={n.href} className="block border-b border-white/10 py-4 font-display text-3xl">
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
            </div>
            <Link href="/contact/" className="mt-6 rounded-full bg-gold py-4 text-center font-bold text-ink">
              Book counselling
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
