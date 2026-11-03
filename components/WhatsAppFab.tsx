'use client';
import { motion } from 'framer-motion';
import { WA_LINK } from '@/lib/site';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden>
    <path d="M16.04 3C8.84 3 3 8.8 3 15.96c0 2.28.6 4.5 1.74 6.46L3 29l6.78-1.7a13.1 13.1 0 0 0 6.26 1.6C23.2 28.9 29 23.1 29 15.96S23.2 3 16.04 3Zm0 23.7c-1.96 0-3.88-.52-5.56-1.5l-.4-.24-4.02 1 1.08-3.9-.26-.4a10.6 10.6 0 0 1-1.64-5.7c0-5.9 4.82-10.7 10.8-10.7s10.8 4.8 10.8 10.7-4.84 10.74-10.8 10.74Zm5.92-8c-.32-.16-1.92-.94-2.22-1.04-.3-.12-.5-.16-.72.16-.22.32-.84 1.04-1.02 1.26-.2.22-.38.24-.7.08-.32-.16-1.36-.5-2.58-1.6-.96-.84-1.6-1.9-1.8-2.2-.18-.32 0-.5.14-.66.14-.14.32-.38.48-.56.16-.2.2-.32.32-.54.1-.22.06-.4-.02-.56-.08-.16-.72-1.74-1-2.38-.26-.62-.52-.54-.72-.54h-.6c-.22 0-.56.08-.86.4s-1.12 1.1-1.12 2.68 1.14 3.1 1.3 3.32c.16.2 2.24 3.42 5.42 4.8.76.32 1.34.52 1.8.66.76.24 1.44.2 1.98.12.6-.1 1.92-.78 2.18-1.54.28-.76.28-1.4.2-1.54-.08-.14-.3-.22-.62-.38Z" />
  </svg>
);

export default function WhatsAppFab() {
  return (
    <motion.a
      href={WA_LINK()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 220, damping: 14 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,.7)]"
    >
      <span className="wa-ring absolute inset-0 -z-10 rounded-full bg-[#25D366]" />
      <span className="wa-ring wa-ring-2 absolute inset-0 -z-10 rounded-full bg-[#25D366]" />
      <WhatsAppIcon />
    </motion.a>
  );
}
