'use client';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import ContactForm from './ContactForm';

type Ctx = { open: (course?: string) => void };
const EnquiryCtx = createContext<Ctx>({ open: () => {} });
export const useEnquiry = () => useContext(EnquiryCtx);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; course?: string; n: number }>({ open: false, n: 0 });
  const open = useCallback((course?: string) => setState((s) => ({ open: true, course, n: s.n + 1 })), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [state.open, close]);

  return (
    <EnquiryCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div
            key="enquiry"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto bg-ink/70 p-0 sm:items-center sm:p-6"
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-label="Send an enquiry"
              initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative my-auto w-full max-w-xl"
            >
              <button onClick={close} aria-label="Close enquiry form" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded bg-navy text-white hover:bg-gold hover:text-ink sm:right-4 sm:top-4">
                <X size={18} />
              </button>
              <ContactForm key={state.n} defaultCourse={state.course} compact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </EnquiryCtx.Provider>
  );
}

export function EnquireButton({ course, className = '', children }: { course?: string; className?: string; children: ReactNode }) {
  const { open } = useEnquiry();
  return (
    <button type="button" onClick={() => open(course)} className={className}>
      {children}
    </button>
  );
}
