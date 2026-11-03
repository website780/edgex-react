const ITEMS = ['Chartered Accountancy', 'ACCA', 'CFA', '11th & 12th Commerce', 'Borivali', 'Andheri', 'Structured Preparation', 'Doubt-Solving Support'];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee overflow-hidden border-y border-navy/10 bg-ivory py-5" aria-hidden>
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="font-display flex items-center gap-10 text-2xl text-navy/80 sm:text-3xl">
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
