import MarqueeRow, { Dot } from '../motion/MarqueeRow';

const ROW_A = ['CA Foundation', 'CA Intermediate', 'CA Final', 'ACCA', 'CFA'];
const ROW_B = ['11th Commerce', '12th Commerce', 'Board exams', 'Mock tests', 'Doubt sessions'];

const fade = '[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]';

/** Two big rows running in opposite directions. They speed up while you scroll and reverse when you scroll back up. */
export default function Marquees() {
  return (
    <section aria-label="Programmes and support" className="border-y border-line bg-[#f6f8fd] py-5 sm:py-7">
      <div className={fade}>
        <MarqueeRow dir={-1} speed={1.3}>
          {ROW_A.map((t) => (
            <span key={t} className="flex items-center">
              <span className="accent-grad bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">{t}</span>
              <Dot className="accent-grad" />
            </span>
          ))}
        </MarqueeRow>
      </div>
      <div className={`mt-1 sm:mt-2 ${fade}`}>
        <MarqueeRow dir={1} speed={1.3}>
          {ROW_B.map((t) => (
            <span key={t} className="flex items-center">
              <span className="text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl" style={{ WebkitTextStroke: '1.5px #16246e' }}>{t}</span>
              <Dot className="bg-navy" />
            </span>
          ))}
        </MarqueeRow>
      </div>
    </section>
  );
}
