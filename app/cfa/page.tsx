import type { Metadata } from 'next';
import CoursePage from '@/components/CoursePage';
import { COURSES } from '@/lib/site';

const c = COURSES.find((x) => x.slug === 'cfa')!;

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDesc,
  alternates: { canonical: c.href },
  openGraph: { title: c.metaTitle, description: c.metaDesc },
};

export default function Page() {
  return <CoursePage c={c} />;
}
