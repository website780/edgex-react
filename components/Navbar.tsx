'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CENTRES, NAV, SITE } from '@/lib/site';

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); setDrop(false); }, [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className={`hidden overflow-hidden bg-navy text-[13px] text-white/80 transition-all duration-300 ease-out sm:block ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <p>Coaching for CA · ACCA · CFA · 11th &amp; 12th Commerce | Borivali &amp; Andheri, Mumbai</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${CENTRES[0].tel}`} className="flex items-center gap-1.5 hover:text-white"><Phone size={13} />{CENTRES[0].phone}</a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-white"><Mail size={13} />{SITE.email}</a>
          </div>
        </div>
      </div>

      <nav className={`border-b border-line transition-shadow duration-300 ${scrolled ? 'shadow-[0_6px_16px_-12px_rgba(13,24,64,.35)]' : ''}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5">
          <Link href="/" aria-label="EdgeX Learning home" className="shrink-0">
            <Image src="/img/logo.png" alt="EdgeX Learning" width={160} height={76} priority className="h-11 w-auto sm:h-12" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) =>
              n.children ? (
                <li key={n.label} className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
                  <button className="flex items-center gap-1 px-4 py-2 text-[15px] font-semibold text-navy/80 hover:text-navy" aria-expanded={drop}>
                    {n.label}
                    <ChevronDown size={15} className={drop ? 'rotate-180' : ''} />
                  </button>
                  {drop && (
                    <div className="absolute left-0 top-full w-72 pt-1">
                      <div className="rounded-md border border-line bg-white py-1 shadow-md">
                        {n.children.map((c) => (
                          <Link key={c.href} href={c.href} className="block px-4 py-2.5 hover:bg-sand">
                            <span className="block text-sm font-semibold text-navy">{c.label}</span>
                            <span className="block text-xs text-navy/55">{c.note}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    className={`block border-b-2 px-4 py-2 text-[15px] font-semibold ${active(n.href) ? 'border-gold text-navy' : 'border-transparent text-navy/75 hover:text-navy'}`}
                  >
                    {n.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/contact/" className="hidden rounded bg-gold px-5 py-2.5 text-sm font-bold text-ink hover:bg-[#c29720] sm:inline-block">
              Enquire now
            </Link>
            <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded border border-line text-navy lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line bg-white lg:hidden">
            <div className="mx-auto max-w-6xl px-6 py-2">
              {NAV.flatMap((n) => (n.children ? n.children : [n])).map((n) => (
                <Link key={n.href} href={n.href} className={`block border-b border-line py-3.5 font-semibold ${active(n.href) ? 'text-navy' : 'text-navy/80'}`}>
                  {n.label}
                </Link>
              ))}
              <Link href="/contact/" className="my-4 block rounded bg-gold py-3 text-center font-bold text-ink">Enquire now</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
