'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CENTRES, COURSES, NAV } from '@/lib/site';
import { useEnquiry } from './EnquiryModal';
import Magnetic from './motion/Magnetic';
import TopBar from './TopBar';


export default function Navbar() {
  const path = usePathname();
  const { open: enquire } = useEnquiry();
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // slides away when you scroll down, returns as soon as you scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !menu);
    setScrolled(y > 30);
  });
  useEffect(() => { setMenu(false); setDrop(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
  const flat = NAV.flatMap((n) => (n.children ? n.children : [n]));

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-[0_8px_24px_-18px_rgba(13,24,64,.45)]' : ''}`}
      >
        <TopBar />

        <nav className="border-b border-line">
          <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-6">
            <Link href="/" aria-label="EdgeX Learning home" className="shrink-0">
              <Image src="/img/logo.png" alt="EdgeX Learning" width={160} height={76} priority className="h-11 w-auto sm:h-12" />
            </Link>

            <ul className="hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
              {NAV.map((n) => {
                const isDrop = !!n.children;
                return (
                  <li key={n.label} className="relative" onMouseEnter={() => { setHover(n.label); setDrop(isDrop); }} onMouseLeave={() => isDrop && setDrop(false)}>
                    {hover === n.label && <motion.span layoutId="nav-pill" className="absolute inset-x-1 inset-y-1.5 rounded bg-sand" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />}
                    {isDrop ? (
                      <button className="relative flex items-center gap-1 px-4 py-3 text-[15px] font-semibold text-navy" aria-expanded={drop}>
                        {n.label} <ChevronDown size={15} className={`transition-transform duration-300 ${drop ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link href={n.href} className="relative block px-4 py-3 text-[15px] font-semibold text-navy">
                        {n.label}
                        {active(n.href) && <motion.span layoutId="nav-dot" className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold" />}
                      </Link>
                    )}

                    {isDrop && (
                      <AnimatePresence>
                        {drop && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.22 }}
                            className="absolute left-1/2 top-full w-[40rem] -translate-x-1/2 pt-2"
                          >
                            <div className="overflow-hidden rounded-md border-2 border-navy bg-white shadow-[8px_8px_0_0_rgba(13,24,64,.9)]">
                              <div className="grid grid-cols-2 gap-px bg-line">
                                {COURSES.map((c) => (
                                  <Link key={c.slug} href={c.href} className="group flex gap-3 bg-white p-4 hover:bg-sand">
                                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-navy text-xs font-extrabold text-gold">{c.no}</span>
                                    <span className="min-w-0">
                                      <span className="flex items-center gap-1 font-extrabold text-navy">{c.short}<ArrowUpRight size={14} className="text-gold opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" /></span>
                                      <span className="mt-0.5 block text-xs font-semibold text-navy/50">{c.tag}</span>
                                      <span className="mt-1 block text-[13px] leading-snug text-navy/65">{c.cardBlurb}</span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                              <button onClick={() => { setDrop(false); enquire(); }} className="flex w-full items-center justify-between bg-navy px-5 py-3.5 text-left text-sm font-bold text-white hover:bg-navy-2">
                                Not sure which one? Talk to an educator <ArrowUpRight size={16} className="text-gold" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <a href={`tel:${CENTRES[0].tel}`} className="hidden items-center gap-2 text-sm font-bold text-navy hover:text-gold-dark xl:flex" style={{ whiteSpace: 'nowrap' }}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/25"><Phone size={15} /></span>{CENTRES[0].phone}
              </a>
              <Magnetic className="hidden sm:inline-block">
                <button onClick={() => enquire()} className="gold-grad px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition-[filter] hover:brightness-95">Enquire now</button>
              </Magnetic>
              <button onClick={() => setMenu((v) => !v)} className="grid h-11 w-11 place-items-center rounded border border-line text-navy lg:hidden" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
                {menu ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-navy pt-24 text-white lg:hidden"
          >
            <ul className="px-6 pb-10">
              {flat.map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href={n.href} className="block border-b border-white/10 py-4 text-3xl font-extrabold tracking-tight">{n.label}</Link>
                </motion.li>
              ))}
              <li className="pt-8">
                <button onClick={() => { setMenu(false); enquire(); }} className="w-full rounded bg-gold py-4 text-base font-bold text-ink">Enquire now</button>
                <a href={`tel:${CENTRES[0].tel}`} className="mt-4 flex items-center justify-center gap-2 text-white/80"><Phone size={16} />{CENTRES[0].phone}</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
