import Hero from '@/components/home/Hero';
import Marquees from '@/components/home/Marquees';
import StatsBand from '@/components/home/StatsBand';
import Programmes from '@/components/home/Programmes';
import Method from '@/components/home/Method';
import FacultyTeam from '@/components/home/FacultyTeam';
import QA from '@/components/home/QA';
import Posts from '@/components/home/Posts';
import Finale from '@/components/home/Finale';

export default function Home() {
  // One wrapper keeps the older per-page reveal selectors in globals.css out of the way; sections animate themselves.
  return (
    <div>
      <Hero />
      <StatsBand />
      <Programmes />
      <Marquees />
      <Method />
      <FacultyTeam />
      <QA />
      <Posts />
      <Finale />
    </div>
  );
}
