'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll reveals. The hidden start state is plain CSS (globals.css, gated by `html.js` and
 * prefers-reduced-motion), so there is no flash; this component only adds `.is-in` once an
 * element scrolls into view, and sets a small stagger between siblings in a grid.
 * Keep TARGETS in sync with the selectors in globals.css.
 */
export const TARGETS = [
  '.page-in > :not(:first-child) > h2',
  '.page-in > :not(:first-child) > h2 + p',
  '.page-in > :not(:first-child) :not(.grid > *) > h2',
  '.page-in > :not(:first-child) :not(.grid > *) > h2 + p',
  '.page-in > :not(:first-child) .grid > *',
  '.page-in > .grid:not(:first-child) > *',
  '.page-in > :not(:first-child) .reveal',
].join(', ');

export default function Motion() {
  const path = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute('data-motion-ready', '');
    const els = [...document.querySelectorAll<HTMLElement>(TARGETS)];

    els.forEach((el) => {
      const parent = el.parentElement;
      if (parent && parent.classList.contains('grid')) {
        const idx = [...parent.children].indexOf(el);
        el.style.setProperty('--d', `${(idx % 4) * 90}ms`);
      } else if (el.matches('h2 + p')) {
        el.style.setProperty('--d', '90ms');
      }
    });

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    els.forEach((el) => { if (!el.classList.contains('is-in')) io.observe(el); });
    return () => io.disconnect();
  }, [path]);

  return null;
}
